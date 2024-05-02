import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import logo from "../assets/chillGray.png";
import { InnerJoinRooms } from "./InnerJoinRooms";
import JoinForm from "./JoinForm";
import { NavBarMobile } from "./NavBarMobile";
import { Link } from "react-router-dom";
import { UserContext } from "../Context/UserContext";
import { FaPowerOff } from "react-icons/fa";
import { BsFilePerson } from "react-icons/bs";
import { RiUserSettingsFill } from "react-icons/ri";
const JoinRooms = () => {
  const [active, setActive] = useState(false);

  return (
    <div className="min-h-screen h-full w-full flex relative flex-col sm:flex-row">
      <SideBarWeb />
      <HamburgerButton active={active} setActive={setActive} />
      <NavBarMobile active={active} setActive={setActive} />
      <div className="flex flex-col w-full h-full min-h-screen md:ml-[80px] items-center justify-end">
        <InnerJoinRooms />
      </div>
    </div>
  );
};

const SideBarWeb = () => {
  const { clearToken } = useContext(UserContext);
  const { userData } = useContext(UserContext);

  return (
    <div className="p-2 sm:p-0 w-[80px] md:flex hidden flex-row sm:flex-col justify-center items-center sm:h-screen   bg-secondaryBg static sm:fixed ">
      <div className="flex-grow relative">
        <div>
          <button
            onClick={() => clearToken()}
            className="z-[99] bg-red-500 flex justify-center items-center  p-4 w-full font-sans font-bold absolute bottom-0"
          >
            <FaPowerOff size={25} />
          </button>
        </div>
        <div>
          <Link
            to={"profile"}
            className="z-[99] flex justify-center items-center bg-bg hover:bg-gray-800 text-primary  p-4 w-full font-sans font-bold absolute bottom-14 left-0"
          >
            <BsFilePerson size={30} />
          </Link>
        </div>
        {userData?.roles.filter((role) => role.id === "admin").length > 0 ? (
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
              <img
                src={logo}
                alt="logo"
                className="w-[50px] rounded-full"
              />
            </div>
          </div>
          <JoinForm />
        </div>
      </div>
    </div>
  );
};
const HamburgerButton = ({ active, setActive }) => {
  return (
    <>
      <motion.div
        initial={false}
        animate={active ? "open" : "closed"}
        variants={UNDERLAY_VARIANTS}
        style={{ top: 16, right: 16 }}
        className="block md:hidden fixed z-10 rounded-xl bg-gradient-to-br from-secondaryBg to-bg shadow-lg shadow-violet-800/20 w-[30px]"
      />

      <motion.button
        initial={false}
        animate={active ? "open" : "closed"}
        onClick={() => setActive((pv) => !pv)}
        className={`block md:hidden group fixed right-4 top-4 z-50 h-[50px] w-[50px] bg-white/0 transition-all hover:bg-white/20 ${
          active ? "rounded-bl-xl rounded-tr-xl" : "rounded-xl"
        }`}
      >
        <motion.span
          variants={HAMBURGER_VARIANTS.top}
          className="absolute block h-1 w-6 bg-white"
          style={{ y: "-50%", left: "50%", x: "-50%" }}
        />
        <motion.span
          variants={HAMBURGER_VARIANTS.middle}
          className="absolute block h-1 w-6 bg-white"
          style={{ left: "50%", x: "-50%", top: "50%", y: "-50%" }}
        />
        <motion.span
          variants={HAMBURGER_VARIANTS.bottom}
          className="absolute block h-1 w-1 bg-white"
          style={{ x: "-50%", y: "50%" }}
        />
      </motion.button>
    </>
  );
};

const UNDERLAY_VARIANTS = {
  open: {
    width: "calc(100% - 32px)",
    height: "calc(100vh - 32px)",
    transition: { type: "spring", mass: 3, stiffness: 400, damping: 50 },
  },
  closed: {
    width: "50px",
    height: "50px",
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
export default JoinRooms;
