import {
  selectPeersScreenSharing,
  selectScreenShareByPeerID,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { useEffect } from "react";

export default function useStream() {
  const presenters = useHMSStore(selectPeersScreenSharing);
  const hmsActions = useHMSActions(selectPeersScreenSharing);

  // const presenters = hmsStore.getState(selectPeersScreenSharing);
  const shareScreen = async () => {
    try {
      await hmsActions.setScreenShareEnabled(true);
    } catch (error) {
      console.log(error);
    }
  };

  const offShareScreen = async () => {
    try {
      await hmsActions.setScreenShareEnabled(false);
    } catch (error) {
      console.log(error);
    }
  };

  const screenshareVideoTrack = useHMSStore(
    selectScreenShareByPeerID(presenters[0]?.id ?? "")
  );



  return { shareScreen, screenshareVideoTrack, offShareScreen, presenters };
}
