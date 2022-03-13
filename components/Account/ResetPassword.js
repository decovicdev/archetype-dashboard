
import React, { useContext, useState, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import config from '../../config';

import Firebase from '../../firebase.js';

import Spinner from '../_common/Spinner';

import { HelperContext } from '../../context/helper';

const Component = () => {
  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [email, setEmail] = useState('');

  const submitForm = useCallback(async () => {
    try {
      if (inProgress) {
        return;
      }
      if (!email) {
        return showAlert('Email address is required field');
      }
      setProgress(true);

      await Firebase.auth().sendPasswordResetEmail(email);

      showAlert(
        'Your email with password reset hass been sent successfully',
        true
      );

      setProgress(false);
      setEmail('');
    } catch (e) {
      showAlert(e.message);

      setProgress(false);
    }
  }, [showAlert, inProgress, email]);

  return (
    <>
      <Head>
        <title>Reset Password - {config.meta.title}</title>
        <meta name="description" content={config.meta.description} />
        <meta name="keywords" content={config.meta.keywords} />
      </Head>
      {inProgress ? <Spinner /> : null}
      <div className="page login-page">
        <div className="content">
          <div className="form-block">
            <div className="top-info">
              <h2>Forgot Password?</h2>
              <p>Enter the email adress associated with your account below.</p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitForm();
              }}
            >
              <div className="field">
                <label htmlFor="userEmail">Email</label>
                <input
                  type="email"
                  autoComplete="email"
                  value={email}
                  id="userEmail"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <button type="submit" className="btn gradient-blue">
                Send Link
              </button>
            </form>
            <div className="bottom-info">
              <span>Go back to</span>
              <Link href="/account/login">
                <a>Login</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Component;
