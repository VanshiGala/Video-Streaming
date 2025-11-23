import React, { useEffect, useState } from "react";
import axios from "axios";
import Video from "../components/Video";
//import { useAuth0 } from "@auth0/auth0-react";
//import VideoUploadForm from "../components/VideoUploadForm";
import {Search} from "lucide-react"

export default function Home() {
  const [videos, setVideos] = useState([]); //list of videos from DB
  //const { isAuthenticated } = useAuth0();

  const onLoadVideos = async () => {
    // const token = await getAccessTokenSilently({
    //  audience: "https://video-stream-api",
    // });
    try {
      //fetch videos from DB
      const res = await axios.get("http://localhost:8000/all", {
        // headers: { Authorization: `Bearer ${token}` },
      });

      // Generate signed URLs
      const data = await Promise.all(
        res.data.map(async (video) => {
          const urlRes = await axios.get(
            `http://localhost:8000/signed-url/${encodeURIComponent(
              //encodeURIComponent -> accept and encodes special characters
              video.fileName
            )}`
          );
          return { ...video, signedUrl: urlRes.data.signedUrl }; //return already uploaded videos + newVideos
        })
      );

      setVideos(data);
    } catch (err) {
      console.error("Failed to load videos", err);
    }
  };

  useEffect(() => {
    // if (isAuthenticated) loadVideos();
    onLoadVideos();
  }, []);
  // }, [isAuthenticated]);

  return (
    <div className="p-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {videos.map((v) => (
          <div key={v._id} className="flex flex-col items-center">
            <Video
              src={v.signedUrl}
              className="w-40 h-24 md:w-48 md:h-28 rounded-md object-cover"
            />
            <p className="text-gray-500 text-sm mt-2 truncate w-40 md:w-48 text-center">
              {v.fileName}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
