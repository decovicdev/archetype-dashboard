import config from "../../config";

import React, { useState, useCallback, useContext } from "react";
import Head from "next/head";

import Spinner from "../_common/Spinner";

import TierService from "../../services/tier.service";

import { HelperContext } from "../../context/helper";
import Link from "next/link";

const timeFrames = {
  DAY: "day",
  MINUTE: "minute",
  HOUR: "hour",
  SECOND: "second",
  WEEK: "week",
  MONTH: "month",
  YEAR: "year",
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
    pricingModel: "Standard Pricing",
    price: 0,
    billingPeriod: "Monthly",
    meteredUsage: false,
    meteredUsageBy: "Integer entry for the Quota limit",
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
        price: fields.price,
        period: fields.billingPeriod,
        currency: "usd",
        has_quota: parseInt(fields.billingPeriod.quota) > 0,
        quota: fields.billingPeriod.quota,
        has_trial: fields.hasTrial,
        trial_length: fields.trialLen,
        trial_time_frame: fields.trialTimeFrame,
      });

      showAlert("Success", true);
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, [inProgress, showAlert]);

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
        <form
          className={"form"}
          onSubmit={(e) => {
            e.preventDefault();
            submitForm();
          }}
        >
          <h2>Product Information</h2>
          <div className={"field"}>
            <label>Name</label>
            <input
              type={"text"}
              value={fields.name}
              onChange={(e) => changeFields("name", e.target.value)}
            />
          </div>
          <div className={"group-fields"}>
            <div className={"field description"}>
              <label>Description</label>
              <textarea
                value={fields.description}
                onChange={(e) => changeFields("description", e.target.value)}
              />
            </div>
            <div className={"field image"}>
              <label>Image</label>
              <div className={"upload"}>
                <span>Upload</span>
              </div>
            </div>
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
          <div className={"line"} />
          <h2>Price Information</h2>
          <h3>Pricing details</h3>
          <div className={"field"}>
            <label>Pricing model</label>
            <select
              value={fields.pricingModel}
              onChange={(e) => changeFields("pricingModel", e.target.selected)}
            >
              <option value={"Standart Pricing"}>Standart Pricing</option>
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
              <option value={"Monthly"}>Monthly</option>
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
          {!!fields.meteredUsage && (
            <div className={"field"}>
              <label>Charge for metered usage by</label>
              <select
                value={fields.meteredUsageBy}
                onChange={(e) =>
                  changeFields("meteredUsageBy", e.target.selected)
                }
              >
                <option>Integer entry for the Quota limit</option>
              </select>
            </div>
          )}
          <div className={"field"}>
            <button
              type={"button"}
              className={"btn small light-blue"}
              onClick={clickAddTrial}
            >
              + Add free trial
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
        </form>
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
