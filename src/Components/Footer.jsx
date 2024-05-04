import {
  selectIsLocalScreenShared,
  useAVToggle,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { useContext, useEffect, useState } from "react";
import { BsFillMicFill, BsMicMuteFill } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { FaVideo, FaVideoSlash, FaX } from "react-icons/fa6";
import { ImPhoneHangUp } from "react-icons/im";
import { MdScreenShare } from "react-icons/md";
import YouTube from "react-youtube";
import { RoomsContext } from "../Context/UserContext";
import { MdStopScreenShare } from "react-icons/md";
import { MdHeadset } from "react-icons/md";
import { MdHeadsetOff } from "react-icons/md";

const Footer = ({ peer, userData, presenter }) => {
  const hmsActions = useHMSActions();
  const {
    setselectedRoom,
    shareScreen,
    offShareScreen,
    screenshareVideoTrack,
  } = useContext(RoomsContext);
  const [open, setopen] = useState(false);
  const [muted, setmute] = useState(false);
  const { isLocalAudioEnabled, toggleAudio, isLocalVideoEnabled, toggleVideo } =
    useAVToggle();
  const Hangout = () => {
    hmsActions.leave();
    setselectedRoom(null);
  };
  const mute = () => {
    [].slice.call(document.querySelectorAll("audio")).forEach(function (audio) {
      audio.muted = true;
    });
    setmute(true);
  };

  const unmute = () => {
    [].slice.call(document.querySelectorAll("audio")).forEach(function (audio) {
      audio.muted = false;
    });
    setmute(false);
  };
  const amIScreenSharing = useHMSStore(selectIsLocalScreenShared);

  return (
    <div
      className="left-0 flex fixed bottom-0 w-full p-4 justify-center z-10 gap-2 bg-transparent transition"
      id="child"
    >
      <button
        className={`flex justify-center items-center bg-gray-500   w-[50px] h-[50px] rounded-full ${
          !isLocalAudioEnabled && "bg-red-500"
        }`}
        onClick={toggleAudio}
      >
        {isLocalAudioEnabled ? (
          <BsFillMicFill size="25px" />
        ) : (
          <BsMicMuteFill size="25px" />
        )}
      </button>
      {!muted ? (
        <button
          className="flex justify-center items-center bg-gray-500   w-[50px] h-[50px] rounded-full "
          onClick={mute}
        >
          <MdHeadset size="60%" />
        </button>
      ) : (
        <button
          className="flex justify-center items-center bg-red-500   w-[50px] h-[50px] rounded-full "
          onClick={unmute}
        >
          <MdHeadsetOff size="60%" />
        </button>
      )}

      <button
        className={`flex justify-center items-center bg-gray-500   w-[50px] h-[50px] rounded-full ${
          !isLocalVideoEnabled && "bg-red-500"
        }`}
        onClick={toggleVideo}
      >
        {isLocalVideoEnabled ? (
          <FaVideo size="60%" />
        ) : (
          <FaVideoSlash size="60%" />
        )}
      </button>
      {screenshareVideoTrack && amIScreenSharing ? (
        <button
          className="flex justify-center items-center bg-red-500   w-[50px] h-[50px] rounded-full "
          onClick={offShareScreen}
        >
          <MdStopScreenShare size="60%" />
        </button>
      ) : (
        <button
          className="flex justify-center items-center bg-gray-500   w-[50px] h-[50px] rounded-full "
          onClick={shareScreen}
        >
          <MdScreenShare size="60%" />
        </button>
      )}

      {/* <button
        className="flex justify-center items-center bg-gray-500   w-[50px] h-[50px] rounded-full "
        onClick={() => setopen(true)}
      >
        <FaYoutube size="30px" color={"red"} />
      </button> */}
      <button
        className="flex justify-center items-center bg-red-500   w-[50px] h-[50px] rounded-full "
        onClick={Hangout}
      >
        <ImPhoneHangUp size="60%" />
      </button>
      {open ? <Ads setopen={setopen} /> : null}
    </div>
  );
};

const Ads = ({ setopen }) => {
  return (
    <div className="w-screen bg-bg/40 backdrop-blur-xl fixed h-auto top-0 bottom-0 flex justify-center items-center">
      <div className="w-screen flex justify-center items-center">
        <button
          className="flex justify-center items-center bg-gray-500 w-[50px] h-[50px] rounded-full absolute top-5 right-5"
          onClick={() => setopen(false)}
        >
          <FaX size="20px" color={"white"} />
        </button>
        <YouTube
          videoId={"VEy6wdTAfBc"} // defaults -> ''
          id={"VEy6wdTAfBc"} // defaults -> ''
          className={"z-10 max-w-screen-lg w-full"} // defaults -> ''
          iframeClassName={"max-w-screen-lg w-full h-[500px]"} // defaults -> ''
          // style={object} // defaults -> {}
          // title={string} // defaults -> ''
          // loading={string} // defaults -> undefined
          // opts={obj} // defaults -> {}
          // onReady={func} // defaults -> noop
          // onPlay={func} // defaults -> noop
          // onPause={func} // defaults -> noop
          // onEnd={func} // defaults -> noop
          // onError={func} // defaults -> noop
          // onStateChange={func} // defaults -> noop
          // onPlaybackRateChange={func} // defaults -> noop
          // onPlaybackQualityChange={func} // defaults -> noop
        />
      </div>
    </div>
  );
};
export default Footer;
