import { useCallback, useEffect, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import config from '../../config';

import DropdownMenu from '../_common/DropdownMenu';
import Spinner from '../_common/Spinner';

import CustomerService from '../../services/customer.service';

import { useHelpers } from '../../context/HelperProvider';
import GenerateKey from './GenerateKey';
import DeleteModal from './DeleteModal';
import useDisclosure from 'hooks/useDisclosure';

const Users = () => {
  const router = useRouter();

  const { showAlert } = useHelpers();

  const [inProgress, setProgress] = useState(false);
  const [data, setData] = useState([]);
  const [searchVal, setSearchVal] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const fetch = useCallback(async () => {
    try {
      setProgress(true);

      const response = await CustomerService.getList();
      setData(response);
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, [showAlert]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  const clickItem = useCallback(
    (e, item) => {
      if (
        e.target.className === 'context-menu-dots' ||
        e.target.parentNode.classList.contains('dropdownMenu') ||
        e.target.parentNode.classList.contains('dropdownMenuContent')
      ) {
        return;
      }

      router.push(`/users/${item.custom_uid}`);
    },
    [router]
  );

  const renderContent = useCallback(() => {
    let list = [...data];

    if (searchVal) {
      list = list.filter(
        (item) =>
          item.attrs?.name.toLowerCase().indexOf(searchVal.toLowerCase()) >= 0
      );
    }

    return (
      <>
        <div className="users-list-header">
          <div className="col">Customer</div>
          <div className="col">API key</div>
          <div className="col">Tier</div>
          <div className="col">Last seen</div>
          <div className="col">Status</div>
        </div>
        <div className="users-list-data">
          {list.map((customer) => (
            <div
              key={customer.custom_uid}
              className="row"
              onClick={(e) => clickItem(e, customer)}
            >
              <div className="col with-long-text">{customer.custom_uid}</div>
              <div className="col with-long-text">{customer.apikey}</div>
              <div className="col with-long-text">
                {customer.tier_id || '-'}
              </div>
              <div className="col">
                {new Date(customer.last_seen * 1000).toLocaleDateString()}
              </div>
              <div className="col">
                {customer.status.replace('_', ' ')}
                <DropdownMenu title={<div className="context-menu-dots" />}>
                  <Link href={`/users/edit/${customer.custom_uid}`}>
                    <a className="edit-btn">Edit</a>
                  </Link>
                  <button
                    type="button"
                    className="generate-key-btn"
                    onClick={() => {
                      setSelectedId(customer.custom_uid);

                      onGKOpen();
                    }}
                  >
                    Reset API key
                  </button>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => {
                      setSelectedId(customer.custom_uid);

                      onOpen();
                    }}
                  >
                    Delete
                  </button>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      </>
    );
  }, [clickItem, data, onGKOpen, onOpen, searchVal]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isGKOpen,
    onOpen: onGKOpen,
    onClose: onGKClose
  } = useDisclosure();

  return (
    <div className="page users-page">
      <Head>
        <title>Users - {config.meta.title}</title>
      </Head>
      {inProgress && <Spinner />}
      <div className="content">
        <div className="header-block">
          <h1>Customers</h1>
          <input
            type="text"
            placeholder="Find customer"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <Link href="/users/add">
            <a className="add-user-btn">Add user</a>
          </Link>
        </div>
        <div className="cards">
          <div className="card">
            <span>Total customers</span>
            <span>0</span>
          </div>
          <div className="card">
            <span>Active trials</span>
            <span>0</span>
          </div>
          <div className="card">
            <span>Active subscriptions</span>
            <span>0</span>
          </div>
          <div className="card">
            <span>Total revenue</span>
            <span>$0</span>
          </div>
        </div>
        {renderContent()}
      </div>
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        id={selectedId}
        onSuccess={() => {
          fetch();
        }}
      />
      <GenerateKey
        isOpen={isGKOpen}
        onClose={onGKClose}
        id={selectedId}
        onSuccess={() => {
          fetch();
        }}
      />
    </div>
  );
};

export default Users;
