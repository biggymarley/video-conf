import { useState, useEffect } from "react";
function randomColor() {
  return '#' + ('00000' + (Math.random() * 16777216 << 0).toString(16)).substr(-6);
}
const useAuthTokenHook = () => {
  const [accessToken, setaccessToken] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    // Get token from localStorage on component mount
    const storedaccessToken = localStorage.getItem("accessToken");
    const storeduserData = localStorage.getItem("userData");
    if (storedaccessToken) {
      setaccessToken(storedaccessToken);
    }
    if (storeduserData) {
      setUserData(JSON.parse(storeduserData));
    }
  }, []);

  const saveToken = (accessToken, userData) => {
    // Save token to localStorage
    localStorage.setItem("accessToken", accessToken);
    localStorage.setItem("userData", JSON.stringify({...userData, color:randomColor()}));
    setaccessToken(accessToken);
    setUserData({...userData, color:randomColor()});
  };

  const clearToken = () => {
    // Clear token from localStorage
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userData");
    setaccessToken(null);
    setUserData(null);
  };

  return { userData, accessToken, saveToken, clearToken };
};

export default useAuthTokenHook;
