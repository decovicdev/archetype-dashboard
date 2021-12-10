import { useContext } from "react";

import DesktopHeader from "./Desktop";
import MobileHeader from "./Mobile";

import { HelperContext } from "../../../context/helper";

const Header = () => {
  const _helper = useContext(HelperContext);

  if (_helper.isMobile) {
    return <MobileHeader />;
  }

  return <DesktopHeader />;
};

export default Header;
