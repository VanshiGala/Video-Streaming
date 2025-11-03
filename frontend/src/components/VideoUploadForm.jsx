import React, { useState } from "react";
import axios from "axios";

function VideoUploadForm({ onUploadComplete }) { //prop passed from parent component app.jsx to child component
  const [selectedFile, setSelectedFile] = useState(null); //inputfile state
  const [uploading, setUploading] = useState(false); //uploading status

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]); //display selected file 
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a video first!"); //if file not selected
      return;
    }

    const formData = new FormData();
    formData.append("video", selectedFile); //here "video" is the key. It should be same as in backend
    setUploading(true); //uploading status when selected

    try {
      const response = await axios.post("http://localhost:8000/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
      setUploading(false);
    }
  };

  return (
    <div>
      <h2>Upload Your Video</h2>
      <input type="file" accept="video/*" onChange={handleFileChange} />
      <button onClick={handleUpload} className="cursor-pointer">Upload</button>
      {uploading ? "Uploading..." : "Upload Video"}
    </div>
  );
}
export default VideoUploadForm;


//upload(frontend)  -> backend -> bucket upload
//when the user uploads the video , it is passed to backend and then the backend uploads it to bucket.