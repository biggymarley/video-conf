import { selectPeers, useHMSStore } from "@100mslive/react-sdk";
import Peer from "./Peer";
import logo from '../assets/discord.png'
const Conference = () => {
  const peers = useHMSStore(selectPeers);
  return (
    <div className="flex  h-screen">
      <div className="h-full p-4 bg-gray-800">
      <div className="rounded-full bg-slate-600 flex w-[50px] h-[50px] justify-center items-center">
        <img src={logo} alt="logo" className="w-[35px] filter  invert brightness-0"/>
      </div>
      </div>
      <div className="w-full bg-gray-700 p-8">
        {peers.map((peer) => (
          <Peer key={peer.id} peer={peer}></Peer>
        ))}
      </div>
    </div>
  );
};
export default Conference;
