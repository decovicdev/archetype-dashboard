import config from "../../config";

import React, { useContext, useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import Spinner from "../_common/Spinner";

import AccountService from "../../services/account.service.js";

import { AuthContext } from "../../context/auth";
import { HelperContext } from "../../context/helper";

const Component = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);
  const { authEmail, setAuthEmail, authPassword, setAuthPassword, showAlert } =
    useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);

  useEffect(() => {
    if (currentUser) {
      router.push("/settings");
    }
  }, [currentUser, router]);

  const submitForm = useCallback(
    async (e) => {
      try {
        e.preventDefault();

        if (inProgress) {
          return;
        }
        if (!authEmail) {
          return showAlert("Email address is required field");
        }
        if (!authPassword) {
          return showAlert("Password is required field");
        }
        setProgress(true);

        await AccountService.login(authEmail, authPassword);

        showAlert("Successfuly logged in", true);

        setAuthEmail("");
        setAuthPassword("");

        router.push("/settings");
      } catch (e) {
        showAlert(e.message);

        setProgress(false);
      }
    },
    [
      inProgress,
      authEmail,
      authPassword,
      showAlert,
      setAuthEmail,
      setAuthPassword,
      router,
    ]
  );

  return (
    <>
      <Head>
        <title>Login - {config.meta.title}</title>
      </Head>
      {inProgress ? <Spinner /> : null}
      <div className="page login-page">
        <div className="content with-lines">
          <div className="form-block">
            <div className="top-info">
              <h2>Welcome back</h2>
              <p>Sign in to continue.</p>
            </div>
            <form onSubmit={submitForm}>
              <div className="field">
                <label htmlFor="userEmail">Email</label>
                <input
                  type="email"
                  autoComplete="email"
                  value={authEmail}
                  id="userEmail"
                  onChange={(e) => setAuthEmail(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="userPassword">Password</label>
                <input
                  type="password"
                  autoComplete="current-password"
                  value={authPassword}
                  id="userPassword"
                  onChange={(e) => setAuthPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn gradient-blue">
                Login
              </button>
            </form>
            <div className="bottom-info">
              <span>Don&apos;t have an account?</span>
              <Link href="/account/signup">
                <a>Sign Up</a>
              </Link>
            </div>
            <div className="bottom-info">
              <span>Or</span>
              <Link href="/account/reset-password">
                <a>Forgot Password?</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Component;
