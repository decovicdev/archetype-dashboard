import { useRef, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import classnames from "classnames";

const Component = () => {
  const router = useRouter();

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
            <Link href="/">
              <a
                className={classnames("btn large", {
                  green: router.pathname === "/",
                })}
                onClick={clickMenuLink}
              >
                Home
              </a>
            </Link>
            <Link href="/api-docs">
              <a
                className={classnames("btn large", {
                  green: router.pathname === "/api-docs",
                })}
                onClick={clickMenuLink}
              >
                Documentation
              </a>
            </Link>
            <Link href="/pricing">
              <a
                className={classnames("btn large", {
                  green: router.pathname === "/pricing",
                })}
                onClick={clickMenuLink}
              >
                Pricing
              </a>
            </Link>
            <Link href="/endpoints">
              <a
                className={classnames("btn large", {
                  green: router.pathname === "/endpoints",
                })}
                onClick={clickMenuLink}
              >
                Endpoints
              </a>
            </Link>
            <Link href="/users">
              <a
                className={classnames("btn large", {
                  green: router.pathname === "/users",
                })}
                onClick={clickMenuLink}
              >
                Users
              </a>
            </Link>
            <Link href="/settings">
              <a
                className={classnames("btn large", {
                  green: router.pathname === "/settings",
                })}
                onClick={clickMenuLink}
              >
                Settings
              </a>
            </Link>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Component;
