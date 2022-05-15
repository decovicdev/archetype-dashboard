import React, { useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import config from '../../../config';

import Spinner from '../../_common/Spinner';

import { useHelpers } from '../../../context/HelperProvider';
import { useAuth } from '../../../context/AuthProvider';
import { ROUTES } from 'constant/routes';
import { useApi } from 'context/ApiProvider';

const Component = () => {
  const router = useRouter();
  const api = useApi()

  const { currentUser } = useAuth();
  const { authEmail, setAuthEmail, authPassword, setAuthPassword, showAlert } =
    useHelpers();

  const [inProgress, setProgress] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [fullName, setFullname] = useState('');
  const [confirmPassword, setConfirmPassword] = useState(authPassword);

  useEffect(() => {
    if (currentUser) {
      router.push('/settings');
    }
  }, [currentUser, router]);

  const submitForm = useCallback(async () => {
    try {
      if (inProgress) {
        return;
      }
      if (!authEmail) {
        return showAlert('Invalid email address');
      }
      if (!fullName) {
        return showAlert('User name is required');
      }
      if (!authPassword) {
        return showAlert('Empty password');
      }
      if (!confirmPassword) {
        return showAlert('Empty confirmation password');
      }
      if (authPassword !== confirmPassword) {
        return showAlert('Passwords are not equal');
      }
      if (!agreedTerms) {
        return showAlert('Did you read our Terms and Privacy Policy?');
      }

      setProgress(true);

      await api.auth.signUp(authEmail, authPassword, fullName);

      showAlert(
        'We have sent a confirmation email to verify your account',
        true
      );

      setAuthEmail('');
      setAuthPassword('');

      router.push(ROUTES.AUTH.SIGNUP);
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, [
    inProgress,
    authEmail,
    fullName,
    authPassword,
    confirmPassword,
    agreedTerms,
    showAlert,
    setAuthEmail,
    setAuthPassword,
    router
  ]);

  return (
    <>
      <Head>
        <title>Sign Up - {config.meta.title}</title>
      </Head>
      {inProgress ? <Spinner /> : null}
      <div className="page signup-page">
        <div className="content with-lines">
          <div className="info-block">
            <h2>Monetize your API</h2>
            <ul>
              <li>
                <h3>Launch Quickly</h3>
                <p>Create subscriptions and prices without any hassle</p>
              </li>
              <li>
                <h3>Painless</h3>
                <p>
                  {' '}
                  Never worry about invoicing, API key management or your users
                  again.{' '}
                </p>
              </li>
              <li>
                <h3>Run Experiments</h3>
                <p>Iterate quickly on prices and pricing models.</p>
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
                <label htmlFor="userName">Your name</label>
                <input
                  type="text"
                  value={fullName}
                  id="userName"
                  onChange={(e) => setFullname(e.target.value)}
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
                  By signing, I agree to the{' '}
                  <Link href="/terms-of-service" target="_blank">
                    <a>Terms</a>
                  </Link>{' '}
                  and the{' '}
                  <Link href="/privacy-policy" target="_blank">
                    <a>Privacy Policy</a>
                  </Link>
                  .
                </span>
              </div>
              <button type="submit" className="btn gradient-blue">
                Sign Up
              </button>
            </form>
            <div className="bottom-info">
              <span>Already have an account?</span>
              <Link href="/auth/login">
                <a>Log In</a>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Component;
