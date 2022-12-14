import { useState, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import classnames from 'classnames';
import config from '../../config';

import Spinner from '../_common/Spinner';

import Analytics from '../../helpers/analytics';

import { useAuth } from '../../context/AuthProvider';
import plans from './plans';

const Component = () => {
  const { currentUser } = useAuth();

  const [inProgress] = useState(false);
  // const [billMonthly] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const renderBlocks = useCallback(
    () =>
      plans.map((item, i) => (
        <div
          key={i}
          className={classnames('plan-block', {
            selected: selectedPlan && selectedPlan.planType === item.planType
          })}
          onClick={() => {
            Analytics.event({
              action: 'click',
              params: {
                name: 'Pricing - Select Plan',
                data: {
                  plan: item.planType
                }
              }
            });

            setSelectedPlan(item);
          }}
        >
          <div className="name">{item.name}</div>
          <div className={classnames('icon', `puzzle-${i}`)} />
          <div className="description">{item.description}</div>
          {!item.mtr && !item.mtrText ? (
            <div className="contact">
              <button type="button">Contact sales &gt;</button>
            </div>
          ) : (
            <>
              <div className="mtr">{item.mtr}</div>
              <div className="mtr-text">{item.mtrText}</div>
            </>
          )}
          {!currentUser && (
            <Link href="/auth/signup">
              <a className="action-btn">Sign Up</a>
            </Link>
          )}
        </div>
      )),
    [currentUser, selectedPlan]
  );

  return (
    <>
      <Head>
        <title>Pricing - {config.meta.title}</title>
        <meta name="description" content={config.meta.description} />
        <meta name="keywords" content={config.meta.keywords} />
      </Head>
      {inProgress && <Spinner />}
      <div className="page pricing-page">
        <div className="content with-lines">
          <div className="top-block">
            <h1>Pricing plans</h1>
          </div>
          <div className="plan-blocks">{renderBlocks()}</div>
        </div>
      </div>
    </>
  );
};

export default Component;
