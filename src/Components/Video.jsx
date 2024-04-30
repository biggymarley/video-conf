import { useVideo } from "@100mslive/react-sdk";
import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";

export default function Video({ peer }) {
  const [open, setOpen] = useState(false);
  const { userData } = useContext(UserContext);
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });

  return (
    <div
      onClick={open ? () => setOpen(false) : undefined}
      className={
        open
          ? " rounded flex items-center justify-center w-screen min-h-screen h-full fixed top-0 left-0 z-[99] bg-bg/50 backdrop-blur-xl overflow-auto cursor-pointer"
          : "w-full h-full cursor-pointer flex items-center justify-center"
      }
    >
      <video
        onClick={() => setOpen(true)}
        ref={videoRef}
        className={
          open
          ? "peer-video z-[2] w-auto md:h-screen h-auto   p-2 md:p-14 cursor-pointer"
          : "peer-video z-[2] w-full h-full md:h-full cursor-pointer"
        }
        autoPlay
        muted
        playsInline
      ></video>
        <img
          src={userData.logoUrl}
          alt={"user-logo"}
          className="w-20 absolute z-[1]"
        />
    </div>
  );
}
