import { useAVToggle, useHMSActions } from "@100mslive/react-sdk";
import { useContext } from "react";
import { BsMicMuteFill } from "react-icons/bs";
import { BsFillMicFill } from "react-icons/bs";
import { FaVideo } from "react-icons/fa6";
import { FaVideoSlash } from "react-icons/fa6";
import { ImPhoneHangUp } from "react-icons/im";
import { RoomsContext } from "../Context/UserContext";

const Footer = () => {
  const hmsActions = useHMSActions();
  const { setselectedRoom } = useContext(RoomsContext);
  const { isLocalAudioEnabled, toggleAudio, isLocalVideoEnabled, toggleVideo } =
    useAVToggle();
  const Hangout = () => {
    hmsActions.leave();
    setselectedRoom(null);
  };
  return (
    <div className="control-bar">
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
        className="flex justify-center items-center bg-red-500 w-[64px] h-[64px] rounded-full "
        onClick={Hangout}
      >
        <ImPhoneHangUp size="25px" />
      </button>
    </div>
  );
};
export default Footer;
