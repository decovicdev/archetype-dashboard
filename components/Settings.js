import config from "./../config";

import { useContext, useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import classnames from "classnames";

import Spinner from "./_common/Spinner";

import Analytics from "./../helpers/analytics";
import ApiService from "../services/api.service";

import { AuthContext } from "../context/auth";
import { HelperContext } from "../context/helper";

const Component = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);
  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const [apiKey, setApiKey] = useState(null);
  const [plan, setPlan] = useState(null);

  useEffect(() => {
    async function fetch() {
      const data = await ApiService.getCurrent();
    }

    fetch();
  }, []);

  useEffect(() => {
    const { message, status } = router.query;

    if (message) {
      showAlert(message, status === "success");

      router.replace("/settings");
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

      setLinkSent(true);
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, [currentUser, inProgress, showAlert]);

  const connectStripe = useCallback(async () => {
    try {
      if (inProgress) {
        return;
      }
      setProgress(true);

      const response = await ApiService.stripeCheckout();

      if (!response.connect_url) {
        throw new Error("Oops, could not get enough data to proceed");
      }

      const redirectUrl = `${config.app_url}settings`;

      window.location.replace(
        `${response.connect_url}?return_url=${redirectUrl}&refresh_url=${redirectUrl}`
      );
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, [inProgress, showAlert]);

  return (
    <>
      <Head>
        <title>Settings - {config.meta.title}</title>
      </Head>
      {inProgress && <Spinner />}
      <div className="page settings-page">
        <div className={classnames("content")}>
          <div className="block block-info">
            <div className="block-info-top">
              <h3>Settings</h3>
              <div className="status">
                {currentUser.emailVerified ? (
                  <span className="verified">Verified</span>
                ) : (
                  <span>Unverified</span>
                )}
              </div>
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
            <div className="field">
              <div>
                Your API key: <b>{apiKey}</b>
              </div>
            </div>
            <div className="field">
              <div>
                StartUp plan: <b>{plan}</b>
              </div>
            </div>
          </div>
          <div className={"block-stripe"}>
            <button
              type="button"
              className={"btn gradient-pink small"}
              onClick={connectStripe}
            >
              {" "}
              Connect your Stripe account
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Component;
