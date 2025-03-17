import React, { useState } from "react";
import axios from "axios";
import Navbar from "./NavBar";

const apiUrl = process.env.REACT_APP_API_URL_LOCAL || process.env.REACT_APP_API_URL_PROD;

function PersonalPage() {
  const [files, setFiles] = useState(null);
  const [progress, setProgress] = useState({ started: false, pc: 0 });
  const [msg, setMsg] = useState(null);

  async function handleUpload() {
    if (!files) {
      setMsg("No file selected");
      return;
    }

    const fd = new FormData();
    for (let i = 0; i < files.length; i++) {
      fd.append("files", files[i]); // Mora se zvati "files" da se poklopi sa FastAPI

      console.log(`Uploading: ${files[i].name}`); // Debugging
    }

    setMsg("Uploading...");
    setProgress({ started: true, pc: 0 });

    try {
      const res = await axios.post(`${apiUrl}/upload`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
        onUploadProgress: (progressEvent) => {
          setProgress({ started: true, pc: Math.round((progressEvent.loaded * 100) / progressEvent.total) });
        },
      });
      console.log(`${apiUrl}/upload`); 
      setMsg("Upload Successful!");
      console.log("Server response:", res.data);
    } catch (err) {
      setMsg("Upload failed");
      console.error("Error:", err);
    }
  }

  return (
    <div className="min-h-screen bg-lightest">
      <Navbar />

      <div className="flex flex-col items-center justify-center mt-10 space-y-6">
        <h1 className="text-2xl font-bold text-midnight">Upload Documents</h1>

        <div className="bg-white p-6 rounded-lg shadow-lg w-96 flex flex-col items-center">
          <input
            type="file"
            className="border p-2 rounded-md w-full"
            multiple
            onChange={(e) => setFiles(e.target.files)}
          />
          <button
            onClick={handleUpload}
            className="mt-4 bg-midnight text-lightest px-4 py-2 rounded-md hover:bg-blue transition"
          >
            Upload
          </button>

          {progress.started && <progress max="100" value={progress.pc} className="w-full mt-3"></progress>}
          {msg && <span className="text-sm mt-2">{msg}</span>}
        </div>

        <div>My files</div>
      </div>
    </div>
  );
}

export default PersonalPage;
