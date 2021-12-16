import config from "../../config";

import { useState, useCallback, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Spinner from "../_common/Spinner";

import TierService from "../../services/tier.service";

const Component = () => {
  const router = useRouter();

  const [inProgress, setProgress] = useState(false);
  const [data, setData] = useState(null);
  const [endpointsList, setEndpointsList] = useState([]);

  useEffect(() => {
    async function fetch() {
      setProgress(true);

      const response = await TierService.getById(router.query.tierId);
      setData(response);

      setProgress(false);
    }

    fetch();
  }, []);

  const onChangeVal = useCallback(
    (key, name, val) => {
      const result = [...endpointsList];
      result[key][name] = val;
      setEndpointsList(result);
    },
    [endpointsList]
  );

  const clickAdd = useCallback(() => {
    const result = [...endpointsList];
    result.push({
      name: "",
      url: "",
    });
    setEndpointsList(result);
  }, [endpointsList]);

  const clickDelete = useCallback(
    (key) => {
      const result = [...endpointsList];
      result.splice(key, 1);
      setEndpointsList(result);
    },
    [endpointsList]
  );

  const renderTable = useCallback(() => {
    return (
      <div className={"endpoints"}>
        <div className={"endpoints-top-block"}>
          <span>Endpoints</span>
          <button type={"button"} className={"add-btn"} onClick={clickAdd} />
        </div>
        <div className={"endpoints-list-data"}>
          {endpointsList.map((item, i) => {
            return (
              <div className={"endpoints-list-item"}>
                <div className={"item-name"}>
                  <input
                    type={"text"}
                    value={item.name}
                    onChange={(e) => onChangeVal(i, "name", e.target.value)}
                  />
                </div>
                <div className={"item-url"}>
                  <input
                    type={"text"}
                    value={item.url}
                    onChange={(e) => onChangeVal(i, "url", e.target.value)}
                  />
                </div>
                <button
                  type={"button"}
                  className={"delete-btn"}
                  onClick={() => clickDelete(i)}
                />
              </div>
            );
          })}
        </div>
      </div>
    );
  }, [endpointsList, clickAdd]);

  const renderContent = useCallback(() => {
    if (!data) {
      return null;
    }

    return (
      <div className={"tier-details-block"}>
        <div className={"name"}>
          <span>Tier name:</span>
          <span>Name</span>
        </div>
        <div className={"price"}>
          <span>Price:</span>
          <span>$0 / month</span>
        </div>
        <div className={"quota"}>
          <span>Quota:</span>
          <span>0 / day</span>
        </div>
        {renderTable()}
      </div>
    );
  }, [data]);

  return (
    <div className="page tiers-details-page">
      <Head>
        <title>Tier Details - {config.meta.title}</title>
      </Head>
      {inProgress && <Spinner />}
      <div className={"content"}>{renderContent()}</div>
    </div>
  );
};

export default Component;
