import React, { useContext, useEffect, useRef, useState } from "react";
import { BsYoutube } from "react-icons/bs";
import YouTube from "react-youtube";
import { FrameContext } from "../Context/UserContext";

const YOUTUBE_API_KEY = "AIzaSyAxqf220SM4lPTRxtQMQLRCJHRspR_p-Gw";
const opts = {
  height: "100%",
  width: "100%",
  playerVars: {
    playsinline: 1,
    autoplay: 1,
    controls: 1,
    modestbranding: 0,
    rel: 0,
    mute: 0,
    autohide: 1,
  },
};
function YoutubeMusic() {
  const [video, setVideo] = useState(null);
  const [mute, setMute] = useState(true);
  const { messages } = useContext(FrameContext);
  const search = async (query) => {
    try {
      console.log("sss");
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?q=${query}&part=snippet&type=video&key=${YOUTUBE_API_KEY}`
      );
      console.log("sss");
      const data = await response.json();
      setVideo(data?.items?.[0]);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(messages?.[messages.length - 1]?.messageType === "BOT");
    if (messages?.length > 0 && messages?.[messages?.length - 1]?.messageType === "BOT")
      search(messages?.[messages.length - 1]?.content);
  }, [messages]);

  const ref = useRef();
  const activateVol = () => {
    if (ref?.current?.internalPlayer) {
      ref?.current?.internalPlayer.unMute();
      setMute(false);
    }
  };

  useEffect(() => {
    // search("Style Amro Piti Improvisation (Official Music Video)");
  }, []);

  if (!video)
    return (
      <div className="w-full h-full flex justify-center items-center relative bg-red-700  rounded-md">
        <div className="bg-white absolute  w-8 h-8 z-[1]" />
        <BsYoutube size={80} color="red" className="z-[2]" />
        <p className="font-sans text-xs absolute bottom-5 left-5 bg-bg/25 p-2 rounded-md ">
          Youtube Bot
        </p>
      </div>
    );

  return (
    <div className="w-full h-[500px] max-h-[500px] relative">
      <div className="w-full h-full flex items-center oveflow-hidden ">
        <YouTube
          videoId={video.id.videoId}
          className={"w-full h-full z-[2]"}
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            opacity: 1,
          }}
          ref={ref}
          opts={opts}
          onReady={activateVol}
        />
        <div className="absolute w-full h-full bg-black z-[2] top-[-38px]" />
        <img
          src={video.snippet.thumbnails.high.url}
          alt="music"
          className=" w-full h-full absolute shadow-xl z-[2] top-[-38px] blur-[2px] object-cover"
        />
        <div className="flex-col flex gap-2 absolute shadow-xl z-[2] drop-shadow-xl backdrop-blur-sm w-full h-full top-[-38px] justify-center items-center bg-black/40">
          <p className="font-sans font-bold text-sm text-primary  ">
            {video.snippet.title}
          </p>
          <p className="font-sans font-bold text-sm text-red-700">
            {video.snippet.channelTitle}
          </p>
        </div>
      </div>
    </div>
  );
}

export default YoutubeMusic;
