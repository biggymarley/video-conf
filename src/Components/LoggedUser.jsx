import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { useEffect, useState } from "react";
import { ChatContext, RoomsContext } from "../Context/UserContext";
import useRoomsHook from "../hooks/useRoomsHook";
import useStream from "../hooks/useStream";
import Conference from "./Conference";
import JoinRooms from "./JoinRooms";
import { StartsBg } from "./StartsBg";
import { AddRoomModal } from "./JoinForm";

function LoggedUser() {
  const [isOpen, setIsOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const { rooms, getRoomCodes, roomCodes, selectedRoom, setselectedRoom, createRooms } =
    useRoomsHook();
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  const { screenshareVideoTrack, shareScreen, offShareScreen, presenters } =
    useStream();
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
        presenters,
        createRooms
      }}
    >
      <ChatContext.Provider
        value={{ isOpen, setIsOpen, modalOpen, setModalOpen }}
      >
        <AddRoomModal setIsOpen={setModalOpen} isOpen={modalOpen} />
        <div className="flex bg-bg w-full h-full overflow-hidden" id="parent">
          <StartsBg>
            {isConnected ? (
              <>
                <Conference />
              </>
            ) : (
              <JoinRooms />
            )}
          </StartsBg>
        </div>
      </ChatContext.Provider>
    </RoomsContext.Provider>
  );
}

export default LoggedUser;
