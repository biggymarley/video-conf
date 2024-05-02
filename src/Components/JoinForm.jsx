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
import { toast } from "sonner";
const JoinForm = () => {
  const hmsActions = useHMSActions();
  const { rooms, getRoomCodes, setselectedRoom } = useContext(RoomsContext);
  const { userData, getUser, getUsers } = useContext(UserContext);
  const { setAppLoading } = useContext(LoadingContext);
  const isConnected = useHMSStore(selectIsConnectedToRoom);

  const goLive = async (id, index) => {
    if (
      userData.roles.filter((role) => role.id === id).length > 0 ||
      userData.roles.filter((role) => role.id === "admin").length > 0
    ) {
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
        await getUser();
        await getUsers();
        setselectedRoom(index);
        setAppLoading(false);
      } catch (e) {
        console.error(e);
        setAppLoading(false);
        setselectedRoom(null);
      }
    } else {
      toast.warning(
        "You dont have permission to this room, please contact BIGGY!"
      );
      return;
    }
  };
  return (
    <div className="h-full w-full flex relative flex-col ">

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
      
    </div>
  );
};
export default JoinForm;
