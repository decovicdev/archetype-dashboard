import UserDetails from 'components/Users/Details';
import BreadCrumbs from 'components/_common/BreadCrumbs';
import DashboardLayout from 'components/_layout/DashboardLayout';
import config from 'config';
import Head from 'next/head';
import { ROUTES } from 'constant/routes';
import { useRouter } from 'next/router';

const Component = () => {
  const router = useRouter()
  return (
    <DashboardLayout>
      <div className="text-black">
        <Head>
          <title>Customer Information - {config.meta.title}</title>
        </Head>
        <BreadCrumbs
          links={[
            { url: ROUTES.USERS.BASE_URL, title: 'Customers' },
            {
              url: `${ROUTES.USERS.BASE_URL}/${router.query.userId}`,
              title: 'Customer Profile'
            }
          ]}
        />
        <UserDetails />
      </div>
    </DashboardLayout>
  )
};

export default Component;
