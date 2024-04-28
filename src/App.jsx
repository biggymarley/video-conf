import { useState } from "react";
import { Toaster } from "sonner";
import "./App.css";
import { Loader } from "./Components/Loader";
// import MainRouter from "./Components/MainRouter";
import { LoadingContext } from "./Context/LoadingContext";
import { UserContext } from "./Context/UserContext";
import useAuthTokenHook from "./hooks/useAuthTokenHook";

function App() {
  const [appLoading, setAppLoading] = useState(false);
  const { accessToken, saveToken, clearToken, userData } = useAuthTokenHook();
  return (
    <LoadingContext.Provider value={{ appLoading, setAppLoading }}>
      <UserContext.Provider value={{ accessToken, saveToken, clearToken , userData}}>
          {appLoading ? (
            <div className="z-50 fixed">
              {/* <Loader /> */}
            </div>
          ) : null}
        <div className="flex min-h-screen bg-bg">
          {/* <MainRouter /> */}
        </div>
        <Toaster richColors={true} position="top-center" />
      </UserContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;
