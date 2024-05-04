import { useHMSActions } from "@100mslive/react-sdk";
import Drawer from "@mui/material/Drawer";
import EmojiPicker from "emoji-picker-react";
import { motion } from "framer-motion";
import GifPicker from "gif-picker-react";
import moment from "moment";
import { useContext, useEffect, useState } from "react";
import { BsEmojiDizzyFill, BsYoutube } from "react-icons/bs";
import { FiX } from "react-icons/fi";
import { IoChatbubbleSharp } from "react-icons/io5";
import { MdOutlineGifBox } from "react-icons/md";
import {
  FrameContext,
  RoomsContext,
  UserContext,
} from "../Context/UserContext";
import logo from "../assets/chillGray.png";
export default function Menu({ isOpen, setIsOpen, setActive, active }) {
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setIsOpen(open);
  };
  const hmsActions = useHMSActions();
  const { userData, usersData } = useContext(UserContext);
  const { allMessages, messages, setMessagesdB } = useContext(FrameContext);
  const { selectedRoom, rooms } = useContext(RoomsContext);
  const [isOpenEmojie, setisOpenEmojie] = useState(false);
  const [isOpenGif, setisOpenGif] = useState(false);
  const [selectedEmojie, setisselectedEmojie] = useState(null);
  const [selectedGif, setiselectedGif] = useState(null);
  const [message, setimessage] = useState({});
  const [color, setColor] = useState("red");

  const checkforbotCmd = (type, content) => {
    if (type === "TEXT") {
      const splited = content.split(" ");
      if (splited[0] === "m!p" && splited[1])
        return {
          messageType: "BOT",
          content: content.substr(content.indexOf(" ") + 1),
        };
    }
    return { messageType: type, content };
  };
  console.log(messages);
  const Send = (e) => {
    if (e.key === "Enter") {
      const tcontent = checkforbotCmd(message.messageType, message.content);
      if (tcontent.messageType === "BOT") {
        hmsActions.sendBroadcastMessage(message);
        setMessagesdB(
          {
            ...allMessages?.[allMessages?.length - 1],
            content: message.content,
            messageType: message.messageType,
            senderName: userData.userName,
            logoUrl: userData.logoUrl,
            color: userData?.color ?? "red",
            ...tcontent,
          } ?? {
            senderName: userData.userName,
            color: userData?.color ?? "red",
            content: message.content,
            messageType: message.messageType,
            logoUrl: userData.logoUrl,

            time: moment.now(),
            id: moment.now().toExponential(),
            ...tcontent,
          }
        );
        // THIS TO STOP BOT FROM PLAYING EVERY TIME YOU ENTER THE ROOM
        setTimeout(() => {
          hmsActions.sendBroadcastMessage(message);
          setMessagesdB(
            {
              ...allMessages?.[allMessages?.length - 1],
              senderName: userData.userName,
              color: userData?.color ?? "red",
              ...tcontent,
              content: "",
              messageType: "TEXT",
            } ?? {
              senderName: userData.userName,
              color: userData?.color ?? "red",
              time: moment.now(),
              id: moment.now().toExponential(),
              ...tcontent,
              messageType: "TEXT",
              content: "",
            }
          );
        }, 5000);
      } else {
        hmsActions.sendBroadcastMessage(message);
        setMessagesdB(
          {
            ...allMessages?.[allMessages?.length - 1],
            content: message.content,
            messageType: message.messageType,
            logoUrl: userData.logoUrl,

            senderName: userData.userName,
            color: userData?.color ?? "red",
            ...tcontent,
          } ?? {
            senderName: userData.userName,
            color: userData?.color ?? "red",
            logoUrl: userData.logoUrl,

            content: message.content,
            messageType: message.messageType,
            time: moment.now(),
            id: moment.now().toExponential(),
            ...tcontent,
          }
        );
      }
      setimessage(null);
      setisselectedEmojie(null);
      setiselectedGif(null);
      setisOpenEmojie(false);
      setisOpenGif(false);
    }
  };
  const handleChange = (e) => {
    setimessage({ content: e.target.value, messageType: "TEXT" });
  };

  useEffect(() => {
    const color = usersData?.filter(
      (user) => user.userName === userData.userName
    )?.[0]?.color;
    setColor(color);
  }, [usersData, userData]);

  useEffect(() => {
    if (selectedEmojie)
      setimessage({
        content: (message?.content ?? "") + selectedEmojie.emoji,
        type: "TEXT",
      });
  }, [selectedEmojie]);

  useEffect(() => {
    if (selectedGif) setimessage({ content: selectedGif, messageType: "GIF" });
  }, [selectedGif, allMessages]);

  return (
    <div>
      <>
        <Drawer
          anchor={"right"}
          open={isOpen}
          onClose={toggleDrawer(false)}
          className="overflow*hidden"
        >
          <div className="flex w-screen sm:w-[400px] bg-bg overflow-hidden">
            <div className="absolute top-0 shadow-sm shadow-gray-600 w-full flex bg-bg z-10 overflow-hidden">
              <p className=" font-sans font-bold text-xl flex items-center gap-1 flex-grow p-4 ">
                <IoChatbubbleSharp size={25} color="#838383" />
                {rooms?.[selectedRoom]?.label}
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
                value={message?.content ?? ""}
                placeholder={`Message ${rooms?.[selectedRoom]?.label} room`}
                className=" h-[40px] pl-10 block w-full rounded-md border-0 py-1.5 text-white shadow-sm bg-gray-600 sm:text-sm sm:leading-6"
              />
              <button
                className="absolute right-6 top-0 bottom-0 z-10"
                onClick={() => setisOpenEmojie(!isOpenEmojie)}
              >
                <BsEmojiDizzyFill size={25} />
              </button>
              <button
                className="absolute left-6 top-0 bottom-0 z-10"
                onClick={() => setisOpenGif(!isOpenGif)}
              >
                <MdOutlineGifBox size={25} />
              </button>
              {isOpenGif ? (
                <div className="absolute w-full bottom-[70px] left-0 pl-6">
                  <GifPicker
                    onGifClick={(img) => setiselectedGif(img.url)}
                    tenorApiKey={"AIzaSyCTMkTbQ9Igbx6QIlE-nSqSJaRUUCEULDQ"}
                  />
                </div>
              ) : null}

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
                <p className="font-sans font-light text-center pb-8 pt-4 px-1 text-gray-400">
                  Welcom to {rooms?.data?.[selectedRoom]?.label}'s Chat, Type
                  Somthing!
                </p>
              </div>
              {messages?.map((msg, index) =>
                msg.content && msg.content !== "" ? (
                  <div key={index} className={`flex gap-4  px-2`}>
                    <div
                      className="font-sans font-light text-sm "
                      style={{ lineBreak: "anywhere" }}
                    >
                      <div className="flex w-full gap-4 items-center">
                        <img
                          src={msg.logoUrl ?? logo}
                          alt="user-logo"
                          className="w-10 h-10 object-cover rounded-full"
                        />
                        <div className="flex gap-2 items-center">
                          <span
                            style={{ color: msg?.color }}
                            className={`font-sans font-bold`}
                          >
                            {msg.senderName === "You"
                              ? userData.userName
                              : msg.senderName}{" "}
                            :
                          </span>
                          <span className="font-sans font-light text-xs text-gray-400">
                            {moment(msg.time).fromNow()}
                          </span>
                        </div>
                      </div>
                      <MessageHandler message={msg} />
                    </div>
                  </div>
                ) : null
              )}
            </div>
          </div>
        </Drawer>
      </>
    </div>
  );
}

const MessageHandler = ({ message }) => {
  switch (message?.messageType) {
    case "BOT":
      return (
        <div className="flex  items-center h-[90px] ml-14 bg-secondaryBg/50  rounded-md overflow-hidden">
          <div className="h-full w-2 bg-red-600"/>
          <div className="flex  items-center gap-2 px-5 flex-wrap">
          <span className="font-sans font-light ">Started playing :</span>
          <span className="text-red-500 font-sans font-bold ">
            {message.content}
          </span>
          <span className="font-sans font-light text-xs text-gray-400 ">from Youtube</span>

          </div>
        </div>
      );
    case "GIF":
      return (
        <div className="mt-2  ml-14">
          <img src={message.content} alt="userGif" />
        </div>
      );
    default:
      return (
        <div className="ml-14">
          <span className="font-sans font-semibold ">{message.content}</span>
        </div>
      );
  }
};
