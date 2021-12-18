import { useContext, useState } from "react";
import Head from "next/head";
import classnames from "classnames";

import config from "../config";

import PrivateRoute from "../components/_common/PrivateRoute";
import Spinner from "../components/_common/Spinner";
import Settings from "../components/Settings";
import Profile from "../components/Profile";

import { AuthContext } from "../context/auth";

const tabs = {
  settings: { title: "Settings", component: <Settings /> },
  profile: { title: "Profile", component: <Profile /> },
};

const Component = () => {
  const { authPending } = useContext(AuthContext);

  const [selectedTab, setSelectedTab] = useState("settings");

  const selectTab = (e) => {
    setSelectedTab(e.target.id);
  };

  if (authPending) {
    return <Spinner />;
  }

  return (
    <PrivateRoute>
      <Head>
        <title>Settings - {config.meta.title}</title>
        <meta name="description" content={config.meta.description} />
        <meta name="keywords" content={config.meta.keywords} />
      </Head>
      <div className="page settings-page">
        <div className="content">
          <ul className="tabs">
            {Object.keys(tabs).map((tab) => (
              <li
                className={classnames("tab", { active: selectedTab === tab })}
                id={tab}
                onClick={selectTab}
              >
                {tabs[tab].title}
              </li>
            ))}
          </ul>
          <div className="tab-content">{tabs[selectedTab].component}</div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Component;
