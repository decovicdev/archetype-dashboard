import Head from 'next/head';
import config from 'config';
import Settings from 'components/Settings';
import DashboardLayout from 'components/_layout/DashboardLayout';
import BreadCrumbs from 'components/_common/BreadCrumbs';
import { ROUTES } from 'constant/routes';

const SettingsPage = () => (
  <DashboardLayout>
    <Head>
      <title>Settings - {config.meta.title}</title>
    </Head>
    <div className="flex flex-col space-y-2">
      <BreadCrumbs
        links={[
          { url: ROUTES.SETTINGS.SETTINGS, title: 'Settings' },
          { url: ROUTES.SETTINGS.ACCOUNT_SETTINGS, title: 'Profile' }
        ]}
      />

      <Settings />
    </div>
  </DashboardLayout>
);

export default SettingsPage;
