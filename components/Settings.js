import { useRef, useContext, useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

import KeyIcon from "../public/icons/key.svg";
import AuthIcon from "../public/icons/auth.svg";
import DeleteIcon from "./_icons/DeleteIcon";

import Spinner from "./_common/Spinner";
import Modal from "./_common/Modal";

import Analytics from "./../helpers/analytics";
import ApiService from "./../services/api.service";

import { AuthContext } from "../context/auth";
import { HelperContext } from "../context/helper";

const AUTH_TYPES = {
  NONE: "none",
  HEADER: "header",
  URL: "url",
  BODY: "body",
};

const Component = () => {
  const router = useRouter();

  const _deleteAccount = useRef(null);

  const { currentUser } = useContext(AuthContext);
  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [linkSent, setLinkSent] = useState(false);
  const [data, setData] = useState(null);
  const [auth_type, setAuthType] = useState("");
  const [url, setRedirectUrl] = useState("");

  useEffect(() => {
    async function fetch() {
      const data = await ApiService.getCurrent();

      if (data?.public_key) {
        setData(data);
        setAuthType(data.auth_type);
        setRedirectUrl(data.url);
      }
    }

    fetch();
  }, []);

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

  const clickDeleteAccount = useCallback(async () => {
    try {
      if (isDeleting) {
        return;
      }
      setDeleting(true);

      sshowAlert("Not implemented");
    } catch (e) {
      showAlert(e.message);

      setDeleting(false);
    }
  }, [isDeleting, showAlert]);

  const updateAuthType = (e) => {
    setAuthType(e.target.value);
  };

  const updateRedirectUrl = (e) => {
    setRedirectUrl(e.target.value);
  };

  const onSave = async () => {
    setProgress(true);
    try {
      const data = await ApiService.updateCurrent({
        auth_type,
        url,
      });
      if (data.public_key) {
        setData(data);
        showAlert("Saved Successfully", true);
      }
    } catch (err) {
      showAlert("Failed to save");
    }
    setProgress(false);
  };

  return (
    <>
      {inProgress && <Spinner />}

      <div className="block">
        <Image
          className={"icon"}
          src={KeyIcon}
          alt="Key"
          width={18}
          height={18}
        />{" "}
        <div>
          <span>App ID: {data?.app_id}</span>
          <br />
          <br />
          <span>Public key: {data?.public_key}</span>
          <br />
          <br />
          <span>Secret key: {data?.secret_key.join(", ")}</span>
        </div>
      </div>

      <div className="block">
        <Image
          className={"icon"}
          src={AuthIcon}
          alt="User"
          width={18}
          height={18}
        />{" "}
        Change auth type
        <div className="auth-types">
          <input
            type="radio"
            name="auth_type"
            value={AUTH_TYPES.NONE}
            checked={auth_type === AUTH_TYPES.NONE}
            onChange={updateAuthType}
            id="noAuth"
          />{" "}
          <label htmlFor="noAuth">No auth</label>
          <br />
          <input
            type="radio"
            name="auth_type"
            value={AUTH_TYPES.URL}
            checked={auth_type === AUTH_TYPES.URL}
            onChange={updateAuthType}
            id="url"
          />{" "}
          <label htmlFor="url">URL</label>
          <br />
          <input
            type="radio"
            name="authType"
            value={"Header"}
            name="auth_type"
            value={AUTH_TYPES.HEADER}
            checked={auth_type === AUTH_TYPES.HEADER}
            onChange={updateAuthType}
            id="header"
          />{" "}
          <label htmlFor="header">Header</label>
          <br />
          <input
            type="radio"
            name="auth_type"
            value={AUTH_TYPES.BODY}
            checked={auth_type === AUTH_TYPES.BODY}
            onChange={updateAuthType}
            id="body"
          />{" "}
          <label htmlFor="body">Body</label>
        </div>
      </div>

      <div className="block">
        <Image
          className={"icon"}
          src={AuthIcon}
          alt="User"
          width={18}
          height={18}
        />{" "}
        Redirect URL
        <div className="form">
          <div className="field">
            <input
              type="text"
              placeholder="URL"
              value={url}
              id="url"
              onChange={updateRedirectUrl}
            />
          </div>
        </div>
      </div>

      <div className="block">
        <DeleteIcon gradient />
        <a
          onClick={() => {
            if (_deleteAccount.current) {
              _deleteAccount.current.show();
            }
          }}
        >
          Delete App
        </a>
      </div>

      <div className="btns">
        <button
          type={"button"}
          className={"btn gradient-blue"}
          disabled={auth_type === data?.auth_type && url === data?.url}
          onClick={onSave}
        >
          Save
        </button>

        <button type="button" className="btn gradient-blue">
          Connect your stripe account
        </button>
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
            className="btn gradient-pink"
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
