import config from '../config';

import Head from 'next/head';

const Component = () => (
  <>
    <Head>
      <title>Analytics - {config.meta.title}</title>
    </Head>
    <div className="page">
      <div className="content">
        <div className="no-content">Coming Soon</div>
      </div>
    </div>
  </>
);

export default Component;
