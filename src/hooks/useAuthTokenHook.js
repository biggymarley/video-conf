import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebaseConfig";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";

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

  const saveTokenUser = (userData, usersData) => {
    // Save token to localStorage
    console.log(userData);
    localStorage.setItem("userData", JSON.stringify(userData));
    localStorage.setItem("usersData", JSON.stringify(usersData));
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
          localStorage.setItem("userData", JSON.stringify(docSnap.data()));
          // saveTokenUser(docSnap.data());
        } else {
          console.log("noUser");
        }
      });
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  const getUsers = async () => {
    try {
      const users = await getDocs(collection(db, "users"));
      console.log(users)
      let usersArray = [];
      users.forEach((docs) => {
        usersArray = [...usersArray, docs.data()];
      });
      localStorage.setItem("usersData", JSON.stringify(usersArray));
    } catch (error) {
      console.log(error);
      return null;
    }
  };
  useEffect(() => {
    getUser();
    getUsers();
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
