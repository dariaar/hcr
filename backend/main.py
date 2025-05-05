import os
import shutil
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google.cloud import vision
from typing import List
from pydantic import BaseModel  # <--- Dodano
from google.oauth2 import service_account

app = FastAPI()

# CORS postavke za frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://hcr-1.vercel.app", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Putanja do Google Credentials fajla (lokalna putanja)
LOCAL_CREDENTIALS_PATH = r"C:\Users\User\Desktop\API KEY\hrc-dipl-856966e257b7.json"
RENDER_CREDENTIALS_PATH = "/etc/secrets/GOOGLE_APPLICATION_CREDENTIALS"

# Odaberi putanju
if os.path.exists(RENDER_CREDENTIALS_PATH):
    credentials_path = RENDER_CREDENTIALS_PATH
    print("Using Render credentials path.")
elif os.path.exists(LOCAL_CREDENTIALS_PATH):
    credentials_path = LOCAL_CREDENTIALS_PATH
    print("Using local credentials path.")
else:
    raise FileNotFoundError("No valid Google credentials file found.")

# Učitaj kredencijale i napravi Vision klijenta
credentials = service_account.Credentials.from_service_account_file(credentials_path)
client = vision.ImageAnnotatorClient(credentials=credentials)

@app.get("/")
async def read_root():
    return {"message": "API is working"}

@app.post("/upload")
async def upload_files(files: List[UploadFile] = File(...)):
    print("Received files:", [file.filename for file in files])
    saved_files = []
    for file in files:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        saved_files.append(file.filename)

    return {"message": "Files uploaded successfully", "files": saved_files}

# 📦 Pravimo klasu za prihvat JSON requesta
class FilenamesRequest(BaseModel):
    filenames: List[str]

@app.post("/process-ocr")
async def process_ocr(request: FilenamesRequest):
    filenames = request.filenames
    print(f"Processing OCR for files: {filenames}")

    extracted_text = []

    for filename in filenames:
        file_path = os.path.join(UPLOAD_DIR, filename)
        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail=f"File {filename} not found.")

        with open(file_path, "rb") as image_file:
            content = image_file.read()

        image = vision.Image(content=content)
        try:
            response = client.text_detection(image=image)
            texts = response.text_annotations

            if texts:
                extracted_text.append({
                    "filename": filename,
                    "text": texts[0].description
                })
            else:
                extracted_text.append({
                    "filename": filename,
                    "text": "No text found."
                })
        except Exception as e:
            extracted_text.append({
                "filename": filename,
                "text": f"Error during OCR processing: {str(e)}"
            })

    return {"message": "OCR processing completed", "files": filenames, "extracted_text": extracted_text}
