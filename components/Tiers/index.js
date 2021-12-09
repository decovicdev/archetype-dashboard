import config from "../../config";

import Head from "next/head";

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
            <button type={"button"} className={"edit-btn"} />
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
            <button type={"button"} className={"edit-btn"} />
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
            <button type={"button"} className={"edit-btn"} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Users;
