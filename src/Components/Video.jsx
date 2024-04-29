import { useVideo } from "@100mslive/react-sdk";
import React, { useState } from "react";

export default function Video({ peer }) {
  const [open, setOpen] = useState(false);
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });

  return (
    <div
      onClick={open ?  (() => setOpen(false)) : undefined}
      className={
        open
          ? "flex items-center justify-center w-screen min-h-screen h-full fixed top-0 left-0 z-50 bg-bg/50 backdrop-blur-xl overflow-auto cursor-pointer"
          : "w-full h-full cursor-pointer"
      }
    >
      <video
        onClick={() => setOpen(true)}
        ref={videoRef}
        className={
          open
            ? "peer-video w-auto md:h-screen h-auto   p-2 md:p-14 cursor-pointer"
            : "peer-video w-full h-full md:h-full cursor-pointer"
        }
        autoPlay
        muted
        playsInline
      ></video>
    </div>
  );
}
