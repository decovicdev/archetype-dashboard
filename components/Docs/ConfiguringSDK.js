import config from "../../config";

import { useState } from "react";
import Head from "next/head";

import Spinner from "../_common/Spinner";
import Sidebar from "./_sidebar";

const Component = () => {
  const [inProgress] = useState(false);

  return (
    <div className="page docs-page">
      <Head>
        <title>Configuring SDK - Docs - {config.meta.title}</title>
      </Head>
      {inProgress && <Spinner />}
      <Sidebar />
      <div className={"content-block"}>
        <div className={"title"}>Configuring SDK</div>
      </div>
    </div>
  );
};

export default Component;
