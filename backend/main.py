import os
import shutil
from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from google.cloud import vision
from google.cloud.vision import types
from typing import List

# Inicijalizacija FastAPI aplikacije
app = FastAPI()

# Omogućavamo CORS za React frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://hcr-1.vercel.app", "http://localhost:3000"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Folder gde će se čuvati uploadovani fajlovi
UPLOAD_DIR = "uploads"
os.makedirs(UPLOAD_DIR, exist_ok=True)

# Inicijalizacija Vision API klijenta
client = vision.ImageAnnotatorClient()

# Dodajemo GET rutu za root
@app.get("/")
async def read_root():
    return {"message": "API is working"}

# Ruta za upload fajlova
@app.post("/upload")
async def upload_files(files: List[UploadFile] = File(...)):
    print("Received files:", [file.filename for file in files])  # Debugging
    saved_files = []
    for file in files:
        file_path = os.path.join(UPLOAD_DIR, file.filename)
        with open(file_path, "wb") as buffer:
            shutil.copyfileobj(file.file, buffer)
        saved_files.append(file_path)

    return {"message": "Files uploaded successfully", "files": saved_files}

# Ruta za OCR obradu pomoću Google Vision API
@app.post("/process-ocr")
async def process_ocr(filenames: List[str]):
    print(f"Processing OCR for files: {filenames}")

    extracted_text = []

    # Obrada svake slike i ekstrakcija teksta pomoću Google Vision API
    for filename in filenames:
        file_path = os.path.join(UPLOAD_DIR, filename)
        with open(file_path, "rb") as image_file:
            content = image_file.read()
        
        # Kreiranje slike za OCR sa sadržajem iz fajla
        image = types.Image(content=content)
        
        # Pozivanje Google Vision API za prepoznavanje teksta
        response = client.text_detection(image=image)
        texts = response.text_annotations
        
        # Ako je OCR uspešan, ekstraktuj tekst
        if texts:
            extracted_text.append(f"Text from {filename}:")
            extracted_text.append(texts[0].description)
        else:
            extracted_text.append(f"No text found in {filename}.")
    
    # Vraćanje rezultata OCR obrade
    return {"message": "OCR processing completed", "files": filenames, "extracted_text": extracted_text}
