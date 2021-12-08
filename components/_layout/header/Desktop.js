import { useRef, useContext, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import classnames from "classnames";

import UserService from "../../../services/user.service";

import { AuthContext } from "../../../context/auth";
import { HelperContext } from "../../../context/helper";

const Component = () => {
  const router = useRouter();

  const _header = useRef(null);

  const { currentUser } = useContext(AuthContext);
  const { showAlert } = useContext(HelperContext);

  const updatePostion = useCallback(() => {
    if (!window || !_header.current) {
      return;
    }

    const top =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop ||
      0;

    _header.current.className = top > 20 ? "desktop floating" : "desktop";
  }, [_header]);

  useEffect(() => {
    if (!window) {
      return;
    }

    window.addEventListener("scroll", updatePostion);

    return () => {
      window.removeEventListener("scroll", updatePostion);
    };

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const clickSignOut = useCallback(async () => {
    await UserService.logout();

    showAlert("Logged out", true);
  }, [showAlert]);

  const renderLinks = useCallback(() => {
    return (
      <div className="right-menu">
        {currentUser ? (
          <button type={"button"} className="btn grey" onClick={clickSignOut}>
            Sign Out
          </button>
        ) : (
          <>
            <Link href="/account/signup">
              <a className="btn black">Sign Up</a>
            </Link>
            <Link href="/account/login">
              <a className="btn grey">Login</a>
            </Link>
          </>
        )}
      </div>
    );
  }, [currentUser, clickSignOut]);

  return (
    <header ref={_header} className="desktop">
      <div className="content">
        <Link href="/">
          <a className="logo-link" />
        </Link>
        <div className="left-menu">
          <Link href="/">
            <a
              className={classnames({
                active: router.pathname === "/",
              })}
            >
              Home
            </a>
          </Link>
          <Link href="/api-docs">
            <a
              className={classnames({
                active: router.pathname === "/api-docs",
              })}
            >
              Documentation
            </a>
          </Link>
          <Link href="/pricing">
            <a
              className={classnames({
                active: router.pathname === "/pricing",
              })}
            >
              Pricing
            </a>
          </Link>
          <Link href="/endpoints">
            <a
              className={classnames({
                active: router.pathname === "/endpoints",
              })}
            >
              Endpoints
            </a>
          </Link>
          <Link href="/users">
            <a
              className={classnames({
                active: router.pathname === "/users",
              })}
            >
              Users
            </a>
          </Link>
          <Link href="/settings">
            <a
              className={classnames({
                active: router.pathname === "/settings",
              })}
            >
              Settings
            </a>
          </Link>
        </div>
        {renderLinks()}
      </div>
    </header>
  );
};

export default Component;
