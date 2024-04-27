import { useAVToggle } from "@100mslive/react-sdk";
import { BsMicMuteFill } from "react-icons/bs";
import { BsFillMicFill } from "react-icons/bs";
import { FaVideo } from "react-icons/fa6";
import { FaVideoSlash } from "react-icons/fa6";

const Footer = () => {
  const { isLocalAudioEnabled, toggleAudio, isLocalVideoEnabled, toggleVideo } =
    useAVToggle();
  return (
    <div className="control-bar ">
      <button className="btn-control flex justify-center items-center" onClick={toggleAudio}>
        {isLocalAudioEnabled ?  <BsFillMicFill size="25px"/> : <BsMicMuteFill size="25px"/>}
      </button>
      <button className="btn-control flex justify-center items-center" onClick={toggleVideo}>
        {isLocalVideoEnabled ? <FaVideo size="25px"/> : <FaVideoSlash size="25px"/>}
      </button>
    </div>
  );
};
export default Footer;
