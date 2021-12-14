import config from "../../config";

import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import UserService from "../../services/user.service";

const Component = ({}) => {
  const router = useRouter();

  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetch() {
      const response = await UserService.getById(router.query.userId);

      setData(response);
    }

    fetch();
  }, []);

  return (
    <div className="page">
      <Head>
        <title>User Details - {config.meta.title}</title>
      </Head>
      <div className={"content"}>User Details</div>
    </div>
  );
};

export default Component;
