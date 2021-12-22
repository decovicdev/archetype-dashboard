import config from "../../config";

import React, { useState, useCallback, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import classnames from "classnames";

import {
  TIME_FRAMES_OPTIONS,
  BILLING_OPTIONS,
  PRICING_MODEL_OPTIONS,
} from "./assets";
import Spinner from "../_common/Spinner";

import TierService from "../../services/tier.service";

import { HelperContext } from "../../context/helper";

const Component = () => {
  const router = useRouter();

  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    description: "",
    quota: 1000,
    pricingModel: 1,
    price: "",
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

      if (!fields.name) {
        return showAlert("Name is required field");
      }
      if (!fields.price) {
        return showAlert("Price is required field");
      }

      setProgress(true);

      await TierService.addNew({
        name: fields.name,
        description: fields.description,
        price: fields.price,
        period: BILLING_OPTIONS[fields.billingPeriod],
        currency: "usd",
        has_quota: fields.meteredUsage && parseInt(fields.quota) > 0,
        quota: fields.meteredUsage ? fields.quota : 0,
        has_trial: fields.hasTrial,
        trial_length: fields.trialLen,
        trial_time_frame: TIME_FRAMES_OPTIONS[fields.trialTimeFrame],
      });

      showAlert("Success", true);

      router.push("/tiers");
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, [inProgress, fields, showAlert]);

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
        <title>Add Product - {config.meta.title}</title>
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
          <div className={"group-fields"}>
            <div className="box half">
              <input
                type="checkbox"
                checked={fields.meteredUsage}
                onChange={(e) => changeFields("meteredUsage", e.target.checked)}
              />
              <span>Usage is metered</span>
            </div>
            {fields.meteredUsage && (
              <div className={"field half"}>
                <label>Quota</label>
                <input
                  type={"number"}
                  value={fields.quota}
                  onChange={(e) => changeFields("quota", e.target.value)}
                />
              </div>
            )}
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
              {Object.entries(PRICING_MODEL_OPTIONS).map(([key, val]) => {
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
              type={"text"}
              value={fields.price}
              onChange={(e) => changeFields("price", e.target.value)}
            />
          </div>
          <div className={"field"}>
            <label>Billing period</label>
            <select
              value={fields.billingPeriod}
              onChange={(e) => changeFields("billingPeriod", e.target.value)}
            >
              {Object.entries(BILLING_OPTIONS).map(([key, val]) => {
                return (
                  <option key={key} value={key}>
                    {val}
                  </option>
                );
              })}
            </select>
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
                  {Object.entries(TIME_FRAMES_OPTIONS).map(([key, val]) => {
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
            className={"btn gradient-blue"}
            onClick={() => submitForm()}
          >
            Create
          </button>
          <Link href={`/tiers`}>
            <a className={"btn clean-white"}>Cancel</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Component;
