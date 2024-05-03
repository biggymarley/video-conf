import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { motion } from "framer-motion";
import { useContext, useState } from "react";
import { BiSolidVolumeFull } from "react-icons/bi";
import { BsFilePerson } from "react-icons/bs";
import { FaPowerOff } from "react-icons/fa";
import { IoChatbubbleSharp } from "react-icons/io5";
import { RiUserSettingsFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import logo from "../assets/chillGray.png";
import {
  ChatContext,
  FrameContext,
  RoomsContext,
  UserContext,
} from "../Context/UserContext";
import JoinForm from "./JoinForm";
import { NavBarMobileConf } from "./NavBarMobileConf";
import Peer from "./Peer";
import LiquidSideNav from "./SideChat";

const Conference = () => {
  const peers = useHMSStore(selectPeers);
  const [rightClicked, setightClicked] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [active, setActive] = useState(false);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <FrameContext.Provider
      value={{ anchorEl, setAnchorEl, handleClick, handleClose }}
    >
      <div className="flex min-h-screen  w-full relative  md:pb-0 z-[999]">
        <SideBarWeb />
        <NavBarMobileConf active={active} setActive={setActive} />
        <div className="flex w-full h-full min-h-screen bg-black lg:pl-[5.5rem] py-8 flex-grow overflow-auto px-2 relative">
          <div className=" grid grid-rows-[500px_1fr] gap-2 gap-y-8  sm:lg-grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4  min-h-[calc(100vh-7rem)] flex- px-0 py-20  pb-20 justify-center relative w-full h-full">
            {peers.map((peer, index) => (
              <>
                <Peer
                  key={index}
                  peer={peer}
                  setightClicked={setightClicked}
                  open={rightClicked}
                  index={index}
                />
              </>
            ))}
          </div>
          <div className="absolute inset-0 z-0">
            <Canvas>
              <Stars radius={50} count={2500} factor={4} fade speed={2} />
            </Canvas>
          </div>
        </div>
        <LiquidSideNav peers={peers} active={active} setActive={setActive} />
        <RoomInfos active={active} setActive={setActive} />
      </div>
    </FrameContext.Provider>
  );
};

const RoomInfos = ({ setActive, active }) => {
  const { selectedRoom, rooms } = useContext(RoomsContext);
  const { setIsOpen, isOpen } = useContext(ChatContext);

  return (
    <div className="absolute top-3 flex w-full transition " id="child">
      <p className="lg:ml-[100px] ml-[8px] mb-4 font-sans font-bold text-xl flex items-center gap-1 flex-grow">
        {rooms?.[selectedRoom]?.label}
        <BiSolidVolumeFull />
      </p>

      <button
        className={`absolute lg:right-4 right-12 top-[-3] mb-4 ${
          isOpen ? "hidden" : "block"
        }`}
        onClick={() => setIsOpen(true)}
      >
        <IoChatbubbleSharp size={25} />
      </button>
      <div className="absolute top-0 right-6">
        <HamburgerButton active={active} setActive={setActive} />
      </div>
    </div>
  );
};
const Dialog = () => {
  const { clearToken } = useContext(UserContext);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="p-4 bg-primary flex gap-4 flex-col items-center justify-center w-full rounded-md"
    >
      <p className="font-sans font-bold font-xxl">
        Are you sure you want to Logout
      </p>
      <button
        className="p-2 bg-bg text-white px-4 rounded-md font-sans font-bold font-xxl"
        onClick={() => clearToken()}
      >
        Logout
      </button>
    </motion.div>
  );
};

