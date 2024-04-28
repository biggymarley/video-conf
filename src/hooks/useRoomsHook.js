import { useState, useEffect } from "react";
const managementToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTQyODkyNDQsImV4cCI6MTcxNDg5NDA0NCwianRpIjoiZDU1YTZmZTYtOWZiNS00YjVmLWJmNTUtZmNlZWNhMWIzNDMxIiwidHlwZSI6Im1hbmFnZW1lbnQiLCJ2ZXJzaW9uIjoyLCJuYmYiOjE3MTQyODkyNDQsImFjY2Vzc19rZXkiOiI2NjJhZWIyYWEzZjFjNGM2MGY0NjNiNjYifQ.KHKSHBQC6BXvRtRJdVmMygZQQsIhAmTbK02_7gNowPk";

const useRoomsHook = () => {
  const [rooms, setRooms] = useState({});
  const [selectedRoom, setselectedRoom] = useState(null);
  const [roomCodes, setRoomCodes] = useState({});

  const listRooms = async () => {
    const url = "https://api.100ms.live/v2/rooms";
    try {
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${managementToken}`,
        },
      });
      setRooms(await response.json());
    } catch (error) {
      console.error("Error fetching rooms:", error);
      // Handle error here
      // You can throw the error again to handle it in the component level
      console.error(error);
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

  useEffect(() => {
    listRooms();
  }, []);

  return { selectedRoom, rooms, roomCodes, getRoomCodes, setselectedRoom };
};

export default useRoomsHook;
