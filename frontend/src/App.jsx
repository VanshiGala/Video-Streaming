import React, { useState } from "react";
import VideoUploadForm from "./components/VideoUploadForm";
import Video from "./components/Video"; 

export default function App() {
  const [uploadedUrl, setUploadedUrl] = useState(null);//save the url from backend

  const handleUploadComplete = (url) => {
    console.log("Upload finished! Video URL:", url);
    setUploadedUrl(url);
  }; //runs when upload finishes

  return (
    <div>
      <VideoUploadForm onUploadComplete={handleUploadComplete} />
      {uploadedUrl && (
        <div>
          <h3>Uploaded Video:</h3>
          <Video src={uploadedUrl} />
        </div>
      )} //show the video only when sucessfully uploaded
    </div>
  );
}
