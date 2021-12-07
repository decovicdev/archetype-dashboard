import config from "../config";

import Link from "next/link";
import Head from "next/head";

const Component = () => {
  return (
    <div className="page error-page">
      <Head>
        <title>Internal Error - {config.meta.title}</title>
      </Head>
      <div className="text">
        <h1>Internal Error</h1>
        <p>
          Oops, something is happened on our end, we will fix it asap.
          <br />
          Please try again later or let us know.
        </p>
        <Link href="/">
          <a>Go back to the main page</a>
        </Link>
      </div>
    </div>
  );
};

export default Component;
