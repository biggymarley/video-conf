import { useAVToggle, useVideo } from "@100mslive/react-sdk";
import Avatar from "react-nice-avatar";
import { BsMicMuteFill } from "react-icons/bs";
import { useContext, useState } from "react";
import { UserContext } from "../Context/UserContext";

const Peer = ({ peer }) => {
  const { userData } = useContext(UserContext);
  const { isLocalAudioEnabled, isLocalVideoEnabled } = useAVToggle();
  const [userConrols, setuserControls] = useState({
    audio: true,
    video: true,
  });
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });
  console.log(peer, userData);
  return (
    <div className="flex flex-col w-[400px]">
      <div className="w-full">
        <div className="w-full h-[75%] sm:h-[250px] rounded-md overflow-hidden flex border">
          {userConrols.video ? (
            <div className="flex w-full h-full relative">
              <video
                ref={videoRef}
                className={"peer-video"}
                autoPlay
                muted
                playsInline
              ></video>
              {!isLocalAudioEnabled && peer.name === userData.userName ? (
                <span className="absolute z-10 text-gray-300 bottom-5 right-2 bg-secondaryBg p-2 rounded-full">
                  <BsMicMuteFill size={22} />
                </span>
              ) : null}
            </div>
          ) : (
            <div className="w-full h-full border flex justify-center items-center rounded-md border-slate-500 mb-[10px] bg-gray-500">
              <Avatar className="w-32 h-32" />
            </div>
          )}
        </div>
        <div className="text-center font-semibold">{peer.name}</div>
      </div>
    </div>
  );
};
export default Peer;
