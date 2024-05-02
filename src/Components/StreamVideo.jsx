import { useVideo } from "@100mslive/react-sdk";
import React, { useEffect, useState } from "react";

export default function StreamVideo({
  screenshareVideoTrack,
  presenter,
  peer,
}) {
  const [open, setOpen] = useState(false);
  const { videoRef } = useVideo({
    trackId: screenshareVideoTrack?.id,
  });

  return screenshareVideoTrack &&
    presenter?.filter((pre) => pre.name === peer.name).length > 0 ? (
    <div className="flex z-[20] flex-col h-full sm:h-auto relative ">
      <div className="w-full  h-full rounded-xl overflow-visible flex flex-col ">
        <div
          onClick={open ? () => setOpen(false) : undefined}
          className={
            open
            ? "lg:pl-12 p-1 max-h-screen rounded-md flex items-center justify-center w-screen min-h-screen h-full fixed top-0 left-0 z-[99] bg-bg/50 backdrop-blur-xl overflow-auto cursor-pointer"
            : "rounded-md w-full h-full cursor-pointer flex items-center justify-center shadow-xl shadow-black"
          }
        >
          <video
            onClick={() => setOpen(true)}
            ref={videoRef}
            className={
              open
                ? "rounded-md max-h-screen w-auto h-auto p-2 md:p-14 cursor-pointer"
                : "rounded-md peer-video w-full h-full  cursor-pointer "
            }
            autoPlay
            muted
            playsInline
          ></video>
        </div>
      </div>
    </div>
  ) : null;
}
