import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { useEffect, useState } from "react";
import { ChatContext, RoomsContext } from "../Context/UserContext";
import useRoomsHook from "../hooks/useRoomsHook";
import Conference from "./Conference";
import JoinForm from "./JoinForm";
import LiquidSideNav from "./SideChat";
import useStream from "../hooks/useStream";

function LoggedUser() {
  const [isOpen, setIsOpen] = useState(false);
  const { rooms, getRoomCodes, roomCodes, selectedRoom, setselectedRoom } =
    useRoomsHook();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  const { screenshareVideoTrack, shareScreen, offShareScreen, presenters } = useStream();

  useEffect(() => {
    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [hmsActions, isConnected]);

  return (
    <RoomsContext.Provider
      value={{
        rooms,
        getRoomCodes,
        roomCodes,
        selectedRoom,
        setselectedRoom,
        shareScreen,
        screenshareVideoTrack,
        offShareScreen,
        presenters
      }}
    >
      <ChatContext.Provider value={{ isOpen, setIsOpen }}>
        <div className="flex bg-bg w-full h-full overflow-hidden" id="parent">
          {isConnected ? (
            <>
              <Conference />
              <LiquidSideNav />
            </>
          ) : (
            <JoinForm />
          )}
        </div>
      </ChatContext.Provider>
    </RoomsContext.Provider>
  );
}

export default LoggedUser;
