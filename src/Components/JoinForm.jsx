import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useState } from "react";
import { FiAlertCircle, FiPlusCircle } from "react-icons/fi";
import { TiPlus } from "react-icons/ti";
import { toast } from "sonner";
import { LoadingContext } from "../Context/LoadingContext";
import { ChatContext, RoomsContext, UserContext } from "../Context/UserContext";
import { FaPen } from "react-icons/fa6";
import logo from "../assets/chillGray.png";
import { BsPlus } from "react-icons/bs";
const JoinForm = ({}) => {
  const hmsActions = useHMSActions();
  const { rooms, getRoomCodes, setselectedRoom } = useContext(RoomsContext);
  const { userData, getUser, getUsers } = useContext(UserContext);
  const { setAppLoading } = useContext(LoadingContext);
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const { setModalOpen, modalOpen } = useContext(ChatContext);

  const goLive = async (id, index) => {
    if (
      userData.roles?.filter((role) => role.id === id).length > 0 ||
      userData.roles?.filter((role) => role.id === "admin").length > 0
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
          {rooms?.map((room, index) => (
            <div
              key={index}
              onClick={() => goLive(room.id, index)}
              className=" w-[50px]  h-auto   transition transform scale-100 hover:scale-[1.02] 	cursor-pointer"
            >
              <div className="w-[50px] h-[50px]">
                <img
                  src={room.logoUrl}
                  alt="roomlogo"
                  className="w-full h-full rounded-full"
                />
              </div>
            </div>
          ))}
          <div
            onClick={() => setModalOpen(true)}
            className="flex items-center justify-center rounded-[50px] w-[50px]  h-[50px]  transform scale-100 hover:scale-[1.02] hover:rounded-[20px] 	cursor-pointer bg-gray-600 hover:bg-primary duration-300	hover:text-black ease-in-out transition-all"
          >
            <BsPlus size={30} />
          </div>
        </div>
      </div>
    </div>
  );
};

export const AddRoomModal = ({ isOpen, setIsOpen }) => {
  const [selectedImageLogo, setSelectedImageLogo] = useState(undefined);
  const [roomName, setroomName] = useState("");
  const { createRooms } = useContext(RoomsContext);
  // useEffect(() => {
  //   formik.setFieldValue("logo", selectedImageLogo);
  // }, [selectedImageLogo]);
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsOpen(false)}
          className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-[1000] grid place-items-center overflow-y-scroll cursor-pointer"
        >
          <motion.div
            initial={{ scale: 0, rotate: "12.5deg" }}
            animate={{ scale: 1, rotate: "0deg" }}
            exit={{ scale: 0, rotate: "0deg" }}
            onClick={(e) => e.stopPropagation()}
            className="bg-gradient-to-br z-[1000] from-primary to-bg text-white p-6 rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden"
          >
            <FiPlusCircle className="text-white/10 rotate-12 text-[250px] absolute z-0 -top-24 -left-24" />
            <div className="relative z-[1000]">
              <div className="bg-white w-16 h-16 mb-2 rounded-full text-3xl text-indigo-600 grid place-items-center mx-auto">
                <FiPlusCircle />
              </div>
              <h3 className="text-3xl font-bold text-center mb-2">
                Create Room
              </h3>
              <p className="text-center mb-6">
                Enter a room name and upload your logo and enjoy your space.
              </p>
              <div className="flex justify-center flex-col items-center gap-2">
                <RoomLogoUploader
                  selectedImageLogo={selectedImageLogo}
                  setSelectedImageLogo={setSelectedImageLogo}
                />
                {selectedImageLogo === undefined && (
                  <span className="text-red-400 text-sm">required*</span>
                )}
              </div>
              <div className="pb-8">
                <label
                  htmlFor="roomName"
                  className="flex text-xs font-sans font-bold leading-6 text-gray-300 gap-1"
                >
                  Room name<span className="text-red-500">*</span>
                </label>
                <div className="mt-2 flex flex-col gap-1">
                  <input
                    id="roomName"
                    name="roomName"
                    value={roomName}
                    onChange={(e) => setroomName(e.target.value)}
                    type="roomName"
                    autoComplete="roomName"
                    required
                    className=" h-[40px] block w-full rounded-sm border-0 py-1.5 text-white shadow-sm   sm:text-sm sm:leading-6 bg-bg"
                  />
                  {roomName === "" && (
                    <span className="text-red-400 text-sm">required*</span>
                  )}
                </div>
              </div>
              <div className="flex gap-2 z-[1000]">
                <button
                  onClick={() => setIsOpen(false)}
                  className="bg-transparent hover:bg-white/10 transition-colors text-white font-semibold w-full py-2 rounded"
                >
                  Nah, go back
                </button>
                <button
                  onClick={() => createRooms(roomName, selectedImageLogo)}
                  disabled={roomName === "" || selectedImageLogo === undefined}
                  className="bg-white hover:opacity-90 transition-opacity text-indigo-600 font-semibold w-full py-2 rounded"
                >
                  Create Room!
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

const RoomLogoUploader = ({ selectedImageLogo, setSelectedImageLogo }) => {
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file)
      setSelectedImageLogo({
        file: file,
        preview: URL.createObjectURL(file),
      });
  };

  return (
    <div className="relative flex justify-center items-center w-[120px] h-[120px] border-2 border-bg rounded-full overflow-hidden">
      <label
        htmlFor="file-uploadBanner"
        className="penparent z-10 w-full h-full flex justify-center items-center transition-all hover:bg-bg/15"
      >
        <div className="penchild">
          <FaPen size={30} />
        </div>
      </label>
      <input
        id="file-uploadBanner"
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />
      {selectedImageLogo ? (
        <div className="">
          <img
            src={selectedImageLogo?.preview}
            alt="Selected"
            style={{ height: "100%", width: "100%" }}
            className="absolute top-0 left-0 bottom-0 right-0 "
          />
        </div>
      ) : (
        <div className="">
          <img
            src={logo}
            alt="logo"
            style={{ height: "100%", width: "100%" }}
            className="absolute top-0 left-0 bottom-0 right-0 "
          />
        </div>
      )}
    </div>
  );
};

export default JoinForm;
