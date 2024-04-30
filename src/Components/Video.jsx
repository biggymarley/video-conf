import { useVideo } from "@100mslive/react-sdk";
import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import RightClickMenu from "./RightClickMenu";

export default function Video({ peer, setightClicked, open }) {
  const [opens, setOpen] = useState(false);
  const { usersData } = useContext(UserContext);
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });
  return (
    <div
      onClick={opens ? () => setOpen(false) : undefined}
      className={
        opens
          ? "rounded flex items-center justify-center w-screen min-h-screen h-full fixed top-0 left-0 z-[99] bg-bg/50 backdrop-blur-xl overflow-auto cursor-pointer"
          : "rounded-xl w-full h-full cursor-pointer flex items-center justify-center shadow-xl shadow-black"
      }
    >
      {open === peer.name ? (
        <RightClickMenu
          open={open !== null}
          setOpen={setightClicked}
          peerid={open}
        />
      ) : null}
        <video
          onClick={() => setOpen(true)}
          ref={videoRef}
          className={
            opens
              ? "peer-video z-[2] w-auto md:h-screen h-auto   p-2 md:p-14 cursor-pointer"
              : "rounded-xl peer-video z-[2] w-full h-full md:h-full cursor-pointer shadow shadow-black"
          }
          autoPlay
          muted
          playsInline
        ></video>
      <img
        src={
          usersData?.filter((user) => user.userName === peer.name)?.[0]?.logoUrl
        }
        alt={"user-logo"}
        className="w-20 h-20 rounded-full  absolute z-[1] shadow-md shadow-black outline-[5px] outline-black"
      />
    </div>
  );
}
