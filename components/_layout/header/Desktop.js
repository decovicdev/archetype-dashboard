import config from "../../../config";

import { useRef, useContext, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import classnames from "classnames";

import { AuthContext } from "../../../context/auth";

const Component = (props) => {
  const router = useRouter();

  const _header = useRef(null);

  const { currentUser } = useContext(AuthContext);

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

  const renderLinks = useCallback(() => {
    let actionBtn = (
      <Link href="/account/signup">
        <a className="btn grey">Sign Up</a>
      </Link>
    );
    if (router.pathname === "/account/signup") {
      actionBtn = (
        <Link href="/account/login">
          <a className="btn grey">Login</a>
        </Link>
      );
    }

    return (
      <div className="right-menu">
        {currentUser ? (
          <Link href="/profile">
            <a className="btn grey">Profile</a>
          </Link>
        ) : (
          actionBtn
        )}
      </div>
    );
  }, [router.pathname, currentUser]);

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
