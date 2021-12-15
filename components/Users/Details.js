import config from "../../config";

import { useState, useEffect, useCallback } from "react";
import Head from "next/head";
import { useRouter } from "next/router";

import Spinner from "../_common/Spinner";

import UserService from "../../services/user.service";

const Component = ({}) => {
  const router = useRouter();

  const [inProgress, setProgress] = useState(false);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetch() {
      setProgress(true);

      const response = await UserService.getById(router.query.userId);
      setData(response);

      setProgress(false);
    }

    fetch();
  }, []);

  return (
    <div className="page">
      <Head>
        <title>User Details - {config.meta.title}</title>
      </Head>
      {inProgress && <Spinner />}
      <div className={"content"}>User Details</div>
    </div>
  );
};

export default Component;
