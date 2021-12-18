import config from "../../config";

import { useState, useEffect, useCallback, useContext } from "react";
import Head from "next/head";
import Link from "next/link";

import Spinner from "../_common/Spinner";

import TierService from "../../services/tier.service";

import { HelperContext } from "../../context/helper";

const Component = () => {
  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetch() {
      try {
        setProgress(true);

        const response = await TierService.getList();
        setData(response);
      } catch (e) {
        showAlert(e.message);
      } finally {
        setProgress(false);
      }
    }

    fetch();
  }, []);

  const renderContent = useCallback(() => {
    if (!data.length) {
      return <div>No products added yet.</div>;
    }

    return (
      <>
        <div className={"tiers-list-header"}>
          <div className={"col"}>Type product</div>
          <div className={"col"}>Price</div>
          <div className={"col"}>Length</div>
          <div className={"col"}>Trial</div>
          <div className={"col"}>Current subscribers</div>
          <div className={"col"}>Quota</div>
        </div>
        <div className={"tiers-list-data"}>
          {data.map((item, i) => {
            return (
              <div key={i} className={"row"}>
                <div className={"col"}>{item.name}</div>
                <div className={"col"}>${item.price}</div>
                <div className={"col"}>{item.trial_length}</div>
                <div className={"col"}>{item.trial_time_frame}</div>
                <div className={"col"}>{item.users.length} users</div>
                <div className={"col"}>{item.quota}/day</div>
                <button type={"button"} className={"dots"} />
              </div>
            );
          })}
        </div>
      </>
    );
  }, [data]);

  return (
    <div className="page tiers-page">
      <Head>
        <title>Products - {config.meta.title}</title>
      </Head>
      {inProgress && <Spinner />}
      <div className={"content"}>
        <div className={"top-block"}>
          <h1>List products</h1>
          <button type={"button"} className={"filter-btn"}>
            Filter
          </button>
          <Link href={"/tiers/add"}>
            <a className={"add-product-btn"}>Add product</a>
          </Link>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Component;
