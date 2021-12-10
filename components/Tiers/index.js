import config from "../../config";

import Head from "next/head";
import Link from "next/link";

const Users = () => {
  return (
    <div className="page tiers-page">
      <Head>
        <title>Tiers - {config.meta.title}</title>
      </Head>
      <div className={"content"}>
        <div className={"tiers-top-block"}>
          <button type={"button"} className={"btn green"}>
            Add a tier
          </button>
        </div>
        <div className={"tiers-list-data"}>
          <div className={"tiers-list-item"}>
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
            <Link href={`/tiers/1`}>
              <a className={"edit-btn"} />
            </Link>
          </div>
          <div className={"tiers-list-item"}>
            <div className={"top-content"}>
              <div className={"name"}>Advanced</div>
              <button type={"button"} className={"delete-btn"} />
            </div>
            <div className={"bottom-content"}>
              <div className={"price"}>$299</div>
              <div className={"quota"}>
                Quota: <span>5000/day</span>
              </div>
            </div>
            <Link href={`/tiers/2`}>
              <a className={"edit-btn"} />
            </Link>
          </div>
          <div className={"tiers-list-item"}>
            <div className={"top-content"}>
              <div className={"name"}>Enterprise</div>
              <button type={"button"} className={"delete-btn"} />
            </div>
            <div className={"bottom-content"}>
              <div className={"price"}>$999</div>
              <div className={"quota"}>
                Quota: <span>25000/day</span>
              </div>
            </div>
            <Link href={`/tiers/3`}>
              <a className={"edit-btn"} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
