import React from "react";
import VideoUploadForm from "../components/VideoUploadForm";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

export default function Upload({onLoadVideos}) {
  const {isAuthenticated, loginWithRedirect} = useAuth0();

  if (!isAuthenticated) {
    return (
      <div className="p-8 text-center">
        <p className="text-xl mb-4">You must be logged in to upload videos.</p>
        <button
          onClick={() => loginWithRedirect()}
          className="p-3 bg-blue-600 text-white rounded"
        >
          Login
        </button>
      </div>
    );
  }
  return (
    <div className="p-8 flex justify-center">
      <VideoUploadForm onLoadVideos={onLoadVideos}/>
    </div>
  );
}
