import config from "../../config";

import { useState, useCallback, useContext } from "react";
import Head from "next/head";

import Spinner from "../_common/Spinner";

import TierService from "../../services/tier.service";

import { HelperContext } from "../../context/helper";

const Component = () => {
  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);

  const submitForm = useCallback(async () => {
    try {
      if (inProgress) {
        return;
      }
      setProgress(true);

      await TierService.createNew({
        name: "",
        description: "",
        price: 0,
        has_trial: true,
        period: "month",
        currency: "usd",
        quota: 0,
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
        <div className={"data"}>
          <h1>Add new tier</h1>
          <form
            className={"form"}
            onSubmit={(e) => {
              e.preventDefault();
              submitForm();
            }}
          >
            <div className={"field half"}>
              <label>Name</label>
              <input type={"text"} />
            </div>
            <div className={"field half"}>
              <label>Price</label>
              <input type={"text"} />
            </div>
            <div className={"field"}>
              <label>Description</label>
              <input type={"text"} />
            </div>
            <div className={"field half"}>
              <label>Has trial</label>
              <select>
                <option>yes</option>
                <option>no</option>
              </select>
            </div>
            <div className={"field half"}>
              <label>Period</label>
              <select>
                <option>month</option>
              </select>
            </div>
            <div className={"field half"}>
              <label>Currency</label>
              <select>
                <option>USD</option>
              </select>
            </div>
            <div className={"field half"}>
              <label>Quota</label>
              <input type={"text"} />
            </div>
            <div className={"field half"}>
              <label>Trial time frame</label>
              <select>
                <option>month</option>
              </select>
            </div>
            <div className={"field half"}>
              <label>Trial length</label>
              <select>
                <option>1</option>
              </select>
            </div>
            <div className={"field half"}>
              <label>Has quota</label>
              <select>
                <option>yes</option>
                <option>no</option>
              </select>
            </div>
          </form>
        </div>
        <div className={"btns"}>
          <button type={"submit"} className={"btn light-blue"}>
            Create
          </button>
          <button
            type={"button"}
            className={"btn clean-white"}
            onClick={() => {
              if (_addTier.current) {
                _addTier.current.hide();
              }
            }}
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Component;
