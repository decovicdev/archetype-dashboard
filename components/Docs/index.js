import config from "../../config";

import { useState } from "react";
import Head from "next/head";

import Spinner from "../_common/Spinner";

const Component = () => {
  const [inProgress] = useState(false);

  return (
    <div className="page docs-page">
      <Head>
        <title>Docs - {config.meta.title}</title>
      </Head>
      {inProgress && <Spinner />}
      <div className={"content"}></div>
    </div>
  );
};

export default Component;
