import { useAVToggle, useVideo } from "@100mslive/react-sdk";
import logo from "../assets/discord.png";
const Peer = ({ peer }) => {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });
  const { isLocalAudioEnabled, isLocalVideoEnabled } = useAVToggle();
  console.log(isLocalAudioEnabled);
  return (
    <div className="flex flex-col">
      <div className="w-[400px]">
        <div className="h-[250px] rounded-md overflow-hidden flex">
          {isLocalVideoEnabled ? (
            <video
              ref={videoRef}
              className={'peer-video' }
              autoPlay
              muted
              playsInline
            ></video>
          ) : (
            <div className="w-full h-[full] border flex justify-center items-center rounded-md border-slate-500 mb-[10px] bg-gray-500">
              <img src={logo} alt="no-cam" className="filter  invert brightness-0" />
            </div>
          )}
        </div>
        <div className="text-center font-semibold">{peer.name}</div>
      </div>
    </div>
  );
};
export default Peer;
