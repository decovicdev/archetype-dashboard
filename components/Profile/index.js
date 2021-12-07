import config from "../../config";
import { useRef, useContext, useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import classnames from "classnames";

import Spinner from "../_common/Spinner";
import Modal from "../_common/Modal";

import Analytics from "../../helpers/analytics";
import UserService from "../../services/user.service";

import { AuthContext } from "../../context/auth";
import { HelperContext } from "../../context/helper";

const Component = () => {
  const router = useRouter();

  const _deleteAccount = useRef(null);

  const { currentUser } = useContext(AuthContext);
  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  useEffect(() => {
    const { message, status } = router.query;

    if (message) {
      showAlert(message, status === "success");

      router.replace("/profile");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendEmail = useCallback(async () => {
    try {
      Analytics.event({
        action: "click",
        params: { name: "Profile - Verify Email" },
      });

      if (inProgress) {
        return;
      }
      setProgress(true);

      await currentUser.sendEmailVerification();

      showAlert("Verification link sent, please check your mailbox", true);

      setProgress(false);
      setLinkSent(true);
    } catch (e) {
      showAlert(e.message);

      setProgress(false);
    }
  }, [currentUser, inProgress, showAlert]);

  const clickLogout = useCallback(async () => {
    await UserService.logout();

    showAlert("Logged out", true);
  }, [showAlert]);

  const clickDeleteAccount = useCallback(async () => {
    try {
      if (isDeleting) {
        return;
      }
      setDeleting(true);

      await UserService.deleteAccount();

      showAlert("Deleted Account", true);
    } catch (e) {
      showAlert(e.message);

      setDeleting(false);
    }
  }, [isDeleting, showAlert]);

  return (
    <>
      <Head>
        <title>Profile - {config.meta.title}</title>
        <meta name="description" content={config.meta.description} />
        <meta name="keywords" content={config.meta.keywords} />
      </Head>
      {inProgress && <Spinner />}
      <div className="page profile-page">
        <div className={classnames("content")}>
          <div className={"block-start-working"}>
            <Link href="/pricing">
              <a className={"btn green"}>Subscribe</a>
            </Link>
            <Link href="/api-docs">
              <a className={"btn grey"}>API Documentation</a>
            </Link>
          </div>
          <div className="block block-info">
            <div className="block-info-top">
              <h3>Profile</h3>
              <div className="status">
                {currentUser.emailVerified ? (
                  <span className="verified">Verified</span>
                ) : (
                  <span>Unverified</span>
                )}
              </div>
              <button
                type="button"
                className="btn grey small"
                onClick={clickLogout}
              >
                Logout
              </button>
            </div>
            <div className="field email-field">
              <div className="email">{currentUser.email}</div>
              {!currentUser.emailVerified && !linkSent && (
                <button
                  type="button"
                  className="verify-btn"
                  onClick={sendEmail}
                >
                  Resend verification link
                </button>
              )}
            </div>
          </div>
          {currentUser.emailVerified && (
            <div className={"block-delete-account"}>
              <button
                type="button"
                className={"btn red small"}
                onClick={() => {
                  if (_deleteAccount.current) {
                    _deleteAccount.current.show();
                  }
                }}
              >
                {" "}
                Delete Account
              </button>
            </div>
          )}
        </div>
      </div>
      <Modal ref={_deleteAccount} isBusy={isDeleting}>
        <div className="data">
          <h1>Delete Account</h1>
          <p>
            Are you sure you want to delete your account and lose access to all
            of your data?
          </p>
        </div>
        <div className="btns">
          <button
            type="button"
            className="btn grey"
            onClick={() => {
              if (_deleteAccount.current) {
                _deleteAccount.current.hide();
              }
            }}
          >
            No, Cancel
          </button>
          <button
            type="button"
            className="btn green"
            onClick={clickDeleteAccount}
          >
            Yes, Delete
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Component;
