const useCheckAuth = () => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken && accessToken.length > 15) return true;
    return false;
  };
  
  export default useCheckAuth;