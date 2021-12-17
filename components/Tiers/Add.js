import config from "../../config";

import React, { useState, useCallback, useContext } from "react";
import Head from "next/head";

import Spinner from "../_common/Spinner";

import TierService from "../../services/tier.service";

import { HelperContext } from "../../context/helper";
import Link from "next/link";

const Component = () => {
  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [fields, setFields] = useState({
    name: "",
    description: "",
    statementDescriptor: "",
    endpoints: null,
    quota: 0,
    pricingModel: "Standard Pricing",
    price: "0",
    billingPeriod: "Monthly",
    meteredUsage: false,
    meteredUsageBy: "Integer entry for the Quota limit",
    priceDescription: "",
    priceLen: 0,
    priceType: "month",
  });

  const changeField = useCallback(
    (field, value) => {
      const result = { ...fields };
      result[field] = value;
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
        has_trial: true,
        period: fields.billingPeriod,
        currency: "usd",
        quota: billingPeriod.quota,
        trial_time_frame: "month",
        trial_length: 0,
        has_quota: true,
      });

      showAlert("Success", true);
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, [inProgress, showAlert]);

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
              onChange={(e) => changeField("name", e.target.value)}
            />
          </div>
          <div className={"group-fields"}>
            <div className={"field description"}>
              <label>Description</label>
              <textarea
                value={fields.description}
                onChange={(e) => changeField("description", e.target.value)}
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
                changeField("statementDescriptor", e.target.value)
              }
            />
          </div>
          <div className={"field"}>
            <label>Add endpoints</label>
            <select
              selected={fields.endpoints}
              onChange={(e) => changeField("endpoints", e.target.selected)}
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
              onChange={(e) => changeField("quota", e.target.value)}
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
              selected={fields.pricingModel}
              onChange={(e) => changeField("pricingModel", e.target.selected)}
            >
              <option value={"Standart Pricing"}>Standart Pricing</option>
            </select>
          </div>
          <div className={"field"}>
            <label>Price</label>
            <input
              type={"number"}
              value={fields.price}
              onChange={(e) => changeField("price", e.target.value)}
            />
          </div>
          <div className={"field"}>
            <div className={"choose-block"}>
              <button type={"button"} className={"active"}>
                Recuring
              </button>
              <button type={"button"}>One time</button>
            </div>
          </div>
          <div className={"field"}>
            <label>Billing period</label>
            <select
              selected={fields.billingPeriod}
              onChange={(e) => changeField("billingPeriod", e.target.selected)}
            >
              <option value={"Monthly"}>Monthly</option>
            </select>
          </div>
          <div className="box">
            <input
              type="checkbox"
              checked={fields.meteredUsage}
              onChange={(e) => changeField("meteredUsage", e.target.checked)}
            />
            <span>Usage is metered</span>
          </div>
          {!!fields.meteredUsage && (
            <div className={"field"}>
              <label>Charge for metered usage by</label>
              <select
                selected={fields.meteredUsageBy}
                onChange={(e) =>
                  changeField("meteredUsageBy", e.target.selected)
                }
              >
                <option>Integer entry for the Quota limit</option>
              </select>
            </div>
          )}
          <div className={"field"}>
            <label>Price description</label>
            <input
              type={"text"}
              value={fields.priceDescription}
              onChange={(e) => changeField("priceDescription", e.target.value)}
            />
          </div>
          <div className={"field"}>
            <button type={"button"} className={"btn small light-blue"}>
              + Add free trial
            </button>
          </div>
          <div style={{ width: "65%" }} className={"group-fields"}>
            <div className={"field price-len"}>
              <label>Length</label>
              <input
                type={"number"}
                value={fields.priceLen}
                onChange={(e) => changeField("priceLen", e.target.value)}
              />
            </div>
            <div className={"field price-type"}>
              <label>Type</label>
              <select
                selected={fields.priceType}
                onChange={(e) => changeField("priceType", e.target.selected)}
              >
                <option>month</option>
              </select>
            </div>
          </div>
        </form>
        <div className={"line"} />
        <div className={"btns"}>
          <button type={"button"} className={"btn clean-white add-price-btn"}>
            + Add another price
          </button>
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
