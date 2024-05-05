import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
} from "framer-motion";
import React, { useEffect } from "react";
import { FaGithub } from "react-icons/fa";
import { IoLogoFirebase } from "react-icons/io5";
import { SiReact } from "react-icons/si";
import logo100ms from "../assets/100ms.png";
import Globe from "./Globe";

const COLORS_TOP = ["#FF1654", "#F17300", "#FFD819", "#F24333", "#F24333"];

export const InnerJoinRooms = ({}) => {
  const color = useMotionValue(COLORS_TOP[0]);
  useEffect(() => {
    animate(color, COLORS_TOP, {
      ease: "easeInOut",
      duration: 10,
      repeat: Infinity,
      repeatType: "mirror",
    });
  }, []);

  const backgroundImage = useMotionTemplate`radial-gradient(125% 125% at 50% 0%, rgb(19 255 170 / 0%) 50%, ${color})`;

  return (
    <motion.section
      style={{
        backgroundImage,
      }}
      className="relative grid  h-screen w-full place-content-center overflow-hidden  text-gray-200"
      >
        <div className="absolute bottom-[-50%] opacity-50 md:right-[-55px]">
      <Globe />
        </div>
      <div className="relative  flex flex-col items-center">
        <span className="mb-1.5 inline-block rounded-full bg-gray-600/50 px-3 py-1.5 text-sm">
          Beta Now Live!
        </span>
        <h1 className="max-w-3xl bg-gradient-to-br from-white to-gray-400 bg-clip-text text-center text-3xl font-sans font-medium leading-tight text-transparent sm:text-5xl sm:leading-tight md:text-7xl md:leading-tight">
          Connect, Chat, Play Where Communities Thrive Together.
        </h1>
        <p className="my-6 max-w-xl text-center text-base leading-relaxed md:text-lg md:leading-relaxed">
          Kindly report any encountered bugs to{" "}
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.linkedin.com/in/afaragi/"
            className="text-blue-300 underline"
          >
            Biggy
          </a>{" "}
          via screenshots.
        </p>
      </div>
      <div className="flex flex-col items-center absolute bottom-0 left-0 right-0">
        <p className="flex gap-1 font-sans font-medium text-sm text-black items-center">
          Created using React <SiReact />
          ,Firebase <IoLogoFirebase />
          and 100ms <img src={logo100ms} className="w-[14px] h-full filter" />.
        </p>
        <p className="flex gap-1 items-center font-sans font-medium text-sm text-black ">
          <FaGithub />
          My Github:{" "}
          <a
            href="https://github.com/biggymarley"
            target="_blank"
            rel="noopener noreferrer"
          >
            biggymarley
          </a>
        </p>
      </div>
    </motion.section>
  );
};
