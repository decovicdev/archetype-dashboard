import { useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import AccountVerifiedIcon from "../public/icons/account-verified.svg";
import AccountUnverifiedIcon from "../public/icons/account-unverified.svg";

import EditIcon from "./_icons/EditIcon";

import Spinner from "./_common/Spinner";

import Analytics from "./../helpers/analytics";

import { AuthContext } from "../context/auth";
import { HelperContext } from "../context/helper";

const Component = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);
  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [linkSent, setLinkSent] = useState(false);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(currentUser.displayName);
  const [email, setEmail] = useState(currentUser.email);
  const [password, setPassword] = useState("");

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

  const onSave = async () => {
    setProgress(true);
    try {
      const data = {};
      if (currentUser.displayName !== name) data.displayName = name;
      if (currentUser.email !== email) data.email = email;
      if (currentUser.password !== password) data.password = password;
      await updateUser(data);
      setPassword("");
      setIsEditing(false);
      showAlert("Saved Successfully", true);
    } catch (err) {
      showAlert(err.message);
    }
    setProgress(false);
  };

  return (
    <>
      {inProgress && <Spinner />}

      <div className="block">
        <Image
          className={"icon"}
          src={
            currentUser.emailVerified
              ? AccountVerifiedIcon
              : AccountUnverifiedIcon
          }
          alt="Key"
          width={18}
          height={18}
        />{" "}
        Status account:
        {currentUser.emailVerified ? (
          <span className="badge success">Verified</span>
        ) : (
          <>
            <span className="badge error">Not verified</span>{" "}
            <a className="link">Send an email to verify</a>
          </>
        )}
      </div>

      <div className="block">
        Information{" "}
        <a onClick={() => setIsEditing(!isEditing)} className="editing">
          <EditIcon gradient={isEditing} fill="#ffffff" />
        </a>
        <br />
        <form className="form">
          <div className="field">
            <label htmlFor="userName">Name</label>
            <input
              type="text"
              value={name}
              id="userName"
              placeholder="Name"
              disabled={!isEditing}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="userEmail">Email</label>
            <input
              type="email"
              autoComplete="email"
              value={email}
              id="userEmail"
              placeholder="Email"
              disabled={!isEditing}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              id="password"
              placeholder="Password"
              disabled={!isEditing}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
        </form>
      </div>

      <div className="btns">
        <button
          className="btn gradient-blue"
          disabled={!isEditing}
          onClick={onSave}
        >
          Save
        </button>
        <button className="btn border-white">Cancel</button>
      </div>
    </>
  );
};

export default Component;
