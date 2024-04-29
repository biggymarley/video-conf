import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import Peer from "./Peer";
import logo from "../assets/discord.png";
import Footer from "./Footer";
import { useContext, useState } from "react";
import { ChatContext, RoomsContext } from "../Context/UserContext";
import { BiSolidVolumeFull } from "react-icons/bi";
import { IoChatbubbleSharp } from "react-icons/io5";

const Conference = () => {
  const peers = useHMSStore(selectPeers);
  const [rightClicked, setightClicked] = useState(false);
  return (
    <div
      className="flex min-h-screen  w-full relative pb-12 md:pb-0"
      onClick={() => setightClicked(false)}
    >
      <div className="h-full min-h-screen p-0 md:p-4 bg-secondaryBg md:flex hidden sticky ">
        <div className="rounded-full bg-slate-600 flex w-[50px] h-[50px] justify-center items-center">
          <img
            src={logo}
            alt="logo"
            className="w-[35px] filter  invert brightness-0"
          />
        </div>
      </div>
      <div className="w-full h-full min-h-screen bg-black p-0 md:p-8 flex-grow overflow-auto">
        <div className="flex  flex-wrap sm:gap-4 px-0 py-20 md:p-6 pb-20 justify-center">
          {peers.map((peer) => (
            <Peer
              key={peer.id}
              peer={peer}
              rightClicked={rightClicked}
              setightClicked={setightClicked}
            ></Peer>
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
      <p className="md:ml-[100px] ml-[20px] font-bold text-xl flex items-center gap-1 flex-grow">
        {rooms?.data?.[selectedRoom]?.template}
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
