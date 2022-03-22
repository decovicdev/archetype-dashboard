import { useHelpers } from '../../../context/HelperProvider';
import DesktopHeader from './Desktop';
import MobileHeader from './Mobile';

const Header = () => {
  const { isMobile } = useHelpers();

  if (isMobile) {
    return <MobileHeader />;
  }

  return <DesktopHeader />;
};

export default Header;
