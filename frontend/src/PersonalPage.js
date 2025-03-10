import React, {useState} from "react";
import axios from "axios";

function PersonalPage() {
  const [files, setFile] = useState(null);
  const [progress, setProgress] = useState({started: false, pc: 0});
  const [msg, setMsg] = useState(null);
  

  function handleUpload() {
if (!files) {
  setMsg("No file selected");
  return;
}

const fd = new FormData();
for(let i=0; i<files.length;i++)
{
fd.append(`file${i+1}`, files[i]);
}
setMsg("Uploading...");
setProgress(prevState => {
  return {...prevState, started: true}
})
axios.post('http://httpbin.org/post', fd, {
  onUploadProgress: (progressEvent) => { setProgress(prevState => {
    return {...prevState, pc: progressEvent.progress*100}
  })},
  headers: {
    "costum_header": "value",
  }
})
.then(res =>{
  setMsg("Upload Successful");
  console.log(res.data)
})
.catch(err => {
  setMsg("Upload failed");
   console.error(err)
});
  }

  return (
    <div className="App">
    <input type="file" onChange={ (e) => {setFile(e.target.files[0])} }/>
    <button onClick = {handleUpload}>Upload</button>

    {progress.started && <progress max="100" value={progress.pc}></progress>}
    {msg && <span>{msg}</span>}
    </div>
  );
}

export default PersonalPage;