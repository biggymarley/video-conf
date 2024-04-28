import { collection, getDocs } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { db } from "../firebase/firebaseConfig";

export default function useMessages() {
  const [messages, setMessages] = useState(null);

  const getMessages = async () => {
    try {
      const messagesRes = await getDocs(collection(db, "messages"));
      let messagesArray = [];
      messagesRes.forEach((docs) => {
        messagesArray = [...messagesArray, docs.data()];
      });
      console.log(messagesRes);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getMessages();
  }, []);
}
