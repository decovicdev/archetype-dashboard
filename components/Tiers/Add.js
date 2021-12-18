import config from "../../config";

import React, { useState, useCallback, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import classnames from "classnames";

import Spinner from "../_common/Spinner";

import TierService from "../../services/tier.service";

import { HelperContext } from "../../context/helper";

const timeFrames = {
  DAY: "day",
  MINUTE: "minute",
  HOUR: "hour",
  SECOND: "second",
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",
};

const billingOptions = {
  MONTH: "month",
  YEAR: "year",
};

const pricingModelOptions = {
  1: "Subscription",
  2: "Pay as you go",
};

const Component = () => {
  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    description: "",
    statementDescriptor: "",
    endpoints: "",
    quota: 0,
    pricingModel: 1,
    price: 0,
    billingPeriod: "MONTH",
    meteredUsage: false,
    hasTrial: false,
    trialLen: 0,
    trialTimeFrame: null,
  });

  const changeFields = useCallback(
    (field, value, obj) => {
      const result = { ...fields };

      if (!field && !value && obj) {
        for (let key in obj) {
          result[key] = obj[key];
        }
      } else {
        result[field] = value;
      }

      setFields(result);
    },
    [fields]
  );

  const submitForm = useCallback(async () => {
    try {
      if (inProgress) {
        return;
      }
      setProgress(true);

      await TierService.createNew({
        name: fields.name,
        description: fields.description,
        price: parseInt(fields.price),
        period: billingOptions[fields.billingPeriod],
        currency: "usd",
        has_quota: parseInt(fields.quota) > 0,
        quota: fields.quota,
        has_trial: fields.hasTrial,
        trial_length: fields.trialLen,
        trial_time_frame: timeFrames[fields.trialTimeFrame],
      });

      showAlert("Success", true);

      router.push("/tiers");
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, [timeFrames, billingOptions, inProgress, showAlert]);

  const clickAddTrial = useCallback(() => {
    if (fields.hasTrial) {
      changeFields(null, null, {
        hasTrial: false,
        trialLen: 0,
        trialTimeFrame: null,
      });
    } else {
      changeFields(null, null, {
        hasTrial: true,
        trialLen: 1,
        trialTimeFrame: "MONTH",
      });
    }
  }, [fields, changeFields]);

  return (
    <div className="page tiers-add-page">
      <Head>
        <title>Edit Tier - {config.meta.title}</title>
      </Head>
      {inProgress && <Spinner />}
      <div className={"content"}>
        <div className={"bread-crumbs"}>
          <Link href={"/tiers"}>
            <a>Products</a>
          </Link>
          <span>{">"}</span>
          <Link href={"/tiers/add"}>
            <a className={"active"}>Add Product</a>
          </Link>
        </div>
        <div className={"form"}>
          <h2>Product Information</h2>
          <div className={"field"}>
            <label>Name</label>
            <input
              type={"text"}
              value={fields.name}
              onChange={(e) => changeFields("name", e.target.value)}
            />
          </div>
          <div className={"field description"}>
            <label>Description</label>
            <textarea
              value={fields.description}
              onChange={(e) => changeFields("description", e.target.value)}
            />
          </div>
          <div className={"field"}>
            <label>Statement Descriptor</label>
            <input
              type={"text"}
              value={fields.statementDescriptor}
              onChange={(e) =>
                changeFields("statementDescriptor", e.target.value)
              }
            />
          </div>
          <div className={"field"}>
            <label>Add endpoints</label>
            <select
              value={fields.endpoints}
              onChange={(e) => changeFields("endpoints", e.target.selected)}
            >
              <option value={"All"}>All</option>
              <option value={"None"}>None</option>
              <option value={"Other"}>Other</option>
            </select>
          </div>
          <div className={"field"}>
            <label>Quota</label>
            <input
              type={"number"}
              value={fields.quota}
              onChange={(e) => changeFields("quota", e.target.value)}
            />
          </div>
          <div className={"some-space"} />
          <div className={"add-options"}>
            <button type={"button"}>Additional options {">"}</button>
          </div>
        </div>
        <div className={"line"} />
        <div className={"form"}>
          <h2>Price Information</h2>
          <h3>Pricing details</h3>
          <div className={"field"}>
            <label>Pricing model</label>
            <select
              value={fields.pricingModel}
              onChange={(e) => changeFields("pricingModel", e.target.selected)}
            >
              {Object.entries(pricingModelOptions).map(([key, val]) => {
                return (
                  <option key={key} value={key}>
                    {val}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={"field"}>
            <label>Price</label>
            <input
              type={"number"}
              value={fields.price}
              onChange={(e) => changeFields("price", e.target.value)}
            />
          </div>
          <div className={"field"}>
            <label>Billing period</label>
            <select
              value={fields.billingPeriod}
              onChange={(e) => changeFields("billingPeriod", e.target.selected)}
            >
              {Object.entries(billingOptions).map(([key, val]) => {
                return (
                  <option key={key} value={key}>
                    {val}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="box">
            <input
              type="checkbox"
              checked={fields.meteredUsage}
              onChange={(e) => changeFields("meteredUsage", e.target.checked)}
            />
            <span>Usage is metered</span>
          </div>
          <div className={"field"}>
            <button
              type={"button"}
              className={classnames("btn small", {
                "light-blue": !fields.hasTrial,
                "gradient-pink": fields.hasTrial,
              })}
              onClick={clickAddTrial}
            >
              {fields.hasTrial ? "- Remove" : "+ Add"} free trial
            </button>
          </div>
          {fields.hasTrial && (
            <div style={{ width: "65%" }} className={"group-fields"}>
              <div className={"field price-len"}>
                <label>Length</label>
                <input
                  type={"number"}
                  value={fields.trialLen}
                  onChange={(e) => changeFields("trialLen", e.target.value)}
                />
              </div>
              <div className={"field price-type"}>
                <label>Type</label>
                <select
                  value={fields.trialTimeFrame}
                  onChange={(e) =>
                    changeFields("trialTimeFrame", e.target.selected)
                  }
                >
                  {Object.entries(timeFrames).map(([key, val]) => {
                    return (
                      <option key={key} value={key}>
                        {val}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>
          )}
        </div>
        <div className={"line"} />
        <div className={"btns"}>
          <button
            type={"button"}
            className={"btn light-blue"}
            onClick={() => submitForm()}
          >
            Create
          </button>
          <button type={"button"} className={"btn clean-white"}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Component;
