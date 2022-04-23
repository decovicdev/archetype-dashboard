import Head from 'next/head';
import config from '../config';
import Profile from '../components/Profile';
import DashboardLayout from 'components/_layout/DashboardLayout';
import BreadCrumbs from 'components/_common/BreadCrumbs';
import { ROUTES } from 'constant/routes';

const Component = () => (
  <DashboardLayout>
    <Head>
      <title>User Profile - {config.meta.title}</title>
    </Head>
    <div className="flex flex-col space-y-2">
      <BreadCrumbs
        links={[
          { url: ROUTES.SETTINGS.SETTINGS, title: 'Settings' },
          { url: ROUTES.SETTINGS.ACCOUNT_SETTINGS, title: 'Profile' }
        ]}
      />
      <Profile />
    </div>
  </DashboardLayout>
);

export default Component;
