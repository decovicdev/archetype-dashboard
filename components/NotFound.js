import config from "../config";

import Link from "next/link";
import Head from "next/head";

const Component = () => (
    <div className="page error-page">
      <Head>
        <title>Page Not Found - {config.meta.title}</title>
      </Head>
      <div className="text">
        <h1>Page not found</h1>
        <p>
          Looks like the page you’re looking for cannot be found,
          <br />
          didn’t load correctly or doesn’t exist.
        </p>
        <Link href="/">
          <a>Go back to the main page</a>
        </Link>
      </div>
    </div>
  );

export default Component;
