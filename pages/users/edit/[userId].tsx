import EditUser from 'components/Users/Edit';
import BreadCrumbs from 'components/_common/BreadCrumbs';
import DashboardLayout from 'components/_layout/DashboardLayout';
import config from 'config';
import { ROUTES } from 'constant/routes';
import Head from 'next/head';
import { useRouter } from 'next/router';

const Component = () => {
  const router = useRouter();

  return (
    <DashboardLayout>
      <Head>
        <title>Edit Customer - {config.meta.title}</title>
      </Head>
      <BreadCrumbs
        links={[
          { url: ROUTES.USERS.BASE_URL, title: 'Customers' },
          { url: `${ROUTES.USERS.BASE_URL}/${router.query.userId}`, title: 'Customer' },
          {
            url: `${ROUTES.USERS.EDIT}/${router.query.userId}`,
            title: 'Edit Customer'
          }
        ]}
      />
      <EditUser />
    </DashboardLayout>
  )
};

export default Component;
