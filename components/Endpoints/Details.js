
import { useState, useCallback, useRef, useContext, useEffect } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import config from '../../config';

import Dropdown from '../_common/Dropdown';
import Spinner from '../_common/Spinner';

import EndpointService from '../../services/endpoint.service';

import { HelperContext } from '../../context/helper';
import DeleteModal from './DeleteModal';

const Component = () => {
  const _deleteModal = useRef(null);

  const router = useRouter();

  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetch() {
      try {
        setProgress(true);

        const response = await EndpointService.getById(router.query.endpointId);
        setData(response);
      } catch (e) {
        showAlert(e.message);
      } finally {
        setProgress(false);
      }
    }

    fetch();
  }, [router.query.endpointId, showAlert]);

  const renderContent = useCallback(() => {
    if (!data) {
      return <div className="no-content">Endpoint not found.</div>;
    }

    return (
      <>
        <div className="top-block">
          <h2>{data.name}</h2>
          <Dropdown title={<div className="context-menu-dots" />}>
            <Link href={`/endpoints/edit/${data.uid}`}>
              <a className="edit-btn">Edit</a>
            </Link>
            <button
              type="button"
              className="delete-btn"
              onClick={() => {
                _deleteModal.current?.show();
              }}
            >
              Delete
            </button>
          </Dropdown>
        </div>
        <div className="line" />
        <div className="content-block">
          <h3>Details</h3>
          <div className="field">
            <div className="name">Description</div>
            <div className="value">{data.description}</div>
          </div>
          <div className="field">
            <div className="name">Methods</div>
            <div className="value">{data.allowed_methods?.join(', ')}</div>
          </div>
          <div className="field">
            <div className="name">Path</div>
            <div className="value">{data.path}</div>
          </div>
        </div>
      </>
    );
  }, [_deleteModal, data]);

  return (
    <div className="page endpoints-details-page">
      <Head>
        <title>Endpoint Details - {config.meta.title}</title>
      </Head>
      {inProgress && <Spinner />}
      <div className="content with-lines">
        <div className="bread-crumbs">
          <Link href="/endpoints">
            <a>Endpoints</a>
          </Link>
          <span>{'>'}</span>
          <Link href={router.pathname}>
            <a className="active">Endpoint Details</a>
          </Link>
        </div>
        {renderContent()}
      </div>
      <DeleteModal
        ref={_deleteModal}
        id={router.query.endpointId}
        onSuccess={() => {
          router.push('/endpoints');
        }}
      />
    </div>
  );
};

export default Component;
