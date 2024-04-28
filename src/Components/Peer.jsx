import { useAVToggle, useVideo } from "@100mslive/react-sdk";
import Avatar from "react-nice-avatar";
import { BsMicMuteFill } from "react-icons/bs";
import { useContext, useEffect, useRef, useState } from "react";
import { UserContext } from "../Context/UserContext";

const Peer = ({ peer, rightClicked, setightClicked }) => {
  const { userData } = useContext(UserContext);
  const ref = useRef(null);
  const { isLocalAudioEnabled, isLocalVideoEnabled } = useAVToggle();
  const [userConrols, setuserControls] = useState({
    audio: true,
    video: true,
  });
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });
  useEffect(() => {
    if (ref.current.addEventListener) {
      ref.current.addEventListener(
        "contextmenu",
        function (e) {
          e.preventDefault();
          setightClicked(true);
        },
        false
      );
    } else {
      ref.current.attachEvent("oncontextmenu", function () {
        alert("You've tried to open context menu");
        setightClicked(true);
      });
    }
  }, []);

  return (
    <div className="flex flex-col w-[400px] relative">
      <div className="w-full">
        <div className="w-full h-[75%] sm:h-[250px] rounded-md overflow-hidden flex border">
          {userConrols.video ? (
            <div className="flex w-full h-full relative" ref={ref}>
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

          {rightClicked ? <Menu peer={peer} userData={userData} /> : null}
        </div>
        <div className="text-center font-semibold">{peer.name}</div>
      </div>
    </div>
  );
};

const Menu = ({ peer, userData }) => {
  return (
    <div className="rounded-md bg-bg flex flex-col  w-[70%] absolute h-full rounded right-[40%] bottom-[-40%]">
      <p className="transition hover:bg-secondaryBg p-2 text-bold text-gray-400 border-b-[1px] border-gray-500 m-0">
        Profile
      </p>
      {peer.name === userData.userName ? null : (
        <p className="transition hover:bg-secondaryBg p-2 text-bold text-gray-400 border-b-[1px] border-gray-500">
          Message
        </p>
      )}

      <p className="transition hover:bg-secondaryBg p-2 text-bold text-gray-400 border-b-[1px] border-gray-500">
        <a
          href="https://github.com/biggymarley"
          target="_blank"
          rel="noopener noreferrer"
        >
          My Github
        </a>
      </p>
      <a
        href="https://www.youtube.com/watch?v=VEy6wdTAfBc"
        target="_blank"
        rel="noopener noreferrer"
      >
        <p className="transition hover:bg-secondaryBg p-2 text-bold text-gray-400 border-b-[1px] border-gray-500">
          Tlbiggy
        </p>
      </a>
    </div>
  );
};
export default Peer;
