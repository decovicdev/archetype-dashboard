import { useState, useCallback, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import config from '../../config';

import DropdownMenu from '../_common/DropdownMenu';
import Spinner from '../_common/Spinner';

import CustomerService from '../../services/customer.service';

import { useHelpers } from '../../context/HelperProvider';
import DeleteModal from './DeleteModal';
import useDisclosure from 'hooks/useDisclosure';

const Component = () => {
  const router = useRouter();

  const { showAlert } = useHelpers();

  const [inProgress, setProgress] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetch() {
      try {
        setProgress(true);

        const response = await CustomerService.getById(router.query.userId);
        setData(response);
      } catch (e) {
        showAlert(e.message);
      } finally {
        setProgress(false);
      }
    }

    fetch();
  }, [router.query.userId, showAlert]);

  const renderContent = useCallback(() => {
    if (!data) {
      return <div className="no-content">Customer not found.</div>;
    }

    return (
      <>
        <div className="top-block">
          <h2>Customer Profile</h2>
          <DropdownMenu title={<div className="context-menu-dots" />}>
            <Link href={`/users/edit/${data.custom_uid}`}>
              <a className="edit-btn">Edit</a>
            </Link>
            <button type="button" className="delete-btn" onClick={onOpen}>
              Delete
            </button>
          </DropdownMenu>
        </div>
        <div className="line" />
        <div className="content-block">
          <h3>Customer details</h3>
          <div className="profile-pic" />
          <div className="field">
            <div className="name">App User ID</div>
            <div className="value">{data.custom_uid}</div>
          </div>
          <div className="field">
            <div className="name">Name</div>
            <div className="value">{data.attrs?.name}</div>
          </div>
          <div className="field">
            <div className="name">Email</div>
            <div className="value">{data.email}</div>
          </div>
          {data.tier_id && (
            <div className="field">
              <div className="name">Tier</div>
              <div className="value">
                <Link href={`/tiers/${data.tier_id}`}>{data.tier_id}</Link>
              </div>
            </div>
          )}
          <div className="field">
            <div className="name">Last Seen</div>
            <div className="value">
              {new Date(data.last_seen * 1000).toLocaleDateString()}
            </div>
          </div>
        </div>
        <div className="line" />
        <h3>Customer history</h3>
      </>
    );
  }, [data, onOpen]);

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <div className="page users-details-page">
      <Head>
        <title>Customer Information - {config.meta.title}</title>
      </Head>
      {inProgress && <Spinner />}
      <div className="content with-lines">
        <div className="bread-crumbs">
          <Link href="/users">
            <a>Customers</a>
          </Link>
          <span>{'>'}</span>
          <Link href={router.pathname}>
            <a className="active">Customer Profile</a>
          </Link>
        </div>
        {renderContent()}
      </div>
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        id={router.query.userId}
        onSuccess={() => {
          router.push('/users');
        }}
      />
    </div>
  );
};

export default Component;
