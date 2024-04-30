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
    presenter.filter((pre) => pre.name === peer.name).length > 0 ? (
    <div className="flex z-[99] flex-col h-[200px] sm:h-auto w-[200px] basis-2/4 sm:basis-auto sm:w-[400px] relative">
      <div className="w-full h-[200px]  md:rounded-md overflow-visible flex border flex-col ">
        <div
          onClick={open ? () => setOpen(false) : undefined}
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
                ? "peer-video w-full h-auto md:h-auto p-2 md:p-14 cursor-pointer"
                : "peer-video w-full h-auto md:h-full cursor-pointer"
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
