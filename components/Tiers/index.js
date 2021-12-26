import config from "../../config";

import { useRef, useState, useEffect, useCallback, useContext } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import Spinner from "../_common/Spinner";
import Dropdown from "../_common/Dropdown";
import DeleteModal from "./DeleteModal";

import TierService from "../../services/tier.service";

import { HelperContext } from "../../context/helper";

const Component = () => {
  const router = useRouter();

  const _deleteProduct = useRef(null);

  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);
  const [data, setData] = useState([]);
  const [selectedTier, setSelectedTier] = useState(null);

  const fetch = useCallback(async () => {
    try {
      setProgress(true);

      const response = await TierService.getList();
      setData(response);
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, []);

  useEffect(() => {
    fetch();
  }, []);

  const clickItem = useCallback(
    (e, item) => {
      if (
        e.target.className === "product-context-menu" ||
        e.target.parentNode.classList.contains("dropdown") ||
        e.target.parentNode.classList.contains("dropdownContent")
      ) {
        return;
      }

      router.push(`/tiers/${item.tier_id}`);
    },
    [router]
  );

  const renderContent = useCallback(() => {
    if (!data.length) {
      return <div className={"no-content"}>No products added yet.</div>;
    }

    return (
      <>
        <div className={"tiers-list-header"}>
          <div className={"col"}>Type product</div>
          <div className={"col"}>Price</div>
          <div className={"col"}>Length</div>
          <div className={"col"}>Trial</div>
          <div className={"col"}>Subscribers</div>
          <div className={"col"}>Quota</div>
        </div>
        <div className={"tiers-list-data"}>
          {data.map((item, i) => {
            return (
              <div
                key={i}
                className={"row"}
                onClick={(e) => clickItem(e, item)}
              >
                <div className={"col"}>{item.name}</div>
                <div className={"col"}>${item.price}</div>
                <div className={"col"}>{`${item.period}ly`}</div>
                <div className={"col"}>
                  {item.has_trial
                    ? `${item.trial_length} ${item.trial_time_frame}`
                    : "-"}
                </div>
                <div className={"col"}>{item.users.length} users</div>
                <div className={"col"}>
                  <div>{item.quota ? `${item.quota}/day` : `Unlimited`}</div>
                  <Dropdown title={<div className={"product-context-menu"} />}>
                    <Link href={`/tiers/edit/${item.tier_id}`}>
                      <a className={"edit-btn"}>Edit</a>
                    </Link>
                    <button
                      type={"button"}
                      className={"delete-btn"}
                      onClick={() => {
                        setSelectedTier(item.tier_id);

                        _deleteProduct.current?.show();
                      }}
                    >
                      Delete
                    </button>
                  </Dropdown>
                </div>
              </div>
            );
          })}
        </div>
      </>
    );
  }, [_deleteProduct, data]);

  return (
    <>
      <div className="page tiers-page">
        <Head>
          <title>Products - {config.meta.title}</title>
        </Head>
        {inProgress && <Spinner />}
        <div className={"content"}>
          <div className={"top-block"}>
            <h1>List products</h1>
            <Link href={"/tiers/add"}>
              <a className={"add-product-btn"}>Add product</a>
            </Link>
          </div>
          {renderContent()}
        </div>
      </div>
      <DeleteModal ref={_deleteProduct} id={selectedTier} onSuccess={fetch} />
    </>
  );
};

export default Component;
