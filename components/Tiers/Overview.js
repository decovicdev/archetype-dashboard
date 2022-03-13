
import React, {
  useRef,
  useState,
  useEffect,
  useCallback,
  useContext
} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import config from '../../config';

import Spinner from '../_common/Spinner';
import Modal from '../_common/Modal';

import TierService from '../../services/tier.service';

import { HelperContext } from '../../context/helper';

const Component = () => {
  const _deleteProduct = useRef(null);

  const router = useRouter();

  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [fields, setFields] = useState(null);

  useEffect(() => {
    async function fetch() {
      try {
        setProgress(true);

        const response = await TierService.getById(router.query.tierId);

        setFields(response);
      } catch (e) {
        showAlert(e.message);
      } finally {
        setProgress(false);
      }
    }

    fetch();
  }, [router.query.tierId, showAlert]);

  const renderContent = useCallback(() => {
    if (!fields) {
      return <div className="no-content">Product not found.</div>;
    }

    return (
      <>
        <div className="basic-info-block">
          <div className="left-side">
            <div className="pic" />
            <div className="data">
              <div className="name">{fields.name}</div>
              <div className="price">
                ${fields.price} {fields.currency} / <span>{fields.period}</span>
              </div>
            </div>
          </div>
          <div className="right-side">
            <Link href={`/tiers/edit/${router.query.tierId}`}>
              <a className="btn gradient-pink">Edit product</a>
            </Link>
          </div>
          <div className="bottom-side">
            <div className="field">
              <span>Updated:</span>
              <span>{new Date().toLocaleDateString()}</span>
            </div>
          </div>
        </div>
        <h2>Details</h2>
        <div className="details-block">
          <div className="field">
            <span>Name:</span>
            <span>{fields.name}</span>
          </div>
          <div className="field">
            <span>ID:</span>
            <span>{fields.tier_id}</span>
          </div>
          <div className="field">
            <span>Description:</span>
            <span>{fields.description}</span>
          </div>
          <div className="field">
            <span>Trial:</span>
            <span>
              {fields.trial_length} {fields.trial_time_frame}
            </span>
          </div>
        </div>
        <h2>Pricing</h2>
        <div className="pricing-block">
          <div className="field">
            <span>Price:</span>
            <span>
              {!fields.price
                ? `Free`
                : `${fields.price} ${fields.currency} / ${fields.period}`}
            </span>
          </div>
          <div className="field">
            <span>API ID:</span>
            <span className="colored">price_1WQ678SDFkzzzIs54f</span>
            <button type="button" className="delete-btn" />
          </div>
          <div className="field">
            <span>Subscription:</span>
            <span>None</span>
          </div>
          <div className="field">
            <span>Created:</span>
            <span>{new Date().toLocaleDateString()}</span>
          </div>
        </div>
      </>
    );
  }, [fields, router.query.tierId]);

  return (
    <>
      <div className="page tiers-details-page">
        <Head>
          <title>Product Overview - {config.meta.title}</title>
        </Head>
        {inProgress && <Spinner />}
        <div className="content">
          <div className="bread-crumbs">
            <Link href="/tiers">
              <a>Products</a>
            </Link>
            <span>{'>'}</span>
            <Link href={router.pathname}>
              <a className="active">Overview a product</a>
            </Link>
          </div>
          {renderContent()}
        </div>
      </div>
      <Modal ref={_deleteProduct} title="Save product?">
        <div className="data">
          <p>
            Do you want <span>to delete</span> the product?
          </p>
        </div>
        <div className="btns">
          <button
            type="button"
            className="half-width action"
            // onClick={() => {}}
          >
            Delete
          </button>
          <button
            type="button"
            className="half-width"
            onClick={() => {
              _deleteProduct.current?.hide();
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
