import {
    selectPeersScreenSharing,
    selectScreenShareByPeerID,
    useHMSActions,
    useHMSStore,
} from "@100mslive/react-sdk";

export default function useStream() {
  const presenters = useHMSStore(selectPeersScreenSharing);
  const hmsActions = useHMSActions(selectPeersScreenSharing);
 

  // const presenters = hmsStore.getState(selectPeersScreenSharing);
  const shareScreen = async () => {
    try {
      await hmsActions.setScreenShareEnabled(true);
      useHMSStore;
    } catch (error) {
      console.log(error);
    }
  };
 
  const screenshareVideoTrack = useHMSStore(
    selectScreenShareByPeerID(presenters[0]?.id ?? "")
  );
  console.log(screenshareVideoTrack)

  return {  shareScreen, screenshareVideoTrack };
}
