import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { AnimatePresence, motion } from "framer-motion";
import React, { useContext } from "react";
import { FaPowerOff } from "react-icons/fa";
import { IoIosPerson } from "react-icons/io";
import { SiInstagram, SiLinkedin, SiYoutube } from "react-icons/si";
import { TiPlus } from "react-icons/ti";
import { Link } from "react-router-dom";
import logo from "../assets/chillGray.png";
import { LoadingContext } from "../Context/LoadingContext";
import { ChatContext, RoomsContext, UserContext } from "../Context/UserContext";

export const NavBarMobile = ({ active, setActive }) => {
  return (
    <>
      <AnimatePresence>{active && <LinksOverlay />}</AnimatePresence>
    </>
  );
};

const LinksOverlay = () => {
  return (
    <nav className="fixed right-4 top-4 z-40 h-[calc(100vh_-_32px)] w-[calc(100%_-_32px)] overflow-hidden">
      <Logo />
      <LinksContainer />
      <FooterCTAs />
    </nav>
  );
};

const LinksContainer = () => {
  const hmsActions = useHMSActions();
  const { rooms, getRoomCodes, setselectedRoom } = useContext(RoomsContext);
  const { userData } = useContext(UserContext);
  const { setModalOpen } = useContext(ChatContext);
  const { setAppLoading } = useContext(LoadingContext);
  const isConnected = useHMSStore(selectIsConnectedToRoom);

  const goLive = async (id, index) => {
    try {
      setAppLoading(true);
      if (isConnected) {
        hmsActions.leave();
      }
      const code = await getRoomCodes(id);
      const authToken = await hmsActions.getAuthTokenByRoomCode({
        roomCode: code.viwer,
      });
      await hmsActions.join({ userName: userData.userName, authToken });
      setselectedRoom(index);
      setAppLoading(false);
    } catch (e) {
      console.error(e);
      setAppLoading(false);
      setselectedRoom(null);
    }
  };
  return (
    <motion.div className="p-8 z-[100]">
      <div className="flex flex-col  h-full mt-6 justify-start items-center ">
        <div className="flex flex-col gap-4 w-full justify-center items-center ">
          {rooms?.map((room, index) => (
            <NavLink key={index} href={() => goLive(room.id, index)} className=''>
              <div className="w-[50px]  h-[50px]">
                <img
                  src={room.logoUrl}
                  alt="roomlogo"
                  className="w-full h-full rounded-full"
                />
              </div>
              <p className="font-sans font-bold lg:text-xl  text-md text-slate-300">
                {room.label}
              </p>
            </NavLink>
          ))}
          <div
            onClick={() => setModalOpen(true)}
            className=" shadow-bg shadow-md flex items-center justify-start gap-4 rounded-md w-full  h-auto p-7   	cursor-pointer bg-bg/50"
          >
            <TiPlus size={30} />{" "}
            <span className="font-sans font-bold lg:text-xl  text-md text-slate-300">
              Create Room
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const NavLink = ({ children, href, idx }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: {
          delay: 0.75 + idx * 0.125,
          duration: 0.5,
          ease: "easeInOut",
        },
      }}
      exit={{ opacity: 0, y: -8 }}
      onClick={href}
      className=" flex items-center gap-4 rounded  shadow-bg shadow-md w-full p-4 h-auto  bg-bg/50 backdrop-blur-xl	 transform scale-100 hover:scale-[1.02] 	cursor-pointer text-violet-400 transition-colors hover:text-violet-50 md:text-7xl"
    >
      {children}
    </motion.div>
  );
};

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: 0.5, duration: 0.5, ease: "easeInOut" },
      }}
      exit={{ opacity: 0, y: -12 }}
      className="grid h-20 w-20 place-content-center rounded-br-xl rounded-tl-xl bg-bg transition-colors hover:bg-violet-50"
    >
      <img src={logo} alt="logo" className="w-24 rounded-br-xl rounded-tl-xl" />
    </motion.div>
  );
};

const FooterCTAs = () => {
  const { clearToken } = useContext(UserContext);

  return (
    <>
      <div className="absolute bottom-6 left-6 flex gap-4 md:flex-col">
        {SOCIAL_CTAS.map((l, idx) => {
          return (
            <motion.a
              key={idx}
              href={l.href}
              initial={{ opacity: 0, y: -8 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: {
                  delay: 1 + idx * 0.125,
                  duration: 0.5,
                  ease: "easeInOut",
                },
              }}
              exit={{ opacity: 0, y: -8 }}
            >
              <l.Component className="text-xl text-primary transition-colors hover:text-violet-300" />
            </motion.a>
          );
        })}
      </div>
      <motion.button
        onClick={clearToken}
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 1.125,
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
        exit={{ opacity: 0, y: 8 }}
        className="absolute bottom-2 right-20 flex items-center gap-2 rounded-full bg-bg px-3 py-3 text-4xl uppercase text-primary transition-colors hover:bg-secondaryBg hover:text-primary md:bottom-4 md:right-4 md:px-6 md:text-2xl"
      >
        <span className="hidden md:block">Logout</span> <FaPowerOff />
      </motion.button>
      <motion.button
        initial={{ opacity: 0, y: 8 }}
        animate={{
          opacity: 1,
          y: 0,
          transition: {
            delay: 1.125,
            duration: 0.5,
            ease: "easeInOut",
          },
        }}
        exit={{ opacity: 0, y: 8 }}
        className="absolute bottom-2 right-2 flex items-center gap-2 rounded-full bg-bg px-3 py-3 text-4xl uppercase text-primary transition-colors hover:bg-secondaryBg hover:text-primary md:bottom-4 md:right-4 md:px-6 md:text-2xl"
      >
        <Link to="profile">
          <span className="hidden md:block">Profile</span> <IoIosPerson />
        </Link>
      </motion.button>
    </>
  );
};

const SOCIAL_CTAS = [
  {
    Component: SiInstagram,
    href: "https://www.instagram.com/bbigggyy/",
  },
  {
    Component: SiLinkedin,
    href: "https://www.linkedin.com/",
  },
  {
    Component: SiYoutube,
    href: "https://www.youtube.com/@tlbiggy",
  },
];
