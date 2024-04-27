import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { useEffect } from "react";
import Conference from "./Conference";
import Footer from "./Footer";
import JoinForm from "./JoinForm";
import useRoomsHook from "../hooks/useRoomsHook";
import { RoomsContext } from "../Context/UserContext";

function LoggedUser() {
  const { rooms, getRoomCodes, roomCodes } = useRoomsHook();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  return (
    <RoomsContext.Provider value={{ rooms, getRoomCodes, roomCodes }}>
      <div className="App bg-bg">
        {isConnected ? (
          <>
            <Conference />
            <Footer />
          </>
        ) : (
          <JoinForm />
        )}
      </div>
    </RoomsContext.Provider>
  );
}

export default LoggedUser;
