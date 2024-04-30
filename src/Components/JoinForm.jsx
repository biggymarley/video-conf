import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { useContext } from "react";
import chill from "../assets/chill.jpg";
import wglogo from "../assets/Wagner-Group-Logo.png";
import { LoadingContext } from "../Context/LoadingContext";
import { RoomsContext, UserContext } from "../Context/UserContext";
const JoinForm = () => {
  const hmsActions = useHMSActions();
  const { rooms, getRoomCodes, setselectedRoom } = useContext(RoomsContext);
  const { userData, clearToken } = useContext(UserContext);
  const { setAppLoading } = useContext(LoadingContext);
  const isConnected = useHMSStore(selectIsConnectedToRoom);

  const goLive = async (id, index) => {
    try {
      setAppLoading(true);
      if (isConnected) {
        hmsActions.leave();
      }
      const code = await getRoomCodes(id);
      const authToken = await hmsActions.getAuthTokenByRoomCode({
        roomCode: code.viwer,
      });
      await hmsActions.join({ userName: userData.userName, authToken });
      setselectedRoom(index);
      setAppLoading(false);
    } catch (e) {
      console.error(e);
      setAppLoading(false);
      setselectedRoom(null);
    }
  };
  return (
    <div className="h-full w-full flex relative flex-col ">
      {/* <div className="p-2 sm:p-0 flex flex-row sm:flex-col justify-center items-center sm:h-screen   bg-secondaryBg static sm:fixed ">
        <div className="flex-grow">
          <div className=" rounded-full bg-slate-600 flex w-[50px] h-[50px] justify-center items-center sm:mt-4">
            <img
              src={logo}
              alt="logo"
              className="w-[35px] filter  invert brightness-0"
            />
          </div>
        </div>
        <div>
          <button
            onClick={() => clearToken()}
            className="bg-red-500  p-4 w-full font-sans font-bold"
          >
            Log out
          </button>
        </div>
      </div> */}
      <div className="flex flex-col  h-full mt-6 justify-start items-center ">
        <div className="flex flex-wrap gap-4 w-full justify-center items-center">
          {rooms?.data?.map((room, index) => (
            <div
              key={index}
              onClick={() => goLive(room.id, index)}
              className=" w-[50px]  h-auto   transition transform scale-100 hover:scale-[1.02] 	cursor-pointer"
            >
              <div className="w-[50px] ">
                <img
                  src={room.template === "WAGNERS-room" ? wglogo : chill}
                  alt="roomlogo"
                  className="w-full rounded-full"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <button
            onClick={() => clearToken()}
            className="bg-red-500   w-[90px] font-sans font-bold fixed p-4 right-0 left-0 bottom-0 z-[99]"
          >
            Log out
          </button> */}
    </div>
  );
};
export default JoinForm;
