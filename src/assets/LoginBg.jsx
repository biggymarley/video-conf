import * as React from "react";
import bgColored from "../assets/bgColored.png";
import bgDark from "../assets/bgDark.png";
const LoginBg = (props) => (
  <div className="absolute w-screen h-screen min-w-[1020px] z-[-1] left-0 top-0">
   <img src={bgColored} alt="background" className="w-full h-full object-cover"/>
  </div>
);
export default LoginBg;
