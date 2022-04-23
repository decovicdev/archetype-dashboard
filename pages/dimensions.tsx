import Head from 'next/head';
import DashboardLayout from 'components/_layout/DashboardLayout';
import config from 'config';

const DimensionsPage = () => (
  <DashboardLayout>
    <Head>
      <title>Dimensions - {config.meta.title}</title>
    </Head>
    <h1>Coming soon</h1>
  </DashboardLayout>
);

export default DimensionsPage;
