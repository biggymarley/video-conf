import { useHMSActions } from "@100mslive/react-sdk";
import { useContext, useState } from "react";
import { RoomsContext, UserContext } from "../Context/UserContext";
import logo from "../assets/discord.png";
import { LoadingContext } from "../Context/LoadingContext";
import { AiOutlineCheckCircle, AiOutlineCloseCircle } from "react-icons/ai";

const JoinForm = () => {
  const hmsActions = useHMSActions();
  const { rooms, getRoomCodes, setselectedRoom } = useContext(RoomsContext);
  const { userData, clearToken } = useContext(UserContext);
  const { setAppLoading } = useContext(LoadingContext);

  const goLive = async (id, index) => {
    try {
      setAppLoading(true);
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
    <div className="min-h-screen h-full w-full flex relative flex-col sm:flex-row">
      <div className="p-2 sm:p-0 flex flex-row sm:flex-col justify-center items-center sm:h-screen   bg-secondaryBg static sm:fixed ">
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
            className="bg-red-500  p-4 w-full font-bold"
          >
            Log out
          </button>
        </div>
      </div>
      <div className="flex flex-col w-full h-full min-h-screen sm:ml-[50px]">
        <div className="flex flex-wrap gap-2 sm:ml-4 p-8 sm:p-12 w-full  pb-8 justify-start">
          {rooms?.data?.map((room, index) => (
            <div
              key={index}
              onClick={() => goLive(room.id, index)}
              className=" w-full sm:w-[140px] h-[140px] bg-secondaryBg rounded p-4 transition transform scale-100 hover:scale-[1.02] shadow-lg shadow-gray-800	cursor-pointer"
            >
              <p>{room.name}</p>
              <div className="flex gap-1">
                status:{" "}
                {room.enabled === true ? (
                  <AiOutlineCheckCircle size={20} color="green" />
                ) : (
                  <AiOutlineCloseCircle size={20} color="red" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default JoinForm;
