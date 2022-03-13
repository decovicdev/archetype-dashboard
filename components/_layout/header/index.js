import { useContext } from 'react';

import { HelperContext } from '../../../context/helper';
import DesktopHeader from './Desktop';
import MobileHeader from './Mobile';


const Header = () => {
  const _helper = useContext(HelperContext);

  if (_helper.isMobile) {
    return <MobileHeader />;
  }

  return <DesktopHeader />;
};

export default Header;
