import { useContext } from "react";
import { ChatContext } from "../Context/UserContext";
import Menu from "./Menu";

const LiquidSideNav = ({ setActive, active }) => {
  const { isOpen, setIsOpen } = useContext(ChatContext);

  return (
    <Nav
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      active={active}
      setActive={setActive}
    />
  );
};

const Nav = ({ isOpen, setIsOpen, setActive, active }) => {
  return (
    <Menu
      isOpen={isOpen}
      setIsOpen={setIsOpen}
      active={active}
      setActive={setActive}
    />
  );
};

export default LiquidSideNav;
