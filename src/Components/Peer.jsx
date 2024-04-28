import { useAVToggle, useVideo } from "@100mslive/react-sdk";
import Avatar  from "react-nice-avatar";

const Peer = ({ peer }) => {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });
  const { isLocalAudioEnabled, isLocalVideoEnabled } = useAVToggle();
  return (
    <div className="flex flex-col w-[400px]">
      <div className="w-full">
        <div className="w-full h-[75%] sm:h-[250px] rounded-md overflow-hidden flex">
          {isLocalVideoEnabled ? (
            <video
              ref={videoRef}
              className={"peer-video"}
              autoPlay
              muted
              playsInline
            ></video>
          ) : (
            <div className="w-full h-full border flex justify-center items-center rounded-md border-slate-500 mb-[10px] bg-gray-500">
              <Avatar className="w-32 h-32"  />
            </div>
          )}
        </div>
        <div className="text-center font-semibold">{peer.name}</div>
      </div>
    </div>
  );
};
export default Peer;
