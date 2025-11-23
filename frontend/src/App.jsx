// import React, { useState, useEffect } from "react";
// import VideoUploadForm from "./components/VideoUploadForm";
// import Video from "./components/Video"; 
// import axios from "axios";
// import  LoginButton  from "./components/LoginButton.jsx";
// import  LogoutButton  from "./components/LogoutButton.jsx";
// import { useAuth0 } from "@auth0/auth0-react";

// export default function App() {
//   //const [uploadedUrl, setUploadedUrl] = useState(null);//save the url from backend
//   const [signedUrl, setSignedUrl] = useState(null); //store temporary signedUrl
//   const { isAuthenticated, isLoading } = useAuth0();
//   const [videos, setVideos] = useState([])

//   const handleUploadComplete = async (key) => {
//     //called when uploading is finished
//     console.log("Upload finished! Video URL:", key); //key -> path to the bucket from backend
//     try {
//       const res = await axios.get(
//         `http://localhost:8000/signed-url/${encodeURIComponent(key)}`, //encodeURIComponent -> accept and encodes special characters
//         {
//           params: { key }, //send key as query parameter
//         }
//       );
//       setSignedUrl(res.data.signedUrl);
//       console.log("Signed url:", res.data.signedUrl);

//     } catch (error) {
//       console.error("Error getting signed URL:", error);
//       alert("Failed to generate signed URL");
//     }

//   }; //runs when upload finishes
//     if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center">
//       {isAuthenticated ? (
//         <>
//           <VideoUploadForm onUploadComplete={handleUploadComplete} />
//           {signedUrl && (
//             <div className=" w-full max-w-3xl p-6 text-center">
//               <h3 className="text-2xl font-semibold mb-4">Uploaded Video :</h3>
//               <Video src={signedUrl} />
//             </div>
//           )}
//           <LogoutButton  />
//         </>
//       ) : (
//         <>
//           <LoginButton  />
//         </>
//       )}
//     </div>
//   );
// }


//imports
// import React, { useState, useEffect } from "react";
// import VideoUploadForm from "./components/VideoUploadForm";
// import Video from "./components/Video";
// import axios from "axios";
// import LoginButton from "./components/LoginButton.jsx";
// import LogoutButton from "./components/LogoutButton.jsx";
// import { useAuth0 } from "@auth0/auth0-react";

// export default function App() {
//   const [videos, setVideos] = useState([]); // list of videos from database
//   const { isAuthenticated, isLoading, getAccessTokenSilently } = useAuth0();

// //fetch videos and get signed-urls
//   const loadVideos = async () => {
//     try {
//       const token = await getAccessTokenSilently({
//         audience: "https://video-stream-api",
//       });

//       // Get fileNames from DB
//       const res = await axios.get("http://localhost:8000/all", {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       const videosFromDb = res.data;

//       // For each video -> generate signed URL
//       const withSignedUrls = await Promise.all(
//         videosFromDb.map(async (video) => {
//           const urlRes = await axios.get(
//             `http://localhost:8000/signed-url/${encodeURIComponent(
//               video.fileName
//             )}`
//           );
//           return {
//             ...video,
//             signedUrl: urlRes.data.signedUrl,
//           };
//         })
//       ); //S3 obj req signed URLS for secure access, making it streamable in browser

//       setVideos(withSignedUrls); //save the result
//     } catch (error) {
//       console.error("Error loading videos:", error);
//     }
//   };

//   // Load videos on mount
//   useEffect(() => {
//     if (isAuthenticated) {
//       loadVideos();
//     }
//   }, [isAuthenticated]);

//  //after upload
//   const handleUploadComplete = async () => {
//     await loadVideos(); // refresh automatically
//   };

//   if (isLoading) return <p>Loading...</p>;

//   return (
//     <div className="min-h-screen flex flex-col items-center justify-center">
//       {isAuthenticated ? (
//         <>
//           <VideoUploadForm onUploadComplete={handleUploadComplete} />

//           {/* All videos from DB */}
//           <div className="w-full max-w-4xl p-6">
//             <h2 className="text-2xl mb-4 text-center font-bold">Your Videos</h2>

//             {videos.map((v) => (
//               <div key={v._id} className="mb-8 flex flex-col items-center">
//                 <Video src={v.signedUrl} />
//                 <p className="mt-2 text-sm text-gray-500">{v.fileName}</p>
//               </div>
//             ))}
//           </div>

//           <LogoutButton />
//         </>
//       ) : (
//         <>
//           <LoginButton />
//         </>
//       )}
//     </div>
//   );
// }



import { Routes, Route, Link } from "react-router-dom";
import Home from "./components/Home";
import Upload from "./components/Upload";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";
import { useAuth0 } from "@auth0/auth0-react";
import Navbar from "./components/Navbar";

export default function App() {
  const { isAuthenticated,user } = useAuth0();

  return (
    <div>
      <Navbar/>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload />} />
      </Routes>
    </div>
  );
}
