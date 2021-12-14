import { useContext, useCallback } from "react";
import Link from "next/link";

import styles from "./footer.module.scss";

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
  }, [currentUser, isMobile, clickSignOut]);

  return (
    <>
      <footer id="footer" className={styles.footer}>
        <div className={styles.contanier}>
          <div className={styles.main}>
            <p>Some text here.</p>
          </div>
          <div className={styles.links}>
            <div className={styles.block}>
              <div className={styles.title}>Contact Us</div>
            </div>
            <div className={styles.block}>
              <div className={styles.title}>Legal</div>
              <Link href="/privacy-policy">
                <a>Privacy Policy</a>
              </Link>
              <Link href="/terms-of-service">
                <a>Terms of Service</a>
              </Link>
            </div>
          </div>
        </div>
      </footer>
      {renderBottomPanel()}
    </>
  );
};

export default Footer;
