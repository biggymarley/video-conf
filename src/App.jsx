import { useState } from "react";
import "./App.css";
import Login from "./Components/Login";
import useAuthTokenHook from "./hooks/useAuthTokenHook";
import { LoadingContext } from "./Context/LoadingContext";
import { UserContext } from "./Context/UserContext";
import { Loader } from "./Components/Loader";
import { Toaster } from "sonner";
import MainRouter from "./Components/MainRouter";

function App() {
  const [appLoading, setAppLoading] = useState(false);
  const { accessToken, saveToken, clearToken, userData } = useAuthTokenHook();
  return (
    <LoadingContext.Provider value={{ appLoading, setAppLoading }}>
      <UserContext.Provider value={{ accessToken, saveToken, clearToken , userData}}>
          {appLoading ? (
            <div className="z-50 fixed">
              <Loader />
            </div>
          ) : null}
        <div className="App bg-bg">
          <MainRouter />
        </div>
        <Toaster richColors={true} position="top-center" />
      </UserContext.Provider>
    </LoadingContext.Provider>
  );
}

export default App;
