
import React, { useState,useEffect } from "react";
import axios from "axios";
import { useAuth0 } from "@auth0/auth0-react";

function VideoUploadForm({ onUploadComplete }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const {user, isAuthenticated,getAccessTokenSilently} = useAuth0()

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert("Please select a video first!");
      return;
    }

    // const formData = new FormData();
    // formData.append("video", selectedFile);
    // setUploading(true);

    try {
      const formData = new FormData();
      formData.append("video", selectedFile);
      setUploading(true);

      //token is required for uploading video
       const token = await getAccessTokenSilently({
         audience: "https://video-stream-api",
       });
       console.log(token);
      const response = await axios.post(
        "http://localhost:8000/upload",
        formData,
        {
          headers: {
            Authorization:`Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.key) {
        onUploadComplete(response.data.key); // Pass the key to App.jsx
      } else {
        alert("Upload succeeded but no key returned!");
      }
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Please try again.");
    } finally {
      // Always reset uploading status
      setUploading(false);
    }
  };

  useEffect(() => {
    const registerUser = async () => {
      if (!isAuthenticated) return;

      const token = await getAccessTokenSilently({
        audience: "https://video-stream-api",
      });

      await axios.post(
        "http://localhost:8000/users",
        {
          email: user.email,
          name: user.name,
        },
        {
          withCredentials:true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
      }
      );
    };
    if (isAuthenticated && user?.email) {
      registerUser();
    }
  }, [isAuthenticated, user?.email]);


  return (
    <div className="flex flex-col items-center justify-center w-full p-6 max-w-md  ">
      {isAuthenticated ? (
        <>
          <h1>Welcome, {user.name}</h1>
        </>
      ):(
          <h1>Welcome Guest</h1>
      )}
      <h2 className="text-2xl font-semibold mb-4">
        Upload your Video
      </h2>
      <div className="w-full flex flex-col items-center space-y-3">
        <input type="file" accept="video/*" onChange={handleFileChange} className="border-2 bg-gray-200 p-2 cursor-pointer rounded"/>
        <button
          onClick={handleUpload}
          disabled={uploading}
          className="cursor-pointer border-3 p-2 rounded-2xl hover:bg-gray-400"
        >
          {uploading ? "Uploading..." : "Upload Video"}
        </button>
      </div>
    </div>
  );
}

export default VideoUploadForm;












//upload(frontend)  -> backend -> bucket upload
//when the user uploads the video , it is passed to backend and then the backend uploads it to bucket.