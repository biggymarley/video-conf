import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import Peer from "./Peer";
import logo from "../assets/discord.png";
import Footer from "./Footer";
import { useContext } from "react";
import { ChatContext, RoomsContext } from "../Context/UserContext";
import { BiSolidVolumeFull } from "react-icons/bi";
import { IoChatbubbleSharp } from "react-icons/io5";

const Conference = () => {
  const peers = useHMSStore(selectPeers);
  return (
    <div className="flex  min-h-screen h-full w-full relative ">
      <div className="h-full min-h-screen p-4 bg-secondaryBg sm:flex hidden">
        <div className="rounded-full bg-slate-600 flex w-[50px] h-[50px] justify-center items-center ">
          <img
            src={logo}
            alt="logo"
            className="w-[35px] filter  invert brightness-0"
          />
        </div>
      </div>
      <div className="min-h-screen w-full h-full bg-black p-4 sm:p-8 flex-grow">
        <div className="flex flex-wrap gap-4 p-4 md:p-16 justify-center">
          {peers.map((peer) => (
            <Peer key={peer.id} peer={peer}></Peer>
          ))}
        </div>
      </div>
      <Footer />
      <RoomInfos />
    </div>
  );
};

const RoomInfos = () => {
  const { selectedRoom, rooms } = useContext(RoomsContext);
  const { setIsOpen, isOpen } = useContext(ChatContext);

  return (
    <div className="absolute top-3 flex w-full transition " id="child">
      <p className="sm:ml-[100px] ml-[20px] font-bold text-xl flex items-center gap-1 flex-grow">
        {rooms?.data?.[selectedRoom]?.name}
        <BiSolidVolumeFull />
      </p>

      <button
        className={`mr-2 ${isOpen ? "hidden" : "block"}`}
        onClick={() => setIsOpen(true)}
      >
        <IoChatbubbleSharp size={25} />
      </button>
    </div>
  );
};

export default Conference;
