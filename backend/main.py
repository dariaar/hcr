from fastapi import FastAPI, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from typing import List
import shutil
import os

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

# Ruta za OCR obradu
@app.post("/process-ocr")
async def process_ocr(filenames: List[str]):  # Ovdje sada očekujemo listu stringova
    print(f"Processing OCR for files: {filenames}")
    # Implementacija za OCR obradu (pozivanje Google Vision API-a ili slično)
    # Simuliramo da se OCR izvršio na datotekama
    return {"message": "OCR processing completed", "files": filenames}
