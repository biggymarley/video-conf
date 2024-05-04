import { Chip, Menu, MenuItem } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import { BsFilePerson, BsPersonFillAdd } from "react-icons/bs";
import { FaPlus } from "react-icons/fa";
import { FrameContext, UserContext } from "../Context/UserContext";

const RightClickMenu = ({ peerid }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  const { anchorEl, handleClose } = useContext(FrameContext);
  const { usersData } = useContext(UserContext);
  const open = Boolean(anchorEl);

  return (
    <Menu
      id="basic-menu"
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      sx={{ '& .MuiPaper-root ': {
        backgroundColor: '#313338',
      },}}
      transformOrigin={{ horizontal: "center", vertical: "center" }}
      anchorOrigin={{ horizontal: "center", vertical: "center" }}
      MenuListProps={{
        "aria-labelledby": "basic-button",
      }}
    >
      <MenuItem onClick={() => setProfileOpen(true)}>
        <p className=" flex items-center gap-2 w-full p-2 text-sm font-medium whitespace-nowrap  hover:bg-indigo-100 text-gray-300 hover:text-primary transition-colors ">
          <BsFilePerson size={20} /> Profile
        </p>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <p className=" flex items-center gap-2 w-full p-2 text-sm font-medium whitespace-nowrap  hover:bg-indigo-100 text-gray-300 hover:text-primary transition-colors ">
          <AiFillMessage size={20} /> Message (comming soon)
        </p>
      </MenuItem>
      <MenuItem onClick={handleClose}>
        <p className=" flex items-center gap-2 w-full p-2 text-sm font-medium whitespace-nowrap  hover:bg-indigo-100 text-gray-300 hover:text-primary transition-colors ">
          <BsPersonFillAdd size={20} /> Add friend (comming soon)
        </p>
      </MenuItem>
      {profileOpen ? (
        <ProfileBox
          usersData={usersData}
          setProfileOpen={setProfileOpen}
          peerid={peerid}
        />
      ) : null}

      
    </Menu>
  );
};

const ProfileBox = ({ usersData, peerid, setProfileOpen }) => {
  const [user, setUser] = useState({});
  useEffect(() => {
    setUser(usersData?.filter((user) => user.userName === peerid)[0]);
    usersData, peerid;
  }, [peerid, usersData]);

  return (
    <div
      className="w-screen h-screen bg-bg/40 backdrop-blur-sm flex fixed z-[99] top-0 left-0 items-center justify-center"
      onClick={() => setProfileOpen(false)}
    >
      <div className="max-w-md bg-gray-700/80 w-full flex flex-col rounded-xl overflow-hidden relative h-[400px]">
        <div className="h-[35%] bg-blue-500">
          {user?.bannerUrl && (
            <div>
              <img
                src={user?.bannerUrl}
                alt="Selected"
                style={{ height: "100%", width: "100%" }}
                className="absolute top-0 left-0 bottom-0 right-0"
              />
            </div>
          )}
        </div>
        <div className="w-[100px] h-[100px] bg-slate-300 rounded-full absolute top-[20%] left-4 border-t-gray-700/80 border-4 border-b-0 border-r-gray-700/80 border-gray-700/80">
          {/* PROFILE IMG */}
          {user?.logoUrl && (
            <div className="rounded-full overflow-hidden">
              <img
                src={user?.logoUrl}
                alt="Selected"
                style={{ height: "100%", width: "100%" }}
                className="absolute top-0 left-0 bottom-0 right-0 rounded-full"
              />
            </div>
          )}
        </div>
        <div className="w-full p-2  absolute bottom-0">
          <div
            style={{ backgroundColor: user?.color }}
            className={`p-2 pb-10  bg-bg w-full rounded-md  flex flex-col gap-1 relative`}
          >
            <p className="font-sans font-bold text-xl text-gray-300 text-end">
              {user?.userName}
            </p>
            <p className="font-sans font-light text-md text-gray-400  pb-2 text-end">
              {user?.userName}
            </p>
            <p className="font-sans font-bold text-sm text-gray-300">
              ABOUT ME :
            </p>
            <p className="font-sans font-light text-md text-gray-400 border-b-red-50/20 pb-2 border-b-[.5px]">
              {user?.bio}
            </p>
            <div className="flex gap-2 mt-2 items-center">
              <p className="text-gray-300 font-sans text-sm">Rooms: </p>
              <Chip
                label="Wagners"
                variant="filled"
                size="small"
                color="success"
              />
            </div>
          </div>
        </div>
        <button
          // onClick={() => console.group("ssssssssssssss")}
          style={{ backgroundColor: user?.color }}
          className="bg-bg px-4 py-2 absolute right-2 top-2  flex  items-center gap-2 font-sans text-xs rounded"
        >
          ADD FRIEND <FaPlus />
        </button>
      </div>
    </div>
  );
};

export default RightClickMenu;