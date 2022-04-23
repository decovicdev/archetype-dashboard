
import Head from 'next/head';
import config from 'config';
import DashboardLayout from 'components/_layout/DashboardLayout';

const Component = () => (
  <DashboardLayout>
    <Head>
      <title>Dimensions - {config.meta.title}</title>
    </Head>
    <h1>Coming soon</h1>
  </DashboardLayout>
);

export default Component;
