import os
import shutil
from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from google.cloud import vision

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
        saved_files.append(file.filename)

    return {"message": "Files uploaded successfully", "files": saved_files}

# Ruta za OCR obradu pomoću Google Vision API
# Ruta za OCR obradu pomoću Google Vision API
@app.post("/process-ocr")
async def process_ocr(filenames: List[str]):
    print(f"Processing OCR for files: {filenames}")

    extracted_text = []

    # Obrada svake slike i ekstrakcija teksta pomoću Google Vision API
    for filename in filenames:
        file_path = os.path.join(UPLOAD_DIR, filename)
        
        # Provjera da li datoteka postoji
        if not os.path.exists(file_path):
            raise HTTPException(status_code=404, detail=f"File {filename} not found.")
        
        with open(file_path, "rb") as image_file:
            content = image_file.read()
        
        # Kreiranje slike za OCR sa sadržajem iz fajla
        image = vision.Image(content=content)
        
        try:
            # Pozivanje Google Vision API za prepoznavanje teksta
            response = client.text_detection(image=image)
            texts = response.text_annotations
            
            # Ako je OCR uspešan, ekstraktuj tekst
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
    
    # Vraćanje rezultata OCR obrade
    return {"message": "OCR processing completed", "files": filenames, "extracted_text": extracted_text}
