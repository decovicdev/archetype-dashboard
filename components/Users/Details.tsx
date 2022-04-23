import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import DeleteUserModal from './DeleteUserModal';
import config from 'config';
import DropdownMenu from 'components/_common/DropdownMenu';
import Spinner from 'components/_common/Spinner';
import CustomerService from 'services/customer.service';
import { useHelpers } from 'context/HelperProvider';
import useDisclosure from 'hooks/useDisclosure';
import { ROUTES } from 'constant/routes';
import Title from 'components/_typography/Title';
import { TypographyVariant } from 'types/Typography';
import Button from 'components/_common/Button';
import { ButtonVariant } from 'types/Button';
import Divider from 'components/_common/Divider';
import ErrorText from 'components/_typography/ErrorText';
import BreadCrumbs from 'components/_common/BreadCrumbs';

const Component = () => {
  const router = useRouter();
  const { showAlert } = useHelpers();

  const { data, isLoading } = useQuery(
    ['user', router.query.userId],
    async () => CustomerService.getById(router.query.userId),
    { onError: (e: any) => showAlert(e.message) }
  );

  const newData = data as any

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <div className="text-black">
      <Head>
        <title>Customer Information - {config.meta.title}</title>
      </Head>
      {isLoading && <Spinner />}
      <BreadCrumbs
        links={[
          { url: ROUTES.USERS.BASE_URL, title: 'Customers' },
          {
            url: `${ROUTES.USERS.BASE_URL}/${router.query.userId}`,
            title: 'Customer Profile'
          }
        ]}
      />
      {data ? (
        <>
          <div className="flex space-x-2 items-center">
            <Title
              variant={TypographyVariant.dark}
              level={3}
              className="!text-left mb-2"
            >
              Customer Profile
            </Title>
            <DropdownMenu title={<Button>Options</Button>}>
              <Button url={`${ROUTES.USERS.EDIT}/${newData.custom_uid}`}>
                Edit
              </Button>
              <Button variant={ButtonVariant.danger} onClick={onOpen}>
                Delete
              </Button>
            </DropdownMenu>
          </div>
          <Divider className="my-4" />
          <Title
            variant={TypographyVariant.dark}
            level={3}
            className="!text-left mb-2"
          >
            Customer details
          </Title>
          <div className="grid grid-cols-2">
            <div>App User ID</div>
            <div>{newData.custom_uid}</div>
            <div>User apiKeys</div>
            <div>{newData.apikeys?.join(',') || ''}</div>
            <div>User app_id</div>
            <div>{newData.app_id}</div>
            <div>Name</div>
            <div>{newData.attrs?.name}</div>
            <div>Email</div>
            <div>{newData.email}</div>
            <div>Status</div>
            <div>{newData.status}</div>
            <div>Trial active</div>
            <div>{newData.is_trial ? 'true' : 'false'}</div>
            {newData.tier_id && (
              <>
                <div>Tier</div>
                <div>
                  <Link href={`/tiers/${newData.tier_id}`}>{newData.tier_id}</Link>
                </div>
              </>
            )}
            <div>Last Seen</div>
            <div>{new Date(newData.last_seen * 1000).toLocaleDateString()}</div>
          </div>
          <Divider className="my-4" />
          <Title
            variant={TypographyVariant.dark}
            level={3}
            className="!text-left mb-2"
          >
            Customer history
          </Title>
        </>
      ) : (
        <ErrorText>Customer not found.</ErrorText>
      )}
      <DeleteUserModal id="test" isOpen={isOpen} onClose={onClose} />
    </div>
  );
};

export default Component;
