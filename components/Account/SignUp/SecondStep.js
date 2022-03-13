import config from '../../../config';

import React, { useContext, useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import classnames from 'classnames';

import { AUTH_TYPES } from './assets';

import Spinner from '../../_common/Spinner';

import ApiService from '../../../services/api.service.js';

import { AuthContext } from '../../../context/auth';
import { HelperContext } from '../../../context/helper';

const Component = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);
  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [apiName, setApiName] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [authType, setAuthType] = useState('none');
  const [hasFree, setHasFree] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      router.push('/account/signup');
    }
  }, [currentUser, router]);

  const submitForm = useCallback(async () => {
    try {
      if (inProgress) {
        return;
      }
      if (!apiName) {
        return showAlert('Name is required');
      }
      if (!companyName) {
        return showAlert('Company is required');
      }

      setProgress(true);

      await ApiService.createNew({
        name: apiName,
        company: companyName,
        auth_type: authType,
        has_free: authType !== 'none' && hasFree
      });

      showAlert('API is successfully created', true);

      router.push('/settings');
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, [inProgress, apiName, companyName, authType, hasFree, showAlert, router]);

  return (
    <>
      <Head>
        <title>Create API - {config.meta.title}</title>
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
              <h2>Create your first API</h2>
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                submitForm();
              }}
            >
              <div className="field">
                <label htmlFor="apiName">Name</label>
                <input
                  type="text"
                  autoComplete="name"
                  value={apiName}
                  id="apiName"
                  onChange={(e) => setApiName(e.target.value)}
                />
              </div>
              <div className="field">
                <label htmlFor="companyName">Company</label>
                <input
                  type="text"
                  value={companyName}
                  id="companyName"
                  onChange={(e) => setCompanyName(e.target.value)}
                />
              </div>
              <div className="field">
                <label>Authentication Type</label>
                <ul className="tabs">
                  {Object.entries(AUTH_TYPES).map(([key, val]) => (
                    <li
                      key={key}
                      className={classnames({ selected: key === authType })}
                      onClick={() => setAuthType(key)}
                    >
                      {val}
                    </li>
                  ))}
                </ul>
              </div>
              {authType !== 'none' && (
                <div className="box half">
                  <input
                    type="checkbox"
                    checked={hasFree}
                    onChange={(e) => setHasFree(e.target.checked)}
                  />
                  <span>Include a base free tier</span>
                </div>
              )}
              <button type="submit" className="btn gradient-blue">
                Create
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Component;
