import { useRef, useContext, useEffect, useCallback } from "react";
import Link from "next/link";

import Links from "./links";

import AccountService from "../../../services/account.service";

import { AuthContext } from "../../../context/auth";
import { HelperContext } from "../../../context/helper";

const Component = () => {
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

    _header.current.className = top > 0 ? "desktop floating" : "desktop";
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
    await AccountService.logout();

    showAlert("Logged out", true);
  }, [showAlert]);

  const renderLinks = useCallback(() => {
    return (
      <div className="right-menu">
        {currentUser ? (
          <button
            type={"button"}
            className="btn gradient-pink"
            onClick={clickSignOut}
          >
            Sign Out
          </button>
        ) : (
          <>
            <Link href="/account/signup">
              <a>Sign Up</a>
            </Link>
            <span>|</span>
            <Link href="/account/login">
              <a>Login</a>
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
          <Links />
        </div>
        {renderLinks()}
      </div>
    </header>
  );
};

export default Component;
