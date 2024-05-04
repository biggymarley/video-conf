import { useAVToggle, useVideo } from "@100mslive/react-sdk";
import Avatar from "react-nice-avatar";
import { BsMicMuteFill } from "react-icons/bs";
import { useContext, useEffect, useRef, useState } from "react";
import {
  FrameContext,
  RoomsContext,
  UserContext,
} from "../Context/UserContext";
import StreamVideo from "./StreamVideo";
import Video from "./Video";
import Footer from "./Footer";
import RightClickMenu from "./RightClickMenu";

const Peer = ({ peer, setightClicked, open }) => {
  const { userData, usersData } = useContext(UserContext);
  const { screenshareVideoTrack, presenters } = useContext(RoomsContext);
  const ref = useRef(null);
  const { isLocalAudioEnabled, isLocalVideoEnabled } = useAVToggle();
  const [userConrols, setuserControls] = useState({
    audio: true,
    video: true,
  });
  const { handleClick, anchorEl } = useContext(FrameContext);
  useEffect(() => {
    if (ref.current.addEventListener) {
      ref.current.addEventListener(
        "contextmenu",
        function (e) {
          e.preventDefault();
          handleClick(e);
          setightClicked(peer.name);
        },
        false
      );
    } else {
      ref.current.attachEvent("oncontextmenu", function () {
        alert("You've tried to open context menu");
        setightClicked(peer.name);
      });
    }
  }, [peer]);
  return (
    <>
      {presenters.map((presenter, index) => (
        <>
          <StreamVideo
            key={index}
            screenshareVideoTrack={screenshareVideoTrack}
            presenter={presenters}
            peer={peer}
          />
        </>
      ))}

      <Footer peer={peer} userData={userData} />
      <div className="flex flex-col h-[250px]  sm:h-[500px] w-auto relative ">
        <div className="w-full h-full">
          <div className="w-full h-full  rounded-xl overflow-visible flex  flex-col relative">
            {userConrols.video ? (
              <div
                className={`flex w-full h-full relative rounded-xl`}
                ref={ref}
              >
                <Video
                  peer={peer}
                  setightClicked={handleClick}
                  handleClick={handleClick}
                  anchorEl={anchorEl}
                  open={open}
                />
                {!isLocalAudioEnabled && peer.name === userData.userName ? (
                  <span className="absolute z-10 text-gray-400 bottom-5 right-2 bg-secondaryBg p-2 rounded-full">
                    <BsMicMuteFill size={22} />
                  </span>
                ) : null}
              </div>
            ) : (
              <div className="w-full h-full border flex justify-center items-center rounded-xl border-slate-800 mb-[10px] bg-gray-500">
                <Avatar className="w-32 h-32" />
              </div>
            )}

            {/* {rightClicked ? <Menu peer={peer} userData={userData} /> : null} */}
            <div className="z-[4] text-center text-sm font-sans font-light absolute bottom-4 left-4 bg-bg/50 p-1 px-2 rounded-md">
              {peer.name}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Peer;
