import config from "../../config";

import Head from "next/head";
import Markdown from "markdown-to-jsx";

import Sidebar from "./_sidebar";

import data from "./md/Intro.md";

const Component = () => (
    <div className="page docs-page">
      <Head>
        <title>Introduction - Docs - {config.meta.title}</title>
      </Head>
      <Sidebar />
      <div className="content-block">
        <Markdown>{data}</Markdown>
      </div>
    </div>
  );

export default Component;
