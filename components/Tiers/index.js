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
      <div className={"tiers-list-data"}>
        {data.map((item, i) => {
          return (
            <div key={i} className={"tiers-list-item"}>
              <div className={"top-content"}>
                <div className={"name"}>Basic</div>
                <button type={"button"} className={"delete-btn"} />
              </div>
              <div className={"bottom-content"}>
                <div className={"price"}>$99</div>
                <div className={"quota"}>
                  Quota: <span>1000/day</span>
                </div>
              </div>
              <Link href={`/tiers/${i}`}>
                <a className={"edit-btn"} />
              </Link>
            </div>
          );
        })}
      </div>
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
          <Link href={"/tiers/add"}>
            <a className={"btn gradient-pink"}>Add product</a>
          </Link>
        </div>
        {renderContent()}
      </div>
    </div>
  );
};

export default Component;
