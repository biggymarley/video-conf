import { useAVToggle, useHMSActions } from "@100mslive/react-sdk";
import { useContext, useEffect, useState } from "react";
import { BsFillMicFill, BsMicMuteFill } from "react-icons/bs";
import { FaYoutube } from "react-icons/fa";
import { FaVideo, FaVideoSlash, FaX } from "react-icons/fa6";
import { ImPhoneHangUp } from "react-icons/im";
import { MdScreenShare } from "react-icons/md";
import YouTube from "react-youtube";
import { RoomsContext } from "../Context/UserContext";

const Footer = () => {
  const hmsActions = useHMSActions();
  const { setselectedRoom, shareScreen } = useContext(RoomsContext);
  const [open, setopen] = useState(false);
  const { isLocalAudioEnabled, toggleAudio, isLocalVideoEnabled, toggleVideo } =
    useAVToggle();
  const Hangout = () => {
    hmsActions.leave();
    setselectedRoom(null);
  };
  // useEffect(() => {
  //    toggleAudio();
  //   toggleVideo();
  // }, []);

  return (
    <div className="flex fixed bottom-0 w-full p-4 justify-center z-10 gap-2 bg-secondaryBg">
      <button
        className="btn-control flex justify-center items-center"
        onClick={toggleAudio}
      >
        {isLocalAudioEnabled ? (
          <BsFillMicFill size="25px" />
        ) : (
          <BsMicMuteFill size="25px" />
        )}
      </button>
      <button
        className="btn-control flex justify-center items-center"
        onClick={toggleVideo}
      >
        {isLocalVideoEnabled ? (
          <FaVideo size="25px" />
        ) : (
          <FaVideoSlash size="25px" />
        )}
      </button>
      <button
        className="flex justify-center items-center bg-gray-500 w-[64px] h-[64px] rounded-full "
        onClick={shareScreen}
      >
        <MdScreenShare size="30px"  />
      </button>
      <button
        className="flex justify-center items-center bg-gray-500 w-[64px] h-[64px] rounded-full "
        onClick={() => setopen(true)}
      >
        <FaYoutube size="30px" color={"red"} />
      </button>
      <button
        className="flex justify-center items-center bg-red-500 w-[64px] h-[64px] rounded-full "
        onClick={Hangout}
      >
        <ImPhoneHangUp size="25px" />
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
