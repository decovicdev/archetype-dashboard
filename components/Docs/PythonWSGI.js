
import Head from 'next/head';
import Markdown from 'markdown-to-jsx';
import config from '../../config';

import Sidebar from './_sidebar';

import data from './md/Python WSGI.md';

const Component = () => (
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

export default Component;
