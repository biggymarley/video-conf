import Slider from "@mui/material/Slider";
import Stack from "@mui/material/Stack";
import React, { useContext, useEffect, useRef, useState } from "react";
import { BsVolumeDown, BsVolumeUp, BsYoutube } from "react-icons/bs";
import YouTube from "react-youtube";
import { toast } from "sonner";
import { FrameContext } from "../Context/UserContext";
const YOUTUBE_API_KEYS = [
  "AIzaSyAxqf220SM4lPTRxtQMQLRCJHRspR_p-Gw",
  "AIzaSyB8NT4ijQ7vYpekCdfOPCRs4ZIlOp32QLM",
  "API_KEY_3",
];
let currentApiKeyIndex = 0;

const opts = {
  height: "100%",
  width: "100%",
  playerVars: {
    playsinline: 1,
    autoplay: 1,
    controls: 0,
    modestbranding: 0,
    rel: 0,
    mute: 0,
    autohide: 1,
  },
};
function YoutubeMusic() {
  const [video, setVideo] = useState(null);
  const ref = useRef();
  const refRight = useRef();
  const [mute, setMute] = useState(true);
  const { messages } = useContext(FrameContext);
  const [volume, setVolume] = useState(100);

  const handleChange = (event, newValue) => {
    setVolume(newValue);
    HandleVolume(newValue);
  };
  const search = async (query) => {
    try {
      console.log("sss");
      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/search?q=${query}&part=snippet&type=video&key=${YOUTUBE_API_KEYS[currentApiKeyIndex]}`
      );
      if (response.status === 200) {
        const data = await response.json();
        setVideo(data?.items?.[0]);
      } else {
        switchToNextApiKey();
        toast.error(
          "The request cannot be completed because the server have exceeded its daily Quota. Please try again tomorrow."
        );
      }
    } catch (error) {
      switchToNextApiKey();
      toast.error(
        "The request cannot be completed because the server have exceeded its daily Quota. Please try again tomorrow."
      );
    }
  };
  const switchToNextApiKey = () => {
    currentApiKeyIndex = (currentApiKeyIndex + 1) % YOUTUBE_API_KEYS.length;
    toast.info("Refilling Quota, please Try again!");
  };

  useEffect(() => {
    console.log(messages?.[messages.length - 1]?.messageType === "BOT");
    if (
      messages?.length > 0 &&
      messages?.[messages?.length - 1]?.messageType === "BOT"
    )
      search(messages?.[messages.length - 1]?.content);
  }, [messages]);

  const HandleVolume = (volume) => {
    if (ref?.current?.internalPlayer) {
      console.log(volume);
      ref?.current?.internalPlayer.setVolume(volume);
    }
  };

  const activateVol = () => {
    if (ref?.current?.internalPlayer) {
      ref?.current?.internalPlayer.unMute();
      setMute(false);
    }
  };

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
    <>
      <div className="w-full h-full relative " ref={refRight}>
        <div className="w-full h-full flex items-center oveflow-hidden  ">
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
          <div className="absolute w-full h-full bg-black z-[2] top-[-50px]" />
          <div className="absolute w-full h-[50px] bg-black z-[2] bottom-[0]" />
          <div className="absolute w-full h-[50px] bg-black z-[2] bottom-[0]">
            <Stack
              spacing={2}
              direction="row"
              sx={{ mb: 1 }}
              alignItems="center"
            >
              <BsVolumeDown size={25} color="#E5BE00" />
              <Slider
                aria-label="Volume"
                value={volume}
                defaultValue={100}
                onChange={(event, newValue) => handleChange(event, newValue)}
                sx={{
                  color: "#E5BE00",
                  "& .MuiSlider-track": {
                    border: "none",
                  },
                  "& .MuiSlider-thumb": {
                    width: 12,
                    height: 12,
                    backgroundColor: "#E5BE00",
                    transition: "all 0.2s ease-in-out",
                    "&::before": {
                      boxShadow: "0 4px 8px rgba(0,0,0,0.4)",
                    },
                    "&:hover, &.Mui-focusVisible, &.Mui-active": {
                      boxShadow: "none",
                      width: 24,
                      height: 24,
                    },
                  },
                }}
              />
              <BsVolumeUp size={25} color="#E5BE00" />
            </Stack>
          </div>
          <img
            src={video.snippet.thumbnails.high.url}
            alt="music"
            className=" w-full h-full absolute  z-[2] top-[-50px] blur-[2px] object-cover"
          />
          <div className="flex-col flex gap-2 absolute  z-[2] drop- backdrop-blur-sm w-full h-full top-[-50px] justify-center items-center bg-black/40">
            <p className="font-sans font-bold text-sm text-primary  ">
              {video.snippet.title}
            </p>
            <p className="font-sans font-bold text-sm text-red-700">
              {video.snippet.channelTitle}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default YoutubeMusic;
