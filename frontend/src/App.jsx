import React, { useState, useEffect } from "react";
import VideoUploadForm from "./components/VideoUploadForm";
import Video from "./components/Video"; 
import axios from "axios";
import  LoginButton  from "./components/LoginButton.jsx";
import  LogoutButton  from "./components/LogoutButton.jsx";
import { useAuth0 } from "@auth0/auth0-react";

export default function App() {
  //const [uploadedUrl, setUploadedUrl] = useState(null);//save the url from backend
  const [signedUrl, setSignedUrl] = useState(null); //store temporary signedUrl
  const { isAuthenticated, isLoading } = useAuth0();

  const handleUploadComplete = async (key) => {
    //called when uploading is finished
    console.log("Upload finished! Video URL:", key); //key -> path to the bucket from backend
    try {
      const res = await axios.get(
        `http://localhost:8000/signed-url/${encodeURIComponent(key)}`, //encodeURIComponent -> accept and encodes special characters
        {
          params: { key }, //send key as query parameter
        }
      );
      setSignedUrl(res.data.signedUrl);
      console.log("Signed url:", res.data.signedUrl);

    } catch (error) {
      console.error("Error getting signed URL:", error);
      alert("Failed to generate signed URL");
    }

  }; //runs when upload finishes
    if (isLoading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      {isAuthenticated ? (
        <>
          <VideoUploadForm onUploadComplete={handleUploadComplete} />
          {signedUrl && (
            <div className=" w-full max-w-3xl p-6 text-center">
              <h3 className="text-2xl font-semibold mb-4">Uploaded Video :</h3>
              <Video src={signedUrl} />
            </div>
          )}
          <LogoutButton  />
        </>
      ) : (
        <>
          <LoginButton  />
        </>
      )}
    </div>
  );
}
