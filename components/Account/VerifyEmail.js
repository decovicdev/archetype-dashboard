import config from "../../config";

import React, { useContext, useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import UserService from "../../services/user.service.js";

import Spinner from "../_common/Spinner";

import { AuthContext } from "../../context/auth";
import { HelperContext } from "../../context/helper";

const Component = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);
  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);

  useEffect(() => {
    async function checkCode() {
      try {
        if (!router.isReady) {
          return;
        }

        const { oobCode } = router.query;
        if (!oobCode) {
          return;
        }

        if (inProgress) {
          return;
        }
        setProgress(true);

        await UserService.verifyEmail(oobCode);

        showAlert("Your email is now verified", true);

        const tier = localStorage.getItem("selectedTier");
        if (tier) {
          localStorage.removeItem("selectedTier");

          router.push(`/pricing?tier=${tier}`);
        }
      } catch (e) {
        showAlert(e.message);
      } finally {
        setProgress(false);
      }
    }

    checkCode();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query]);

  return (
    <>
      <Head>
        <title>Verify Email - {config.meta.title}</title>
        <meta name="description" content={config.meta.description} />
        <meta name="keywords" content={config.meta.keywords} />
      </Head>
      {inProgress && <Spinner />}
      <div className="page verify-email">
        <div className="content">
          <div className="form-block">
            <div className="top-info">
              <h2>Verify Email</h2>
            </div>
            <div className="bottom-info">
              <span>Go back to</span>
              {currentUser ? (
                <Link href="/settings">
                  <a>Profile</a>
                </Link>
              ) : (
                <Link href="/account/login">
                  <a>Login</a>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Component;
