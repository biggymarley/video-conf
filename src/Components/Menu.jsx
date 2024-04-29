import Drawer from "@mui/material/Drawer";
import {selectBroadcastMessages,
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
import { RoomsContext, UserContext } from "../Context/UserContext";
import useMessages from "../hooks/useMessages";

export default function Menu({ isOpen, setIsOpen }) {
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };
  const allMessages = useHMSStore(selectBroadcastMessages);
  const hmsActions = useHMSActions();
  const { userData, usersData } = useContext(UserContext);
  const { selectedRoom, rooms } = useContext(RoomsContext);
  const [isOpenEmojie, setisOpenEmojie] = useState(false);
  const [selectedEmojie, setisselectedEmojie] = useState(null);
  const [message, setimessage] = useState("");
  const [color, setColor] = useState("red");
  const { messages, setMessagesdB } = useMessages(userData.userName);
  const Send = (e) => {
    if (e.key === "Enter") {
      hmsActions.sendBroadcastMessage(message);
      setMessagesdB(
        {
          ...allMessages?.[allMessages?.length - 1],
          message: message,
          senderName: userData.userName,
        } ?? {
          senderName: userData.userName,
          message: message,
          time: moment.now(),
          id: moment.now().toExponential(),
        }
      );
      setimessage("");
      setisselectedEmojie(null);
    }
  };
  const handleChange = (e) => {
    setimessage(e.target.value);
  };


  const getuserColor = (sender) => {
    let color = "";
    if(sender === "You")
     color = usersData?.filter((user) => user.userName === userData.userName)?.[0]
    ?.color;
    else
     color = usersData?.filter((user) => user.userName === userData.userName)?.[0]
    ?.color;
    console.log(color)
    return color
  }
  // useEffect(() => {
  //   if (allMessages?.[allMessages?.length - 1] && ) {

  //     setallMessagesArray([
  //       ...allMessagesArray,
  //       allMessages[allMessages.length - 1],
  //     ]);
  //   }
  // }, [allMessages]);
  useEffect(() => {
    const color = usersData?.filter(
      (user) => user.userName === userData.userName
    )?.[0]?.color;
    setColor(color);
    console.log(color);
    console.log(usersData, userData);
  }, [usersData, userData]);

  useEffect(() => {
    if (selectedEmojie) setimessage(message + selectedEmojie.emoji);
  }, [selectedEmojie, allMessages]);

  return (
    <div>
      <>
        <Drawer
          anchor={"right"}
          open={isOpen}
          onClose={toggleDrawer(false)}
          className="overflow*hidden"
        >
          {/* <motion.nav
            className="absolute md:relative top-0 bottom-0  bg-bg z-50 w-full overflow-hidden"
            animate={isOpen ? "open" : "closed"}
            variants={navVariants}
            initial="closed"
          > */}
          <div className="flex w-screen sm:w-[400px] bg-bg overflow-hidden">
            <div className="absolute top-0 shadow-sm shadow-gray-600 w-full flex bg-bg z-10 overflow-hidden">
              <p className=" font-bold text-xl flex items-center gap-1 flex-grow p-4 ">
                <IoChatbubbleSharp size={25} color="#838383" />
                {rooms?.data?.[selectedRoom]?.template}
              </p>
              <motion.button
                className="text-white p-2 rounded-full"
                style={isOpen ? { display: "block" } : { display: "none" }}
                onClick={() => setIsOpen(false)}
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
                placeholder={`Message ${rooms?.data?.[selectedRoom]?.template}`}
                className=" h-[40px] block w-full rounded-md border-0 py-1.5 text-white shadow-sm bg-gray-600 sm:text-sm sm:leading-6"
              />
              <button
                className="absolute right-6 top-0 bottom-0 z-10"
                onClick={() => setisOpenEmojie(!isOpenEmojie)}
              >
                <BsEmojiDizzyFill size={25} />
              </button>
              <div className="absolute w-full bottom-[70px] left-0 pl-6">
                <EmojiPicker
                  open={isOpenEmojie}
                  onEmojiClick={(emoji) => setisselectedEmojie(emoji)}
                  width={"90%"}
                />
              </div>
            </div>
            <div
              onClick={() => setisOpenEmojie(false)}
              className="flex flex-col  gap-4 overflow-auto  h-screen pb-[72px] absolute w-full pt-[56px]"
            >
              <div className="">
                <p className="font-light text-center pb-8 pt-4 px-1 text-gray-400">
                  Welcom to {rooms?.data?.[selectedRoom]?.template}'s Chat, Type
                  Somthing!
                </p>
              </div>
              {messages?.map((msg, index) => (
                <div key={index} className={`flex gap-4  px-2`}>
                  <div
                    className="font-light text-sm "
                    style={{ lineBreak: "anywhere" }}
                  >
                    <div className="flex w-full gap-2 items-center">
                      <span
                      style={{color:getuserColor(msg.senderName) }}
                        className={`font-semibold text-sm]`}
                      >
                        {msg.senderName === "You"
                          ? userData.userName
                          : msg.senderName}{" "}
                        :
                      </span>
                      <span className="font-light text-xs text-gray-400">
                        {moment(msg.time).fromNow()}
                      </span>
                    </div>
                    {msg.message}
                  </div>
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
            {/* </motion.nav> */}
          </div>
        </Drawer>
      </>
    </div>
  );
}

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
    width: "600px",
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
