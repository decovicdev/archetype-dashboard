import { useRef, useContext, useState, useEffect, useCallback } from 'react';

import { useRouter } from 'next/router';
import Image from 'next/image';
import classnames from 'classnames';
import config from '../config';

import KeyIcon from '../public/icons/key.svg';
import AuthIcon from '../public/icons/auth.svg';
import { HelperContext } from '../context/helper';
import DeleteIcon from './_icons/DeleteIcon';

import Spinner from './_common/Spinner';
import Modal from './_common/Modal';

import ApiService from './../services/api.service';


const AUTH_TYPES = {
  NONE: 'none',
  HEADER: 'header',
  URL: 'url',
  BODY: 'body'
};

const Component = () => {
  const router = useRouter();

  const _deleteAccount = useRef(null);

  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [isDeleting, setDeleting] = useState(false);
  const [data, setData] = useState(null);
  const [authType, setAuthType] = useState('');
  const [redirectUrl, setRedirectUrl] = useState('');
  const [returnUrl, setReturnUrl] = useState('');

  const fetch = useCallback(async () => {
    try {
      setProgress(true);

      const data = await ApiService.getCurrent();

      setData(data);
      setAuthType(data.auth_type);
      setRedirectUrl(data.url);
      setReturnUrl(data.return_url);
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, [showAlert]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  useEffect(() => {
    const { message, status } = router.query;

    if (message) {
      showAlert(message, status === 'success');

      router.replace('/settings');
    }
  }, [router, showAlert]);

  const saveForm = useCallback(async () => {
    try {
      if (inProgress) {
        return;
      }
      setProgress(true);

      ApiService.update({
        auth_type: authType,
        url: redirectUrl,
        return_url: returnUrl
      });

      showAlert('Saved Successfully', true);
    } catch (err) {
      showAlert(err.message);
    } finally {
      setProgress(false);
    }
  }, [showAlert, inProgress, authType, redirectUrl, returnUrl]);

  const connectStripe = useCallback(async () => {
    try {
      if (data?.has_completed_checkout) {
        return showAlert('Stripe already linked');
      }
      if (inProgress) {
        return showAlert('Already in progress');
      }
      setProgress(true);

      const response = await ApiService.stripeCheckout();

      if (!response.connect_url) {
        throw new Error('Oops, could not get enough data to proceed');
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
  }, [inProgress, showAlert, data]);

  const clickDeleteAccount = useCallback(async () => {
    try {
      if (isDeleting) {
        return;
      }
      setDeleting(true);

      showAlert('Not implemented');
    } catch (e) {
      showAlert(e.message);

      setDeleting(false);
    }
  }, [isDeleting, showAlert]);

  const updateAuthType = (e) => {
    setAuthType(e.target.value);
  };

  const renderSensitiveData = useCallback(() => {
    const isBlurred = !data?.has_completed_checkout;

    return (
      <div className="block">
        <Image
          className="icon"
          src={KeyIcon}
          alt="Key"
          width={18}
          height={18}
        />{' '}
        <div>
          <span className={classnames({ blurred: isBlurred })}>
            App ID: {data?.app_id}
          </span>
          <br />
          <br />
          <span className={classnames({ blurred: isBlurred })}>
            Public key: {data?.public_key}
          </span>
          <br />
          <br />
          <span className={classnames({ blurred: isBlurred })}>
            Secret key: {data?.secret_key.join(', ')}
          </span>
        </div>
        {isBlurred && (
          <div className="tip">
            Important! Link your account to Stripe to access your keys
          </div>
        )}
      </div>
    );
  }, [data]);

  return (
    <>
      {inProgress && <Spinner />}
      {renderSensitiveData()}
      <div className="block">
        <Image
          className="icon"
          src={AuthIcon}
          alt="User"
          width={18}
          height={18}
        />{' '}
        Change auth type
        <div className="auth-types">
          <input
            type="radio"
            name="auth_type"
            value={AUTH_TYPES.NONE}
            checked={authType === AUTH_TYPES.NONE}
            onChange={updateAuthType}
            id="noAuth"
          />{' '}
          <label htmlFor="noAuth">No auth</label>
          <br />
          <input
            type="radio"
            name="auth_type"
            value={AUTH_TYPES.URL}
            checked={authType === AUTH_TYPES.URL}
            onChange={updateAuthType}
            id="url"
          />{' '}
          <label htmlFor="url">URL</label>
          <br />
          <input
            type="radio"
            name="auth_type"
            value={AUTH_TYPES.HEADER}
            checked={authType === AUTH_TYPES.HEADER}
            onChange={updateAuthType}
            id="header"
          />{' '}
          <label htmlFor="header">Header</label>
          <br />
          <input
            type="radio"
            name="auth_type"
            value={AUTH_TYPES.BODY}
            checked={authType === AUTH_TYPES.BODY}
            onChange={updateAuthType}
            id="body"
          />{' '}
          <label htmlFor="body">Body</label>
        </div>
      </div>
      <div className="block">
        <Image
          className="icon"
          src={AuthIcon}
          width={18}
          height={18}
          alt="redirect url"
        />{' '}
        Redirect URL
        <div className="form">
          <div className="field">
            <input
              type="text"
              placeholder="URL"
              value={redirectUrl}
              onChange={(e) => setRedirectUrl(e.target.value)}
            />
          </div>
        </div>
      </div>
      <div className="block">
        <Image
          className="icon"
          src={AuthIcon}
          width={18}
          height={18}
          alt="return url"
        />{' '}
        Return URL
        <div className="form">
          <div className="field">
            <input
              type="text"
              placeholder="URL"
              value={returnUrl}
              onChange={(e) => setReturnUrl(e.target.value)}
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
        <button type="button" className="btn gradient-blue" onClick={saveForm}>
          Save
        </button>
        <button
          type="button"
          className="btn gradient-blue"
          onClick={connectStripe}
        >
          {data?.has_completed_checkout
            ? 'Stripe Successfully Linked'
            : 'Connect your stripe account'}
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
