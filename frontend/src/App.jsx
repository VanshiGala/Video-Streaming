import React, { useState } from "react";
import VideoUploadForm from "./components/VideoUploadForm";
import Video from "./components/Video"; 
import axios from "axios";

export default function App() {
  //const [uploadedUrl, setUploadedUrl] = useState(null);//save the url from backend
  const [signedUrl, setSignedUrl] = useState(null) //store temporary signedUrl

  const handleUploadComplete = async (key) => { //called when uploading is finished
    console.log("Upload finished! Video URL:", key); //key -> path to the bucket from backend
    try {
      const res = await axios.get(
        `http://localhost:8000/signed-url/${encodeURIComponent(key)}`, //encodeURIComponent -> accept and encodes special characters
        {
          params: { key }, //send key as query parameter
        }
      );
       setSignedUrl(res.data.signedUrl);
      console.log("Signed url:",res.data.signedUrl )
    } catch (error) {
      console.error("Error getting signed URL:", error);
      alert("Failed to generate signed URL");
    }
  }; //runs when upload finishes

  return (
    <div>
      <VideoUploadForm onUploadComplete={handleUploadComplete} /> 
      {signedUrl && (
        <div>
          <h3>Uploaded Video:</h3>
          <Video src={signedUrl} />
        </div>
      )}
    </div>
  );
}
