import { useContext, useCallback } from "react";
import Link from "next/link";

import AccountService from "../../../services/account.service";

import { AuthContext } from "../../../context/auth";
import { HelperContext } from "../../../context/helper";

const Footer = () => {
  const { currentUser } = useContext(AuthContext);
  const { isMobile, showAlert } = useContext(HelperContext);

  const clickSignOut = useCallback(async () => {
    await AccountService.logout();

    showAlert("Logged out", true);
  }, [showAlert]);

  const renderBottomPanel = useCallback(() => {
    if (!isMobile) {
      return null;
    }

    return (
      <div className="bottom-panel">
        {currentUser ? (
          <button type={"button"} className="btn" onClick={clickSignOut}>
            Sign Out
          </button>
        ) : (
          <>
            <Link href="/account/signup">
              <a className="btn">Sign Up</a>
            </Link>
            <Link href="/account/login">
              <a className="btn">Login</a>
            </Link>
          </>
        )}
      </div>
    );
  }, [currentUser, isMobile, clickSignOut]);

  return (
    <>
      <footer id="footer">
        <div className={"top-block"}>
          <div className={"content"}>
            <Link href="/">
              <a className="logo-link" />
            </Link>
            <div className={"nav-links"}>
              <Link href="/privacy-policy">
                <a>Privacy Policy</a>
              </Link>
              <Link href="/terms-of-service">
                <a>Terms of Service</a>
              </Link>
            </div>
            <div className={"socials"}>
              <Link href={"/"}>
                <a className={"twitter"}>Twitter</a>
              </Link>
            </div>
          </div>
        </div>
        <div className={"bottom-block"}>
          <div className={"content"}>
            <div className={"copyright"}>&copy; 2022 Archetype</div>
          </div>
        </div>
      </footer>
      {renderBottomPanel()}
    </>
  );
};

export default Footer;
