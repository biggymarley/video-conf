import { Avatar, Chip, Typography } from "@mui/material";
import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import { AnimatePresence, motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { BiMinusCircle } from "react-icons/bi";
import { GrAddCircle } from "react-icons/gr";
import { LoadingContext } from "../Context/LoadingContext";
import { UserContext } from "../Context/UserContext";
import logo from "../assets/chillGray.png";
import { updateProfileRollesRooms } from "../firebase/userManagment";
import useRoomsHook from "../hooks/useRoomsHook";

const ShuffleSortTable = () => {
  return (
    <div className="p-8 w-full bg-gradient-to-br from-primary to-secondaryBg max-h-screen flex">
      <Table />
    </div>
  );
};

const Table = () => {
  const { usersData } = useContext(UserContext);
  const [selectedUser, setselectedUser] = useState(undefined);
  const [users, setUsers] = useState([]);
  const [roomsData, setroomsData] = useState([]);
  const { rooms } = useRoomsHook();
  useEffect(() => {
    if (usersData) setUsers([...usersData]);
  }, [usersData]);

  useEffect(() => {
    if (rooms) setroomsData([...rooms, { label: "admin", id: "admin" }]);
  }, [rooms]);

  return (
    <div className="w-full bg-white shadow-lg rounded-lg overflow-x-scroll max-w-4xl mx-auto max-h-screen overflow-auto relative">
      {selectedUser ? (
        <ProfileBox
          user={selectedUser}
          setselectedUser={setselectedUser}
          roomsData={roomsData}
        />
      ) : null}
      <table className="w-full">
        <thead>
          <tr className="border-b-[1px] border-slate-200 text-slate-400 text-sm uppercase">
            <th className="text-start p-4 font-medium">Team Member</th>
            <th className="text-start p-4 font-medium">Bio</th>
            <th className="text-start p-4 font-medium">Roles & Rooms</th>
            <th className="text-start p-4 font-medium">Color</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user, index) => {
            return (
              <TableRows
                key={index}
                user={user}
                index={index}
                setselectedUser={setselectedUser}
                roomsData={roomsData}
              />
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

const TableRows = ({ user, index, roomsData, setselectedUser }) => {
  return (
    <motion.tr
      layoutId={`row-${user.uid}`}
      onClick={() => setselectedUser({ ...user })}
      className={`text-sm ${
        index % 2 ? "bg-slate-100" : "bg-white"
      } hover:bg-primary/20 cursor-pointer`}
    >
      <td className="p-4 flex items-center gap-3 overflow-hidden">
        <img
          src={user.logoUrl ? user.logoUrl : logo}
          alt="Example user photo"
          className="w-10 h-10 rounded-full bg-slate-300 object-cover object-top shrink-0"
        />
        <div>
          <span className="block mb-1 font-medium text-slate-500 font-sans">
            {user.userName}
          </span>
          <span className="block text-xs text-slate-500 font-sans">
            {user.email}
          </span>
        </div>
      </td>

      <td className="p-4">
        <div
          className={`flex items-center gap-2 font-medium  text-slate-500 font-sans`}
        >
          <span>{user.bio ?? "not found!"}</span>
        </div>
      </td>

      <td className="p-4 font-medium  text-slate-500 flex flex-col font-sans gap-2">
        {user?.roles?.map((role, index) => (
          <Chip
            key={index}
            label={role.label}
            color="success"
            variant="outlined"
          />
        ))}
      </td>

      <td className="p-4" style={{ backgroundColor: user.color }}>
        <span
          style={{ backgroundColor: user.color }}
          className={`px-2 py-1 text-xs font-medium rounded bg-[${user.color}] text-slate-950 font-sans`}
        >
          {user.color}
        </span>
      </td>
    </motion.tr>
  );
};

const ProfileBox = ({ user, setselectedUser, roomsData }) => {
  const [addRoomOpned, setaddedRoomOpened] = useState(false);
  const { setAppLoading } = useContext(LoadingContext);
  const { saveTokenUser, saveTokenUsers } = useContext(UserContext);
  const theme = useTheme();
  const defaultContrastThresholdTheme = createTheme({
    palette: {
      contrastThreshold: 100,
    },
  });

  const UpdateUserRolesRooms = (room) => {
    console.log("Updating", [room], user);
    updateProfileRollesRooms(
      user.uid,
      [room],
      setAppLoading,
      saveTokenUser,
      saveTokenUsers
    );
  };

  return (
    <ThemeProvider theme={defaultContrastThresholdTheme}>
      <AnimatePresence>
        {user && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setselectedUser(undefined)}
            className="bg-slate-900/20 backdrop-blur p-8 fixed inset-0 z-[1000] grid place-items-center overflow-y-scroll cursor-pointer h-full"
          >
            <motion.div
              initial={{ scale: 0, rotate: "12.5deg" }}
              animate={{ scale: 1, rotate: "0deg" }}
              exit={{ scale: 0, rotate: "0deg" }}
              onClick={(e) => e.stopPropagation()}
              className="bg-gradient-to-br z-[1000]  rounded-lg w-full max-w-lg shadow-xl cursor-default relative overflow-hidden h-[500px]"
            >
             
              <div className="h-[35%] bg-blue-500">
                <div>
                  <img
                    src={user?.bannerUrl ?? logo}
                    alt="Selected"
                    style={{ maxWidth: "100%" }}
                    className="absolute top-0 left-0 bottom-0 right-0  h-full w-full"
                  />
                </div>
              </div>
              <div className="w-[100px] h-[100px] bg-slate-300 rounded-full absolute top-[20%] left-4 border-t-gray-700/80 border-4 border-b-0 border-r-gray-700/80 border-gray-700/80">
                {/* PROFILE IMG */}
                <div>
                  <img
                    src={user?.logoUrl ?? logo}
                    alt="Selected"
                    style={{ maxWidth: "100%" }}
                    className="absolute w-full top-0 left-0 bottom-0 right-0 rounded-full h-full"
                  />
                </div>
              </div>
              <div className=" w-full p-2  absolute bottom-0">
                <div
                  style={{ backgroundColor: user.color }}
                  className={`p-2 pb-10  bg-bg w-full rounded-md  flex flex-col gap-1 relative`}
                >
                    <span className="hidden">
                    {theme.palette.contrastThreshold}
                  </span>
                 
                  <p style={{color: theme.palette.getContrastText(user.color)}} className="font-sans font-bold text-xl  text-end ">
                    {user?.userName}
                  </p>

                  <p style={{color: theme.palette.getContrastText(user.color)}} className="font-sans font-light text-md   pb-2 text-end" >
                    
                    {user?.userName}
                  </p>
                  <p style={{color: theme.palette.getContrastText(user.color)}} className="font-sans font-bold text-sm ">ABOUT ME :</p>
                  <p style={{color: theme.palette.getContrastText(user.color)}} className="font-sans font-light text-md  border-b-red-50/20 pb-2 border-b-[.5px]">
                    {user?.bio}
                  </p>
                  <div className="flex gap-2 flex-col">
                    <div className="flex gap-2 mt-2 items-center">
                      <p style={{color: theme.palette.getContrastText(user.color)}} className=" font-sans text-sm">Rooms & Roles: </p>
                      {user?.roles?.map((role, index) => (
                        <Chip
                          key={index}
                          label={role.label}
                          variant="filled"
                          size="small"
                          color="success"
                        />
                      ))}
                      <button
                        onClick={() => setaddedRoomOpened(!addRoomOpned)}
                        className=" transition transform scale-1 hover:scale-[1.08]"
                      >
                        {addRoomOpned ? (
                          <BiMinusCircle size={20} />
                        ) : (
                          <GrAddCircle size={20} />
                        )}
                      </button>
                    </div>
                    {addRoomOpned ? (
                      <div className="flex gap-2 ">
                        {roomsData.map((room, index) => (
                          <Chip
                            key={index}
                            avatar={
                              <Avatar
                                alt="room-logo"
                                src={room.logoUrl ?? logo}
                              />
                            }
                            label={room.label}
                            variant="outlined"
                            size="info"
                            color="default"
                            clickable
                            onClick={() => UpdateUserRolesRooms(room)}
                          />
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeProvider>
  );
};

export default ShuffleSortTable;
