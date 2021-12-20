import config from "../../config";

import { useContext, useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import classnames from "classnames";

import Spinner from "../_common/Spinner";

import Analytics from "../../helpers/analytics";

import { AuthContext } from "../../context/auth";
import { HelperContext } from "../../context/helper";

import plans from "./plans";

const Component = () => {
  const router = useRouter();

  const { currentUser } = useContext(AuthContext);
  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [billMonthly] = useState(true);
  const [selectedPlan, setSelectedPlan] = useState({ planType: "free" });

  const renderBlocks = useCallback(() => {
    return plans.map((item, i) => {
      return (
        <div
          key={i}
          className={classnames("plan-block", {
            selected: selectedPlan && selectedPlan.planType === item.planType,
          })}
          onClick={() => {
            Analytics.event({
              action: "click",
              params: {
                name: "Pricing - Select Plan",
                data: {
                  plan: item.planType,
                },
              },
            });

            setSelectedPlan(item);
          }}
        >
          <div className="name">{item.name}</div>
          <div className={classnames("icon", `puzzle-${i}`)} />
          <div className="description">{item.description}</div>
          {!item.mtr && !item.mtrText ? (
            <div className={"contact"}>
              <button type={"button"}>Contact sales ></button>
            </div>
          ) : (
            <>
              <div className="mtr">{item.mtr}</div>
              <div className="mtr-text">{item.mtrText}</div>
            </>
          )}
          {!currentUser ? (
            <Link href="/account/signup">
              <a className={"action-btn"}>Sign Up</a>
            </Link>
          ) : (
            <button type={"button"} className={"action-btn"}>
              Upgrade
            </button>
          )}
        </div>
      );
    });
  }, [currentUser, billMonthly, selectedPlan]);

  return (
    <>
      <Head>
        <title>Pricing - {config.meta.title}</title>
        <meta name="description" content={config.meta.description} />
        <meta name="keywords" content={config.meta.keywords} />
      </Head>
      {inProgress && <Spinner />}
      <div className="page pricing-page">
        <div className="content">
          <div className={"top-block"}>
            <h1>Pricing plans</h1>
          </div>
          <div className="plan-blocks">{renderBlocks()}</div>
        </div>
      </div>
    </>
  );
};

export default Component;
