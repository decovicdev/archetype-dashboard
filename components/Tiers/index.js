import config from "../../config";

import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";

import Spinner from "../_common/Spinner";

import TierService from "../../services/tier.service";

const Component = () => {
  const [inProgress, setProgress] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetch() {
      setProgress(true);

      const response = await TierService.getList();
      setData(response);

      setProgress(false);
    }

    fetch();
  }, []);

  const renderContent = useCallback(() => {
    return data.map((item, i) => {
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
    });
  }, [data]);

  return (
    <div className="page tiers-page">
      <Head>
        <title>Tiers - {config.meta.title}</title>
      </Head>
      {inProgress && <Spinner />}
      <div className={"content"}>
        <div className={"tiers-top-block"}>
          <button type={"button"} className={"btn gradient-pink"}>
            Add a tier
          </button>
        </div>
        <div className={"tiers-list-data"}>{renderContent()}</div>
      </div>
    </div>
  );
};

export default Component;