const SideBarWeb = () => {
  const { userData } = useContext(UserContext);
  return (
    <div className="z-[100] p-2 sm:p-0 w-[80px] lg:flex hidden flex-row sm:flex-col justify-center items-center sm:h-screen   bg-secondaryBg static sm:fixed ">
      <div className="flex-grow relative">
        <div>
          <button
            onClick={() =>
              toast(<Dialog />, {
                position: "top-center",
              })
            }
            className="z-[99] bg-red-500 flex justify-center items-center  p-4 w-full font-sans font-bold absolute bottom-0"
          >
            <FaPowerOff size={25} />
          </button>
        </div>
        <div>
          <Link
            to={"profile"}
            className="z-[99] flex justify-center items-center bg-bg hover:bg-gray-800 text-primary p-4 w-full font-sans font-bold absolute bottom-14 left-0"
          >
            <BsFilePerson size={30} />
          </Link>
        </div>
        {userData?.roles?.filter((role) => role.id === "admin").length > 0 ? (
          <div>
            <Link
              to={"admin"}
              className="z-[99] flex justify-center items-center bg-bg hover:bg-gray-800 text-primary  p-4 w-full font-sans font-bold absolute bottom-[115px] left-0"
            >
              <RiUserSettingsFill size={30} />
            </Link>
          </div>
        ) : null}

        <div className=" h-full w-[80px] min-h-screen  bg-secondaryBg flex-col md:flex hidden sticky justify-start items-center">
          <div className="border-b-[1px] pb-2 w-full flex justify-center border-white/20">
            <div className="rounded-full  bg-slate-600 flex  w-[50px] h-[50px] justify-center items-center mt-4">
              <img src={logo} alt="logo" className="w-[50px] rounded-full" />
            </div>
          </div>
          <JoinForm />
        </div>
      </div>
    </div>
  );
};
export const HamburgerButton = ({ active, setActive }) => {
  return (
    <>
      <motion.div
        initial={false}
        animate={active ? "open" : "closed"}
        variants={UNDERLAY_VARIANTS}
        style={{ top: 8, right: 3 }}
        className="block lg:hidden fixed z-10 h-[calc(100vh_-_120px)] rounded-md bg-gradient-to-br from-secondaryBg to-bg shadow-lg shadow-violet-800/20 w-[30px]"
      />

      <motion.button
        initial={false}
        animate={active ? "open" : "closed"}
        onClick={() => setActive((pv) => !pv)}
        className={`block lg:hidden group fixed right-[3px] top-[8px] z-50 h-[30px] w-[30px] bg-white/0 transition-all hover:bg-white/20 ${
          active ? "rounded-bl-xl rounded-tr-xl" : "rounded-sm"
        }`}
      >
        <motion.span
          variants={HAMBURGER_VARIANTS.top}
          className="absolute block h-[.5px] w-4 bg-white"
          style={{ y: "-50%", left: "50%", x: "-50%" }}
        />
        <motion.span
          variants={HAMBURGER_VARIANTS.middle}
          className="absolute block h-[.5px] w-4 bg-white"
          style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
        />
        <motion.span
          variants={HAMBURGER_VARIANTS.bottom}
          className="absolute block h-[.5px] w-1 bg-white"
          style={{ x: "-160%", y: "50%" }}
        />
      </motion.button>
    </>
  );
};

const UNDERLAY_VARIANTS = {
  open: {
    width: "calc(100% - 6px)",
    height: "calc(100vh - 120px)",
    transition: { type: "spring", mass: 3, stiffness: 400, damping: 50 },
  },
  closed: {
    width: "30px",
    height: "30px",
    transition: {
      delay: 0.75,
      type: "spring",
      mass: 3,
      stiffness: 400,
      damping: 50,
    },
  },
};

const HAMBURGER_VARIANTS = {
  top: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      top: ["35%", "50%", "50%"],
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      top: ["50%", "50%", "35%"],
    },
  },
  middle: {
    open: {
      rotate: ["0deg", "0deg", "-45deg"],
    },
    closed: {
      rotate: ["-45deg", "0deg", "0deg"],
    },
  },
  bottom: {
    open: {
      rotate: ["0deg", "0deg", "45deg"],
      bottom: ["35%", "50%", "50%"],
      left: "50%",
    },
    closed: {
      rotate: ["45deg", "0deg", "0deg"],
      bottom: ["50%", "50%", "35%"],
      left: "calc(50% + 10px)",
    },
  },
};

export default Conference;
