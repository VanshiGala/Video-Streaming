import React, { useState } from "react";
import VideoUploadForm from "./components/VideoUploadForm";
import Video from "./components/Video"; // your video.js player

export default function App() {
  const [uploadedUrl, setUploadedUrl] = useState(null);

  const handleUploadComplete = (url) => {
    console.log("Upload finished! Video URL:", url);
    setUploadedUrl(url); // Save the video URL
  };

  return (
    <div>
      <VideoUploadForm onUploadComplete={handleUploadComplete} />

      {uploadedUrl && (
        <div>
          <h3>Uploaded Video:</h3>
          <Video src={uploadedUrl} />
        </div>
      )}
    </div>
  );
}
