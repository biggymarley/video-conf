import { useState, useEffect } from "react";
import { getRooms, UploadRoomLogo } from "../firebase/userManagment";
import { toast } from "sonner";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
const managementToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTQyODkyNDQsImV4cCI6MTcxNDg5NDA0NCwianRpIjoiZDU1YTZmZTYtOWZiNS00YjVmLWJmNTUtZmNlZWNhMWIzNDMxIiwidHlwZSI6Im1hbmFnZW1lbnQiLCJ2ZXJzaW9uIjoyLCJuYmYiOjE3MTQyODkyNDQsImFjY2Vzc19rZXkiOiI2NjJhZWIyYWEzZjFjNGM2MGY0NjNiNjYifQ.KHKSHBQC6BXvRtRJdVmMygZQQsIhAmTbK02_7gNowPk";

const useRoomsHook = () => {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setselectedRoom] = useState(null);
  const [roomCodes, setRoomCodes] = useState({});

  const createRooms = async (roomName, roomLogo) => {
    try {
      const response = await fetch("https://api.100ms.live/v2/rooms", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${managementToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: roomName,
          description: "This is a test room",
          template_id: "662dfc6ab644c98edca37b91",
        }),
      });
      const res = await response.json();
      const roomcodes = await fetch(
        `https://api.100ms.live/v2/room-codes/room/${res.id}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${managementToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log("res", res);
      console.log("res", roomcodes);
      const logoUrl = await UploadRoomLogo(res.id, roomLogo.file);
      const room = {
        id: res.id,
        label: roomName,
        logoUrl: logoUrl,
      };
      await setDoc(doc(db, "rooms", res.id), room);
      setRooms([...rooms, room]);
      toast.success("Room Created successfully");
    } catch (error) {
      console.log(error);
      toast.error("Server error, Please contact Biggy");
    }
  };

  const getRoomCodes = async (roomid) => {
    const url = `https://api.100ms.live/v2/room-codes/room/${roomid}`;
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${managementToken}`,
        },
      });
      const codes = await response.json();
      console.log("codes", codes);
      setRoomCodes({ viwer: codes.data[0].code, host: codes.data[1].code });
      return { viwer: codes.data[0].code, host: codes.data[1].code };
    } catch (error) {
      console.error("Error fetching rooms:", error);
      // Handle error here
      // You can throw the error again to handle it in the component level
      console.error(error);
      return null;
    }
  };

  const listRooms = async () => {
    const url = "https://api.100ms.live/v2/rooms?enabled=true";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${managementToken}`,
        },
      });
      console.log(await response.json());
    } catch (error) {
      console.error("Error fetching rooms:", error);
      // Handle error here
      // You can throw the error again to handle it in the component level
      console.error(error);
    }
  };

  const fetchRooms = async () => {
    const res = await getRooms();
    setRooms([...res]);
  };
  useEffect(() => {
    listRooms();
    fetchRooms();
  }, []);

  return {
    selectedRoom,
    rooms,
    roomCodes,
    getRoomCodes,
    setselectedRoom,
    createRooms,
  };
};

export default useRoomsHook;
