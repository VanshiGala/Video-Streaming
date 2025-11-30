import React, { useEffect, useRef } from "react";
import videojs from "video.js";
import "video.js/dist/video-js.css"; //imp

export default function Video({ src }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    //  Do nothing until we actually have a valid video URL
    if (!src || !videoRef.current) return;

    const timer = setTimeout(() => {
    if (!playerRef.current) {
      playerRef.current = videojs(videoRef.current, {
        controls: true,
        autoplay: false,
        preload: "none", //none
        width: 640,
        height: 360,
        fluid: true,
      });
    }

    playerRef.current.src({ src, type: "video/mp4" });
  },100);

    return () => {
      if (playerRef.current) {
        playerRef.current.dispose();
        playerRef.current = null;
      }
    };
  }, [src]);

  return (
    <div data-vjs-player className="mt-6 w-[640px]"> 
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered rounded-lg shadow-md"
        data-setup="{}"
      ></video>
    </div>
  );
}

