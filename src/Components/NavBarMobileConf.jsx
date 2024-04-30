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
import { Link } from "react-router-dom";
import chill from "../assets/chill.jpg";
import logo from "../assets/discord.png";
import wglogo from "../assets/Wagner-Group-Logo.png";
import { LoadingContext } from "../Context/LoadingContext";
import { RoomsContext, UserContext } from "../Context/UserContext";

export const NavBarMobileConf = ({ active, setActive }) => {
  return (
    <>
      <AnimatePresence>{active && <LinksOverlay />}</AnimatePresence>
    </>
  );
};

const LinksOverlay = () => {
  return (
    <nav className="fixed right-4 top-4 z-40 h-[calc(100vh_-_120px)] w-[calc(100%_-_32px)] overflow-hidden">
      <Logo />
      <LinksContainer />
      <FooterCTAs />
    </nav>
  );
};

const LinksContainer = () => {
  const hmsActions = useHMSActions();
  const { rooms, getRoomCodes, setselectedRoom } = useContext(RoomsContext);
  const { userData, clearToken } = useContext(UserContext);
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
    <motion.div className="p-8">
      <div className="flex flex-col  h-full mt-6 justify-start items-center ">
        <div className="flex flex-col gap-4 w-full justify-center items-center ">
          {rooms?.data?.map((room, index) => (
            <NavLink key={index} href={() => goLive(room.id, index)}>
              <div className="w-[50px] ">
                <img
                  src={room.template === "WAGNERS-room" ? wglogo : chill}
                  alt="roomlogo"
                  className="w-full rounded-full"
                />
              </div>
              <p className="font-sans font-bold lg:text-xl  text-md">
                {room.template}
              </p>
            </NavLink>
          ))}
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
      className=" flex items-center gap-4 rounded  shadow-bg shadow-md w-full p-4 h-auto  bg-bg/50 backdrop-blur-xl	 transform scale-100 hover:scale-[1.02] 	cursor-pointer text-violet-400 transition-colors hover:text-violet-50 lg:text-7xl"
    >
      {children}
    </motion.div>
  );
};

const Logo = () => {
  // Temp logo from https://logoipsum.com/
  return (
    <motion.a
      initial={{ opacity: 0, y: -12 }}
      animate={{
        opacity: 1,
        y: 0,
        transition: { delay: 0.5, duration: 0.5, ease: "easeInOut" },
      }}
      exit={{ opacity: 0, y: -12 }}
      href="#"
      className="grid h-20 w-20 place-content-center rounded-br-xl rounded-tl-xl bg-bg transition-colors hover:bg-violet-50"
    >
      <img
        src={logo}
        alt="logo"
        className="w-12 invert brightness-0 hover:invert-0 hover:brightness-1 transition-all"
      />
    </motion.a>
  );
};

const FooterCTAs = () => {
  const { clearToken } = useContext(UserContext);

  return (
    <>
      <div className="absolute bottom-6 left-6 flex gap-4 lg:flex-col">
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
              <l.Component className="text-xl text-white transition-colors hover:text-violet-300" />
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
        className="absolute bottom-2 right-20 flex items-center gap-2 rounded-full bg-bg px-3 py-3 text-4xl uppercase text-violet-200 transition-colors hover:bg-white hover:text-red-500 lg:bottom-4 lg:right-4 lg:px-6 lg:text-2xl"
      >
        <FaPowerOff />
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
        className="absolute bottom-2 right-2 flex items-center gap-2 rounded-full bg-bg px-3 py-3 text-4xl uppercase text-violet-200 transition-colors hover:bg-white hover:text-primary lg:bottom-4 lg:right-4 lg:px-6 lg:text-2xl"
      >
        <Link to="profile">
          <IoIosPerson />
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
