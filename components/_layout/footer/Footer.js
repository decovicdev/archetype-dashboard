import config from "../../../config";

import { useContext, useCallback } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import styles from "./footer.module.scss";

import { AuthContext } from "../../../context/auth";
import { HelperContext } from "../../../context/helper";

const Footer = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);
  const { isMobile } = useContext(HelperContext);

  const renderBottomPanel = useCallback(() => {
    if (!isMobile) {
      return null;
    }

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
      <div className="bottom-panel">
        {currentUser ? (
          <Link href="/profile">
            <a className="btn grey">Profile</a>
          </Link>
        ) : (
          actionBtn
        )}
      </div>
    );
  }, [router.pathname, currentUser, isMobile]);

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
