import React, { useState } from "react";
import axios from "axios";
import Navbar from "./NavBar";
import Footer from "./Footer";

const apiUrl =
  process.env.NODE_ENV === "development"
    ? process.env.REACT_APP_API_URL_LOCAL
    : process.env.REACT_APP_API_URL_PROD;

console.log("API URL:", apiUrl); // Debug info

function PersonalPage() {
  const [files, setFiles] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);
  const [ocrResult, setOcrResult] = useState("");

  async function handleUpload() {
    if (!files) {
      setMsg("No file selected");
      return;
    }

    const fd = new FormData();
    for (let i = 0; i < files.length; i++) {
      fd.append("files", files[i]);
    }

    setMsg("Uploading...");
    setProgress({ started: true, pc: 0 });

    try {
      const res = await axios.post(`${apiUrl}/upload`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          setProgress({
            started: true,
            pc: Math.round((progressEvent.loaded * 100) / progressEvent.total),
          });
        },
      });
      setMsg("Upload Successful!");
      console.log("Server response:", res.data);
    } catch (err) {
      setMsg("Upload failed");
      console.error("Error:", err);
    }
  }

  async function handleOCR() {
    if (!files) {
      setMsg("No files to process");
      return;
    }

    const filenames = Array.from(files).map((file) => file.name);

    try {
      const res = await axios.post(`${apiUrl}/process-ocr`, {
        filenames: filenames, // šalje kao JSON: { filenames: [...] }
      });

      console.log("OCR Response:", res.data);
      setOcrResult(res.data.extracted_text.map((item) => item.text).join("\n"));
      setMsg("OCR Processing Complete!");
    } catch (err) {
      console.error("OCR Error:", err);
      setMsg("OCR Processing Failed");
    }
  }

  function handleDownload() {
    const element = document.createElement("a");
    const file = new Blob([ocrResult], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "ocr_result.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  }
  

  return (
    <div className="flex flex-col min-h-screen bg-lightest">

      <Navbar />

      <div className="flex flex-col items-center justify-center mt-10 space-y-6 flex-grow">
        <h1 className="text-2xl font-bold text-midnight">Upload Documents</h1>

        <div className="bg-gradient-to-b from-lightest to-lightblue  p-6 rounded-lg shadow-lg w-96 flex flex-col items-center">
          <input
            type="file"
            className="border bg-lightest p-2 rounded-md w-full"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />
          <button
            onClick={handleUpload}
            className="mt-4 bg-midnight text-lightest px-4 py-2 rounded-md hover:bg-blue transition"
          >
            Upload
          </button>

          <button
            onClick={handleOCR}
            className="mt-4 bg-midnight text-lightest px-4 py-2 rounded-md hover:bg-blue transition"
          >
            Process OCR
          </button>

          {progress.started && (
            <progress max="100" value={progress.pc} className="w-full mt-3"></progress>
          )}
          {msg && <span className="text-sm mt-2">{msg}</span>}
        </div>

        {ocrResult && (
  <div className="mt-6 mb-10 p-4 bg-lightblue rounded-md w-full max-w-4xl text-midnight">
        <h2 className="font-bold">OCR Output:</h2>
    <div className="bg-lightest p-4 rounded-md mb-4 max-h-64 overflow-y-auto whitespace-pre-wrap">
    <pre>{ocrResult}</pre>
    </div>
    <button
      onClick={handleDownload}
      className="bg-midnight text-lightest px-4 py-2 rounded-md hover:bg-blue transition"
    >
      Download Text
    </button>
  </div>
)}

      </div>

      <Footer />
    </div>
  );
}

export default PersonalPage;
