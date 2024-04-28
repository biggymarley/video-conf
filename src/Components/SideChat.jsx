import { useContext } from "react";
import { ChatContext } from "../Context/UserContext";
import Menu from "./Menu";

const LiquidSideNav = () => {
  const { isOpen, setIsOpen } = useContext(ChatContext);

  return (
    <Nav isOpen={isOpen} setIsOpen={setIsOpen} />
  );
};

const Nav = ({ isOpen, setIsOpen }) => {
  return(
    <Menu isOpen={isOpen} setIsOpen={setIsOpen}/>
  )
  
};

export default LiquidSideNav;

