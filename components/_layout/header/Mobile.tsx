import { useRef, useState } from 'react';
import Link from 'next/link';
import classnames from 'classnames';

import Links from './links';

const Component = () => {
  const _header = useRef(null);

  const [menuVisible, setMenuVisible] = useState(false);

  const clickMenuLink = () => {
    setMenuVisible(false);
  };

  return (
    <header ref={_header} className="mobile">
      <Link href="/">
        <a className="logo-link" />
      </Link>
      <nav className={classnames({ open: menuVisible })}>
        <button
          type="button"
          className="burger-btn"
          onClick={() => setMenuVisible(!menuVisible)}
        >
          <div className="stripe" />
          <div className="stripe" />
        </button>
        <div className="nav-block">
          <div className="top-menu">
            <Links onClickItem={clickMenuLink} />
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Component;
