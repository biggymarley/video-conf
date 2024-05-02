import { collection, doc, getDocs, setDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { database, db } from "../firebase/firebaseConfig";
import moment from "moment";
import { onValue, ref, getDatabase, set, push } from "firebase/database";
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
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const query = ref(database, "messages");
    return onValue(query, (snapshot) => {
      const data = snapshot.val();

      if (snapshot.exists()) {
        setMessages((messages) => [...messages, data]);
      }
    });
  }, []);
  const getMessages = async () => {
    try {
      const query = ref(database, "messages");

      return onValue(query, (snapshot) => {
        const data = snapshot.val();
        let messagesArray = []
        if (snapshot.exists()) {
          messagesArray = [...messagesArray, data]
        }
        const transformedData = messagesArray.flatMap(obj => Object.values(obj));
        setMessages([...transformedData]);
      });
    } catch (error) {
      console.error(error);
    }
  };

  const setMessagesdB = async (message) => {
    try {
      const cleanmessage = replaceUndefinedWithEmptyString(message);
      const messagesRef = ref(database, 'messages')
      const newDataref = push(messagesRef)
      set(newDataref, cleanmessage);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);

  return { messages, setMessagesdB };
}
