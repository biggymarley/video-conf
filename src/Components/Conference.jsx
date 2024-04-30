import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import Peer from "./Peer";
import logo from "../assets/discord.png";
import Footer from "./Footer";
import { useContext, useState } from "react";
import { ChatContext, RoomsContext, UserContext } from "../Context/UserContext";
import { BiSolidVolumeFull } from "react-icons/bi";
import { IoChatbubbleSharp } from "react-icons/io5";
import LiquidSideNav from "./SideChat";
import JoinForm from "./JoinForm";
import RightClickMenu from "./RightClickMenu";

const Conference = () => {
  const peers = useHMSStore(selectPeers);
  const [rightClicked, setightClicked] = useState(null);
  const { userData } = useContext(UserContext);
  return (
    <div
      className="flex min-h-screen  w-full relative pb-12 md:pb-0"
    >
      <div className="z-[99] h-full w-[90px] min-h-screen  bg-secondaryBg flex-col md:flex hidden sticky justify-start items-center">
        <div className="border-b-[1px] pb-2 w-full flex justify-center border-white/20">
          <div className="rounded-full  bg-slate-600 flex  w-[50px] h-[50px] justify-center items-center mt-4">
            <img
              src={logo}
              alt="logo"
              className="w-[35px] filter  invert brightness-0"
            />
          </div>
        </div>
        <JoinForm />
      </div>
      <div className="w-full h-full min-h-screen bg-black p-0 py-8 flex-grow overflow-auto" >
        <div className="flex  flex-wrap sm:gap-4 px-0 py-20  pb-20 justify-center relative" >
          {peers.map((peer, index) => (
            <>
              <Peer
                key={peer.id}
                peer={peer}
                setightClicked={setightClicked}
                open={rightClicked}
                index={index}
              />
            </>
          ))}
        </div>
      </div>
      <LiquidSideNav peers={peers} />
      <RoomInfos />
    </div>
  );
};

const RoomInfos = () => {
  const { selectedRoom, rooms } = useContext(RoomsContext);
  const { setIsOpen, isOpen } = useContext(ChatContext);

  return (
    <div className="absolute top-3 flex w-full transition " id="child">
      <p className="md:ml-[100px] ml-[20px] font-sans font-bold text-xl flex items-center gap-1 flex-grow">
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
