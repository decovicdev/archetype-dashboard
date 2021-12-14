import config from "../../config";

import { useState, useEffect, useCallback } from "react";
import Head from "next/head";

import UserService from "../../services/user.service";

const Component = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetch() {
      const response = await UserService.getList();

      setData(response);
    }

    fetch();
  }, []);

  return (
    <div className="page users-page">
      <Head>
        <title>Users - {config.meta.title}</title>
      </Head>
      <div className={"content"}>Users</div>
    </div>
  );
};

export default Component;
