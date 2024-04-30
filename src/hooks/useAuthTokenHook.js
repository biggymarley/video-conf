import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

const useAuthTokenHook = () => {
  const [accessToken, setaccessToken] = useState(null);
  const [userData, setUserData] = useState(null);
  const [usersData, setUsersData] = useState(null);

  useEffect(() => {
    // Get token from localStorage on component mount
    const storedaccessToken = localStorage.getItem("accessToken");
    const storeduserData = localStorage.getItem("userData");
    const storedusersData = localStorage.getItem("usersData");
    if (storedaccessToken) {
      setaccessToken(storedaccessToken);
    }
    if (storeduserData) {
      setUserData(JSON.parse(storeduserData));
    }
    if (storedusersData) {
      setUsersData(JSON.parse(storedusersData));
    }
  }, []);

  const saveTokenUser = (userData) => {
    // Save token to localStorage
    console.log(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem(
      "usersData",
      JSON.stringify(
        usersData.map((user) => {
          if (user.uid === userData.uid) return userData;
          else return user;
        })
      )
    );
    setUserData(userData);
    setUsersData(usersData);
  };

  const saveToken = (accessToken, userData, usersData) => {
    // Save token to localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("usersData", JSON.stringify(usersData));
    setaccessToken(accessToken);
    setUserData(userData);
    setUsersData(usersData);
  };

  const clearToken = () => {
    // Clear token from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    localStorage.removeItem("usersData");
    setaccessToken(null);
    setUserData(null);
    setUsersData(null);
  };
  const getUser = async () => {
    try {
      const auth = getAuth();
      onAuthStateChanged(auth, async (user) => {
        if (user) {
          const docRef = doc(db, "users", user.uid);
          const docSnap = await getDoc(docRef);
          saveTokenUser(docSnap.data());
        } else {
          console.log("noUser");
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  return {
    usersData,
    userData,
    accessToken,
    saveToken,
    clearToken,
    saveTokenUser,
    setUsersData,
    getUser,
  };
};

export default useAuthTokenHook;
