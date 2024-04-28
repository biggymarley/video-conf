import {
  selectHMSMessages,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import EmojiPicker from "emoji-picker-react";
import { motion } from "framer-motion";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { BsEmojiDizzyFill } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { IoChatbubbleSharp } from "react-icons/io5";
import { useMediaQuery } from "react-responsive";
import { ChatContext, RoomsContext, UserContext } from "../Context/UserContext";

const LiquidSideNav = () => {
  // const [isOpen, setIsOpen] = useState(false);
  const { isOpen, setIsOpen } = useContext(ChatContext);

  return (
    // <div className="w-screen h-screen bg-gradient-to-br from-violet-600 to-indigo-600 grid place-content-center relative">
    //   {/* <div className="flex items-center text-white">
    //     <span className="text-sm">Open nav</span>
    //     <FiArrowRight className="mr-4 ml-2" />

    //   </div> */}
    // </div>
    <Nav isOpen={isOpen} setIsOpen={setIsOpen} />
  );
};

const Nav = ({ isOpen, setIsOpen }) => {
  const allMessages = useHMSStore(selectHMSMessages);
  const hmsActions = useHMSActions();
  const { userData } = useContext(UserContext);
  const { selectedRoom, rooms } = useContext(RoomsContext);
  const [isOpenEmojie, setisOpenEmojie] = useState(false);
  const [selectedEmojie, setisselectedEmojie] = useState(null);
  const [message, setimessage] = useState("");
  const isTabletOrMobile = useMediaQuery({ maxWidth: 2500 });
  console.log(isTabletOrMobile)
  const navVariants = isTabletOrMobile ? bigscreen : smallscreen;
  const Send = (e) => {
    if (e.key === "Enter") {
      hmsActions.sendBroadcastMessage(message);
      setimessage("");
      selectedEmojie(null);
    }
  };
  const handleChange = (e) => {
    setimessage(e.target.value);
  };
  useEffect(() => {
    if (selectedEmojie) setimessage(message + selectedEmojie.emoji);
  }, [selectedEmojie, allMessages]);

  return (
    <motion.nav
      className="absolute md:relative top-0 bottom-0  bg-bg z-50 w-full overflow-hidden"
      animate={isOpen ? "open" : "closed"}
      variants={navVariants}
      initial="closed"
    >
      <div className="absolute top-4 shadow-sm shadow-gray-600 w-full flex ">
        <p className="ml-[12px] font-bold text-xl flex items-center gap-1 flex-grow p-2">
          <IoChatbubbleSharp size={25} color="#838383" />
          {rooms?.data?.[selectedRoom]?.name}
        </p>
        <motion.button
          className="text-white p-2 rounded-full"
          style={isOpen ? { display: "block" } : { display: "none" }}
          whileHover={{ rotate: "180deg" }}
          onClick={() => setIsOpen(false)}
          whileTap={{ scale: 0.9 }}
        >
          <FiX size={25} />
        </motion.button>
      </div>
      <div className="p-4 absolute bottom-0 w-full flex z-10 bg-bg">
        <input
          id="message"
          name="message"
          type="text"
          autoComplete="off"
          onKeyDown={Send}
          onChange={handleChange}
          value={message}
          placeholder={`Message ${rooms?.data?.[selectedRoom]?.name}`}
          className=" h-[40px] block w-full rounded-md border-0 py-1.5 text-white shadow-sm bg-gray-600 sm:text-sm sm:leading-6"
        />
        <button
          className="absolute right-6 top-0 bottom-0"
          onClick={() => setisOpenEmojie(!isOpenEmojie)}
        >
          <BsEmojiDizzyFill size={25} />
        </button>
        <div className="absolute w-full bottom-[70px] -right-4">
          <EmojiPicker
            open={isOpenEmojie}
            onEmojiClick={(emoji) => setisselectedEmojie(emoji)}
          />
        </div>
      </div>
      <div className="flex flex-col mt-[90px] gap-1 overflow-auto min-h-screen h-full pb-[160px] absolute w-full">
        {allMessages.map((msg, index) => (
          <div key={msg.id} className={`flex gap-1  px-2`}>
            <p
              className="font-light text-sm "
              style={{ lineBreak: "anywhere" }}
            >
              <div className="flex w-full gap-2 items-center">
                <span
                  className={`font-semibold text-sm text-[${userData.color}]`}
                >
                  {msg.senderName} :
                </span>
                <span className="font-light text-xs text-gray-400">
                  {moment(msg.time).fromNow()}
                </span>
              </div>
              {msg.message}
            </p>
          </div>
        ))}
      </div>
      {/* <motion.div
        variants={linkWrapperVariants}
        className="flex flex-col gap-4 absolute bottom-8 left-8"
      >
        <NavLink text="Home" />
        <NavLink text="Work" />
        <NavLink text="Careers" />
        <NavLink text="Contact" />
      </motion.div> */}
    </motion.nav>
  );
};

export default LiquidSideNav;

const bigscreen = {
  open: {
    // x: "0%",
    // borderTopLeftRadius: "0vw",
    // borderBottomLeftRadius: "0vw",
    opacity: 1,
    display: "block",
    width: "100%",
  },
  closed: {
    // x: "100%",
    // borderTopLeftRadius: "50vw",
    // borderBottomLeftRadius: "50vw",
    display: "hidden",
    opacity: 0,
    width: "0%",
  },
};

const smallscreen = {
  open: {
    // x: "0%",
    // borderTopLeftRadius: "0vw",
    // borderBottomLeftRadius: "0vw",
    opacity: 1,
    display: "block",
    width: "50%",
  },
  closed: {
    // x: "100%",
    // borderTopLeftRadius: "50vw",
    // borderBottomLeftRadius: "50vw",
    display: "hidden",
    opacity: 0,
    width: "0%",
  },
};
