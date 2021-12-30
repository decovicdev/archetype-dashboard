import { useContext } from "react";
import Head from "next/head";
import Link from "next/link";

import config from "../config";

import PrivateRoute from "../components/_common/PrivateRoute";
import Spinner from "../components/_common/Spinner";
import Profile from "../components/Profile";

import { AuthContext } from "../context/auth";

const Component = () => {
  const { authPending } = useContext(AuthContext);

  if (authPending) {
    return (
      <div className="page">
        <Spinner />
      </div>
    );
  }

  return (
    <PrivateRoute>
      <Head>
        <title>User Profile - {config.meta.title}</title>
      </Head>
      <div className="page profile-page">
        <div className="content with-lines">
          <ul className="tabs">
            <li className={"tab"}>
              <Link href={"/settings"}>
                <a>Settings</a>
              </Link>
            </li>
            <li className={"tab active"}>
              <Link href={"/profile"}>
                <a>Profile</a>
              </Link>
            </li>
          </ul>
          <div className="tab-content">
            <Profile />
          </div>
        </div>
      </div>
    </PrivateRoute>
  );
};

export default Component;
