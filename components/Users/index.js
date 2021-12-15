import config from "../../config";

import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import Link from "next/link";

import Spinner from "../_common/Spinner";

import UserService from "../../services/user.service";

const Component = () => {
  const [inProgress, setProgress] = useState(false);
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetch() {
      setProgress(true);

      const response = await UserService.getList();
      setData(response);

      setProgress(false);
    }

    fetch();
  }, []);

  const renderContent = useCallback(() => {
    return data.map((item, i) => {
      return (
        <div key={i} className={"users-list-item"}>
          User
        </div>
      );
    });
  }, [data]);

  return (
    <div className="page users-page">
      <Head>
        <title>Users - {config.meta.title}</title>
      </Head>
      {inProgress && <Spinner />}
      <div className={"content"}>{renderContent()}</div>
    </div>
  );
};

export default Component;
