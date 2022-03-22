import Head from 'next/head';
import Link from 'next/link';
import config from '../config';
import Profile from '../components/Profile';
import DashboardLayout from 'components/_layout/DashboardLayout';

const Component = () => (
  <DashboardLayout>
    <Head>
      <title>User Profile - {config.meta.title}</title>
    </Head>
    <div className="page profile-page">
      <div className="content with-lines">
        <ul className="tabs">
          <li className="tab">
            <Link href="/settings">
              <a>Settings</a>
            </Link>
          </li>
          <li className="tab active">
            <Link href="/profile">
              <a>Profile</a>
            </Link>
          </li>
        </ul>
        <div className="tab-content">
          <Profile />
        </div>
      </div>
    </div>
  </DashboardLayout>
);

export default Component;
