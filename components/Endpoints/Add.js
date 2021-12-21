import config from "../../config";

import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";

import Spinner from "../_common/Spinner";

const Component = () => {
  const [inProgress] = useState(false);

  return (
    <>
      <Head>
        <title>Add Endpoint - {config.meta.title}</title>
      </Head>
      {inProgress && <Spinner />}
      <div className="page endpoints-add-page">
        <div className={"content"}>
          <div className={"bread-crumbs"}>
            <Link href={"/endpoints"}>
              <a>Endpoints</a>
            </Link>
            <span>{">"}</span>
            <Link href={"/endpoints/add"}>
              <a className={"active"}>Add Endpoint</a>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Component;
