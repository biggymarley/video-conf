import { useState, useEffect } from "react";
const managementToken =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE3MTQyNDkxMDgsImV4cCI6MTcxNDg1MzkwOCwianRpIjoiYTQ2ZmZkNDktNmM2YS00MWRmLTlkOTgtYzhlZTRiNmMxOGRiIiwidHlwZSI6Im1hbmFnZW1lbnQiLCJ2ZXJzaW9uIjoyLCJuYmYiOjE3MTQyNDkxMDgsImFjY2Vzc19rZXkiOiI2NjA1YWZjNmJhYmMzM2YwMGU0YWI4NjMifQ.ZX_66_mdtr69UuP-QqqhC6d0YFo35mrmxKDywRSwpmk";

const useRoomsHook = () => {
  const [rooms, setRooms] = useState({});
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
      console.log(error);
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
      console.log(error);
      return null;
    }
  };

  useEffect(() => {
    listRooms();
  }, []);

  return { rooms, roomCodes, getRoomCodes };
};

export default useRoomsHook;
