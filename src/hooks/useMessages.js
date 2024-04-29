import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database, db } from "../firebase/firebaseConfig";
import moment from "moment";
import { onValue, ref } from "firebase/database";
import {
  useHMSStore,
  selectPeersScreenSharing,
  useHMSActions,
  selectScreenShareByPeerID,
} from "@100mslive/react-sdk";
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

  useEffect(() => {
    const query = ref(database, "messages");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        Object.values(data).map((message) => {
          setMessages((messages) => [...messages, message]);
        });
      }
    });
  }, []);
  // const getMessages = async () => {
  //   try {
  //     const messagesRes = await getDocs(collection(db, "messages"));
  //     let messagesArray = [];
  //     messagesRes.forEach((docs) => {
  //       messagesArray = [...messagesArray, docs.data()];
  //     });
  //     let sortedmessagesArray = messagesArray.sort((a, b) => a.time - b.time)
  //     console.log(sortedmessagesArray)
  //     setMessages([...sortedmessagesArray]);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const setMessagesdB = async (message) => {
    try {
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
      // setMessages([
      //   ...messages,
      //   {
      //     ...cleanmessage,
      //     senderName: userName,
      //     time: moment.now(),
      //     id: moment.now().toExponential(),
      //   },
      // ]);
    } catch (error) {
      console.error(error);
    }
  };

  //   useEffect(() => {
  //     const intervalId = setInterval(() => {
  //         getMessages()
  //     }, 2000); // 2000 milliseconds = 2 seconds

  //     // Clean up function to clear the interval when the component unmounts
  //     return () => clearInterval(intervalId);
  // }, []);

  return { messages, setMessagesdB, };
}
