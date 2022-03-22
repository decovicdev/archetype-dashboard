import Head from 'next/head';
import Link from 'next/link';
import config from 'config';
import Settings from 'components/Settings';
import DashboardLayout from 'components/_layout/DashboardLayout';

const SettingsPage = () => (
  <DashboardLayout>
    <Head>
      <title>Settings - {config.meta.title}</title>
    </Head>
    <div className="page settings-page">
      <div className="content with-lines">
        <ul className="tabs">
          <li className="tab active">
            <Link href="/settings">
              <a>Settings</a>
            </Link>
          </li>
          <li className="tab">
            <Link href="/profile">
              <a>Profile</a>
            </Link>
          </li>
        </ul>
        <div className="tab-content">
          <Settings />
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default SettingsPage;
