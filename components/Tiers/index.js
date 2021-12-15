import config from "../../config";

import { useRef, useState, useEffect, useCallback, useContext } from "react";
import Head from "next/head";
import Link from "next/link";

import Spinner from "../_common/Spinner";
import Modal from "../_common/Modal";

import TierService from "../../services/tier.service";

import { HelperContext } from "../../context/helper";

const Component = () => {
  const _addTier = useRef();

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
      return <div>No tiers added yet.</div>;
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
        <title>Tiers - {config.meta.title}</title>
      </Head>
      {inProgress && <Spinner />}
      <div className={"content"}>
        <div className={"top-block"}>
          <button
            type={"button"}
            className={"btn gradient-pink"}
            onClick={() => {
              if (_addTier.current) {
                _addTier.current.show();
              }
            }}
          >
            Add new tier
          </button>
        </div>
        {renderContent()}
      </div>
      <Modal ref={_addTier}>
        <div className={"data"}>
          <h1>Add new tier</h1>
        </div>
        <div className={"btns"}>
          <button
            type={"button"}
            className={"btn light-blue"}
            onClick={() => {
              if (_addTier.current) {
                _addTier.current.hide();
              }
            }}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Component;
