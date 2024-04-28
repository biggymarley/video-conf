import { useState, useEffect } from "react";

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

  return { usersData, userData, accessToken, saveToken, clearToken };
};

export default useAuthTokenHook;
