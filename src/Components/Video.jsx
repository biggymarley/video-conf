import { useVideo } from "@100mslive/react-sdk";
import React, { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";
import RightClickMenu from "./RightClickMenu";
import logo from "../assets/chillGray.png";
import bgColored from "../assets/bgColored.png";
export default function Video({ peer, setightClicked, open }) {
  const [opens, setOpen] = useState(false);
  const { usersData } = useContext(UserContext);
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });
  return (
    <div
      onClick={opens ? () => setOpen(false) : undefined}
      style={
        opens
          ? {
              backgroundColor: `${
                usersData?.filter((user) => user.userName === peer.name)?.[0]
                  ?.color
              }0D`,
            }
          : {}
      }
      className={
        opens
          ? "lg:pl-12 p-1 rounded flex items-center justify-center w-screen min-h-screen h-full fixed top-0 left-0 z-[99] bg-bg/50 backdrop-blur-xl overflow-auto cursor-pointer"
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
            ? "peer-video z-[2] w-full md:h-auto h-auto   p-2 md:p-14 cursor-pointer"
            : "rounded-md peer-video z-[2] w-full h-full md:h-full cursor-pointer shadow shadow-black"
        }
        autoPlay
        muted
        playsInline
      ></video>
      {usersData?.filter((user) => user.userName === peer.name)?.[0]
        ?.bannerUrl ? (
        <img
          src={`${
            usersData?.filter((user) => user.userName === peer.name)?.[0]
              ?.bannerUrl
          }?${new Date().getDate()}`}
          alt={"user-banner"}
          className={
            opens
              ? "object-cover w-[80%] h-auto rounded-md  filter blur-[2px] absolute z-[1] shadow-md shadow-black outline-[5px] outline-black"
              : "w-full h-full rounded-md  filter blur-[2px] absolute z-[1] shadow-md shadow-black outline-[5px] outline-black"
          }
        />
      ) : (
        <img
          src={bgColored}
          alt={"user-banner"}
          className={
            opens
              ? "w-auto h-auto rounded-md  filter blur-[2px] absolute z-[1] shadow-md shadow-black outline-[5px] outline-black"
              : "w-full h-full rounded-md  filter blur-[2px] absolute z-[1] shadow-md shadow-black outline-[5px] outline-black"
          }
        />
      )}
      {usersData?.filter((user) => user.userName === peer.name)?.[0]
        ?.logoUrl ? (
        <img
          src={`${
            usersData?.filter((user) => user.userName === peer.name)?.[0]
              ?.logoUrl
          }?${new Date().getDate()}`}
          alt={"user-logo"}
          className="w-[120px] h-[120px] rounded-full  absolute z-[2] shadow-md shadow-black outline-[5px] outline-black"
        />
      ) : (
        <img
          src={logo}
          alt={"user-logo"}
          className="w-[120px] h-[120px] rounded-full  absolute z-[2] shadow-md shadow-black outline-[5px] outline-black"
        />
      )}
    </div>
  );
}
