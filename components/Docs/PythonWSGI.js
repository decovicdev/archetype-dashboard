import config from "../../config";

import Head from "next/head";
import Markdown from "markdown-to-jsx";

import Sidebar from "./_sidebar";

import data from "./md/Python WSGI.md";

const Component = () => {
  return (
    <div className="page docs-page">
      <Head>
        <title>Python WSGI - Docs - {config.meta.title}</title>
      </Head>
      <Sidebar />
      <div className="content-block">
        <Markdown>{data}</Markdown>
      </div>
    </div>
  );
};

export default Component;
