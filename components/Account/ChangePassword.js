import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import config from '../../config';

// import Firebase from '../../firebase.js';

import Spinner from '../_common/Spinner';

import { useHelpers } from '../../context/HelperProvider';

const Component = () => {
  const router = useRouter();

  const { showAlert } = useHelpers();

  const [inProgress, setProgress] = useState(false);
  const [password, setPassword] = useState('');

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

        // await Firebase.auth().verifyPasswordResetCode(oobCode);

        setProgress(false);
      } catch (e) {
        showAlert(e.message);

        setProgress(false);
      }
    }

    checkCode();
  }, [inProgress, router.isReady, router.query, showAlert]);

  const submitForm = useCallback(async () => {
    try {
      const { oobCode } = router.query;
      if (!oobCode) {
        showAlert('Invalid query parameters, please try again from start');
      }

      if (inProgress) {
        return;
      }

      setProgress(true);

      // await Firebase.auth().confirmPasswordReset(oobCode, password);

      showAlert('Password successfully changed', true);

      setProgress(false);
      setPassword('');

      router.push('/auth/login');
    } catch (e) {
      showAlert(e.message);

      setProgress(false);
    }
  }, [router, inProgress, showAlert]);

  return (
    <>
      <Head>
        <title>Change Password - {config.meta.title}</title>
        <meta name="description" content={config.meta.description} />
        <meta name="keywords" content={config.meta.keywords} />
      </Head>
      {inProgress ? <Spinner /> : null}
      <div className="page login-page">
        <div className="content">
          <div className="form-block">
            <div className="top-info">
              <h2>Set New Password</h2>
              <p>Please enter a new password below.</p>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitForm();
              }}
            >
              <div className="field">
                <label htmlFor="userPassword">New Password</label>
                <input
                  type="password"
                  autoComplete="new-password"
                  value={password}
                  id="userPassword"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="btn gradient-blue">
                Save
              </button>
            </form>
            <div className="bottom-info">
              <Link href="/auth/reset-password">
                <a>Go back</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Component;
