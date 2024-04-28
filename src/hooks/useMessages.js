import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";
import moment from "moment";
function replaceUndefinedWithEmptyString(obj) {
  let newObj = {}; // Create a new empty object
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "undefined") {
        newObj[key] = ""; // Assign empty string to the new object
      } else {
        newObj[key] = obj[key]; // Copy existing value to the new object
      }
    }
  }
  return newObj;
}
export default function useMessages(userName) {
  const [messages, setMessages] = useState(null);

  const getMessages = async () => {
    try {
      const messagesRes = await getDocs(collection(db, "messages"));
      let messagesArray = [];
      messagesRes.forEach((docs) => {
        messagesArray = [...messagesArray, docs.data()];
      });
      setMessages([...messagesArray]);
      console.log("resssssssssss", messagesArray);
    } catch (error) {
      console.error(error);
    }
  };

  const setMessagesdB = async (message) => {
    try {
      console.log(message);
      const cleanmessage = replaceUndefinedWithEmptyString(message);
      const messagesRef = doc(
        db,
        "messages",
        cleanmessage?.id ?? moment.now().toExponential()
      );
      await setDoc(messagesRef, {
        ...cleanmessage,
        senderName: userName,
        time: moment.now(),
        id: moment.now().toExponential(),
      });
      setMessages([
        ...messages,
        {
          ...cleanmessage,
          senderName: userName,
          time: moment.now(),
          id: moment.now().toExponential(),
        },
      ]);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);
  return { setMessagesdB, messages };
}
