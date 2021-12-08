import config from "../../config";
import React, {
  useContext,
  useState,
  useEffect,
  useCallback,
  useRef,
} from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import OpraAgreement from "./OpraAgreement";
import Spinner from "../_common/Spinner";

import UserService from "../../services/user.service.js";

import { AuthContext } from "../../context/auth";
import { HelperContext } from "../../context/helper";

let agreedOpra = false;

const Component = () => {
  const router = useRouter();

  const _opraAgreement = useRef(null);

  const { currentUser } = useContext(AuthContext);
  const { authEmail, setAuthEmail, authPassword, setAuthPassword, showAlert } =
    useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [fullName, setFullname] = useState("");
  const [company, setCompany] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(authPassword);

  useEffect(() => {
    if (currentUser) {
      router.push("/settings");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitForm = useCallback(async () => {
    try {
      if (inProgress) {
        return;
      }
      if (!authEmail) {
        return showAlert("Invalid email address");
      }
      if (!fullName) {
        return showAlert("User name is required");
      }
      if (!authPassword) {
        return showAlert("Empty password");
      }
      if (!confirmPassword) {
        return showAlert("Empty confirmation password");
      }
      if (authPassword !== confirmPassword) {
        return showAlert("Passwords are not equal");
      }
      if (!agreedTerms) {
        return showAlert("Did you read our Terms and Privacy Policy?");
      }
      if (!agreedOpra) {
        return _opraAgreement.current.show();
      }

      setProgress(true);

      await UserService.signUp(authEmail, authPassword, fullName);

      showAlert(
        "We have sent a confirmation email to verify your account",
        true
      );

      setAuthEmail("");
      setAuthPassword("");

      router.push("/settings");
    } catch (e) {
      showAlert(e.message);

      setProgress(false);
    }
  }, [
    authEmail,
    setAuthEmail,
    authPassword,
    setAuthPassword,
    showAlert,
    inProgress,
    agreedTerms,
    agreedOpra,
    fullName,
    confirmPassword,
  ]);

  return (
    <>
      <Head>
        <title>Sign Up - {config.meta.title}</title>
        <meta name="description" content={config.meta.description} />
        <meta name="keywords" content={config.meta.keywords} />
      </Head>
      {inProgress ? <Spinner /> : null}
      <div className="page signup-page">
        <div className="content">
          <div className="info-block">
            <h2>Some text here</h2>
            <ul>
              <li>
                <h3>Item 1</h3>
                <p>Important text here</p>
              </li>
              <li>
                <h3>Item 1</h3>
                <p>Important text here</p>
              </li>
              <li>
                <h3>Item 1</h3>
                <p>Important text here</p>
              </li>
            </ul>
          </div>
          <div className="form-block">
            <div className="top-info">
              <h2>Create your account</h2>
              <p>Sign up to continue.</p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitForm();
              }}
            >
              <div className="field">
                <label htmlFor="userName">Your name</label>
                <input
                  type="text"
                  autoComplete="name"
                  value={fullName}
                  id="userName"
                  onChange={(e) => setFullname(e.target.value)}
                />
              </div>
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
                <label htmlFor="company">
                  Company <span>(optional)</span>
                </label>
                <input
                  type="text"
                  value={company}
                  id="company"
                  onChange={(e) => setCompany(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="userPassword">Password</label>
                <input
                  type="password"
                  autoComplete="new-password"
                  value={authPassword}
                  id="userPassword"
                  onChange={(e) => setAuthPassword(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="confirmUserPassword">Confirm Password</label>
                <input
                  type="password"
                  autoComplete="new-password"
                  value={confirmPassword}
                  id="confirmUserPassword"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="box">
                <input
                  type="checkbox"
                  checked={agreedTerms}
                  onChange={(e) => setAgreedTerms(e.target.checked)}
                />
                <span>
                  By signing, I agree to the{" "}
                  <Link href="/terms-of-service" target="_blank">
                    <a>Terms</a>
                  </Link>{" "}
                  and the{" "}
                  <Link href="/privacy-policy" target="_blank">
                    <a>Privacy Policy</a>
                  </Link>
                  .
                </span>
              </div>
              <button type="submit" className="btn green">
                Sign Up
              </button>
            </form>
            <div className="bottom-info">
              <span>Already have an account?</span>
              <Link href="/account/login">
                <a>Log In</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <OpraAgreement
        ref={_opraAgreement}
        fullName={fullName}
        clickAgree={() => {
          agreedOpra = true;

          submitForm();
        }}
      />
    </>
  );
};

export default Component;
