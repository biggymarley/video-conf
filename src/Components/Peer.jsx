import { useAVToggle, useVideo } from "@100mslive/react-sdk";
import logo from "../assets/discord.png";
const Peer = ({ peer }) => {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });
  const { isLocalAudioEnabled, isLocalVideoEnabled } = useAVToggle();
  console.log(isLocalAudioEnabled)
  return (
    <div className="peer-container">
      {peer.isLocal ? (
        <video
          ref={videoRef}
          className={'peer-video ${peer.isLocal ? "local" : ""}'}
          autoPlay
          muted
          playsInline
        ></video>
      ) : (
        <div className="w-[250px] h-[250px] border flex justify-center items-center rounded-md border-slate-500">
          <img src={logo} alt="no-cam" />
          
        </div>
      )}

      <div className="peer-name">{peer.name}</div>
    </div>
  );
};
export default Peer;
