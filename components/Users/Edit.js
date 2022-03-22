import React, { useRef, useState, useEffect, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import config from '../../config';

import Spinner from '../_common/Spinner';
import Modal from '../_common/Modal';

import CustomerService from '../../services/customer.service';

import { useHelpers } from '../../context/HelperProvider';

const Component = () => {
  const _deleteUser = useRef(null);

  const router = useRouter();

  const { showAlert } = useHelpers();

  const [inProgress, setProgress] = useState(false);
  const [fields, setFields] = useState(null);

  useEffect(() => {
    async function fetch() {
      try {
        setProgress(true);

        const response = await CustomerService.getById(router.query.userId);

        setFields({
          email: response.email
        });
      } catch (e) {
        showAlert(e.message);
      } finally {
        setProgress(false);
      }
    }

    fetch();
  }, [router.query.userId, showAlert]);

  const changeFields = useCallback(
    (field, value, obj) => {
      const result = { ...fields };

      if (!field && !value && obj) {
        for (const key in obj) {
          result[key] = obj[key];
        }
      } else {
        result[field] = value;
      }

      setFields(result);
    },
    [fields]
  );

  const saveUser = useCallback(async () => {
    try {
      if (inProgress) {
        return;
      }
      setProgress(true);

      await CustomerService.updateById(router.query.userId, {
        email: fields.email
      });

      showAlert('Success', true);
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, [inProgress, router.query.userId, fields.email, showAlert]);

  const deleteUser = useCallback(async () => {
    try {
      if (inProgress) {
        return;
      }
      setProgress(true);

      await CustomerService.deleteById(router.query.userId);

      showAlert('Success', true);

      router.push('/users');
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, [router, inProgress, showAlert]);

  const renderContent = useCallback(() => {
    if (!fields) {
      return <div className="no-content">Customer not found.</div>;
    }

    return (
      <>
        <div className="top-block">
          <h2>Customer Information</h2>
          <button
            type="button"
            className="delete-btn"
            onClick={() => {
              _deleteUser.current?.show();
            }}
          />
        </div>
        <div className="form">
          <div className="field">
            <label>Email</label>
            <input
              type="text"
              value={fields.email}
              onChange={(e) => changeFields('email', e.target.value)}
            />
          </div>
        </div>
        <div className="line" />
        <div className="btns">
          <button
            type="button"
            className="btn gradient-blue"
            onClick={() => saveUser()}
          >
            Save
          </button>
          <Link href="/users">
            <a className="btn purple-w-border">Cancel</a>
          </Link>
        </div>
      </>
    );
  }, [fields, changeFields, saveUser]);

  return (
    <>
      <div className="page users-edit-page">
        <Head>
          <title>Edit Customer - {config.meta.title}</title>
        </Head>
        {inProgress && <Spinner />}
        <div className="content with-lines">
          <div className="bread-crumbs">
            <Link href="/users">
              <a>Customers</a>
            </Link>
            <span>{'>'}</span>
            <Link href={router.pathname}>
              <a className="active">Edit Customer</a>
            </Link>
          </div>
          {renderContent()}
        </div>
      </div>
      <Modal ref={_deleteUser} title="Delete a customer?">
        <div className="data">
          <p>
            Do you want <span>to delete</span> the customer?
          </p>
        </div>
        <div className="btns">
          <button
            type="button"
            className="half-width action"
            onClick={() => deleteUser()}
          >
            Delete
          </button>
          <button
            type="button"
            className="half-width"
            onClick={() => {
              _deleteUser.current?.hide();
            }}
          >
            Cancel
          </button>
        </div>
      </Modal>
    </>
  );
};

export default Component;
