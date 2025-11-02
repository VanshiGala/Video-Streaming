import React, { useState } from "react";
import axios from "axios";

function VideoUploadForm({ onUploadComplete }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a video first!");
      return;
    }

    const formData = new FormData();
    formData.append("video", selectedFile);
    setUploading(true);

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