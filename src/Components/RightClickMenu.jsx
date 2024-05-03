import { Button, Chip, Menu, MenuItem } from "@mui/material";
import { motion } from "framer-motion";
import { useContext, useEffect, useState } from "react";
import { AiFillMessage } from "react-icons/ai";
import { BsFilePerson, BsPersonFillAdd } from "react-icons/bs";
import { FrameContext, UserContext } from "../Context/UserContext";
import { FaPlus } from "react-icons/fa";

const RightClickMenu = ({ peerid }) => {
  const [profileOpen, setProfileOpen] = useState(false);
  // const [anchorEl, setAnchorEl] = useState(null);
  const { anchorEl, handleClose } = useContext(FrameContext);
  const open = Boolean(anchorEl);

  const { usersData, userData } = useContext(UserContext);
  const closeAll = () => {
    handleClose();
    setProfileOpen(false);
  };
  // useEffect(() => {
  //   if (profileOpen === false) setOpen(false);
  // }, [profileOpen]);
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

      {/* <div
        className="flex items-center justify-center z-[30]"
        // onClick={profileOpen ? () => setProfileOpen(false) : undefined}
      >
        <ProfileBox userData={userData} />
        <motion.div
          // animate={open ? "open" : "closed"}
          className="relative z-[30]"
        >
          <motion.ul
            initial={wrapperVariants.closed}
            variants={wrapperVariants}
              style={{ originY: "top", translateX: "-50%" }}
            className="flex flex-col gap-2 p-2 rounded-lg bg-bg shadow-xl absolute  w-48 overflow-hidden z-[40]"
          >
            <motion.li
              variants={itemVariants}
              onClick={() => {
                setProfileOpen(true);
              }}
              className="z-[99] flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-gray-300 hover:text-primary transition-colors cursor-pointer"
            >
              <motion.span variants={actionIconVariants}>
                <BsFilePerson />
              </motion.span>
              <span>{"Profile"}</span>
            </motion.li>
            <Option setOpen={setProfileOpen} Icon={BsFilePerson} text="Profile" />
            <Option
              open={open}
              setOpen={setOpen}
              Icon={AiFillMessage}
              text="Message (comming soon)"
            />
            <Option
              open={open}
              setOpen={setOpen}
              Icon={BsPersonFillAdd}
              text="Add friend (comming soon)"
            />
            <Option setOpen={setOpen} Icon={FiTrash} text="Remove" />
          </motion.ul>
          {profileOpen ? (
            <ProfileBox usersData={usersData} peerid={peerid} />
          ) : null}
        </motion.div>
      </div> */}
    </Menu>
  );
};
// return (
//   <div
//     className="flex items-center justify-center z-[30]"
//     onClick={profileOpen ? () => setProfileOpen(false) : undefined}
//   >
//     {/* <ProfileBox userData={userData} /> */}
//     <motion.div
//       animate={open ? "open" : "closed"}
//       className="relative z-[30]"
//     >
//       <motion.ul
//         initial={wrapperVariants.closed}
//         variants={wrapperVariants}
//         //   style={{ originY: "top", translateX: "-50%" }}
//         className="flex flex-col gap-2 p-2 rounded-lg bg-bg shadow-xl absolute  w-48 overflow-hidden z-[40]"
//       >
//         <motion.li
//           variants={itemVariants}
//           onClick={() => {
//             setProfileOpen(true);
//           }}
//           className="z-[99] flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-gray-300 hover:text-primary transition-colors cursor-pointer"
//         >
//           <motion.span variants={actionIconVariants}>
//             <BsFilePerson />
//           </motion.span>
//           <span>{"Profile"}</span>
//         </motion.li>
//         {/* <Option setOpen={setProfileOpen} Icon={BsFilePerson} text="Profile" /> */}
//         <Option
//           open={open}
//           setOpen={setOpen}
//           Icon={AiFillMessage}
//           text="Message (comming soon)"
//         />
//         <Option
//           open={open}
//           setOpen={setOpen}
//           Icon={BsPersonFillAdd}
//           text="Add friend (comming soon)"
//         />
//         {/* <Option setOpen={setOpen} Icon={FiTrash} text="Remove" /> */}
//       </motion.ul>
//       {profileOpen ? (
//         <ProfileBox usersData={usersData} peerid={peerid} />
//       ) : null}
//     </motion.div>
//   </div>
// );
// };

const Option = ({ text, Icon, setOpen, open }) => {
  return (
    <motion.li
      variants={itemVariants}
      onClick={open ? () => setOpen(false) : undefined}
      className="flex items-center gap-2 w-full p-2 text-xs font-medium whitespace-nowrap rounded-md hover:bg-indigo-100 text-gray-300 hover:text-primary transition-colors cursor-pointer"
    >
      <motion.span variants={actionIconVariants}>
        <Icon />
      </motion.span>
      <span>{text}</span>
    </motion.li>
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

const wrapperVariants = {
  open: {
    scaleY: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
    },
  },
  closed: {
    scaleY: 0,
    transition: {
      when: "afterChildren",
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  open: {
    opacity: 1,
    y: 0,
    transition: {
      when: "beforeChildren",
    },
  },
  closed: {
    opacity: 0,
    y: -15,
    transition: {
      when: "afterChildren",
    },
  },
};

const actionIconVariants = {
  open: { scale: 1, y: 0 },
  closed: { scale: 0, y: -7 },
};
