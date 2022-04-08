import { useCallback, useMemo, useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import GenerateKey from './GenerateKey';
import DeleteUserModal from './DeleteUserModal';
import config from 'config';
import DropdownMenu from 'components/_common/DropdownMenu';
import Spinner from 'components/_common/Spinner';
import CustomerService from 'services/customer.service';
import { useHelpers } from 'context/HelperProvider';
import useDisclosure from 'hooks/useDisclosure';
import Card from 'components/_common/Card';
import Title from 'components/_typography/Title';
import Input from 'components/_common/Input';
import Button from 'components/_common/Button';
import { ROUTES } from 'constant/routes';
import { TypographyVariant } from 'types/Typography';

const Users = () => {
  const router = useRouter();
  const { showAlert } = useHelpers();
  const [searchVal, setSearchVal] = useState('');
  const [selectedId, setSelectedId] = useState(null);

  const { data, isLoading } = useQuery('users', CustomerService.getList, {
    onError: (e: any) => showAlert(e.message)
  });

  const clickItem = useCallback(
    (e, item) => {
      if (
        e.target.className === 'context-menu-dots' ||
        e.target.parentNode.classList.contains('dropdownMenu') ||
        e.target.parentNode.classList.contains('dropdownMenuContent')
      ) {
        return;
      }

      router.push(`${ROUTES.USERS.BASE_URL}/${item.custom_uid}`);
    },
    [router]
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isGKOpen,
    onOpen: onGKOpen,
    onClose: onGKClose
  } = useDisclosure();

  const list = useMemo(
    () =>
      // TODO: attrs is always null
      searchVal
        ? data?.filter(
            (item) =>
              item.attrs?.name.toLowerCase().indexOf(searchVal.toLowerCase()) >=
              0
          )
        : data,
    [data, searchVal]
  );

  console.log({ list });
  return (
    <>
      <Head>
        <title>Users - {config.meta.title}</title>
      </Head>
      {isLoading && <Spinner />}
      <div className="flex flex-col">
        <Title
          variant={TypographyVariant.dark}
          className="!text-left mb-4"
          level={3}
        >
          Customers
        </Title>
        <div className="flex">
          <Input
            name="findCustomer"
            placeholder="Find customer"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
          />
          <Button className="whitespace-nowrap ml-2" url={ROUTES.USERS.ADD}>
            Add user
          </Button>
        </div>
        <Card className="mt-4">
          <div className="grid grid-cols-4">
            <div className="flex flex-col justify-center items-center">
              <span>Total customers</span>
              <span>0</span>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span>Active trials</span>
              <span>0</span>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span>Active subscriptions</span>
              <span>0</span>
            </div>
            <div className="flex flex-col justify-center items-center">
              <span>Total revenue</span>
              <span>$0</span>
            </div>
          </div>
        </Card>
        <Card className="mt-4">
          <div className="w-full grid grid-cols-5">
            <div>Customer</div>
            <div>API key</div>
            <div>Tier</div>
            <div>Last seen</div>
            <div>Status</div>
          </div>
          {list?.map((customer) => (
            <div
              key={customer.custom_uid}
              className="w-full grid grid-cols-5"
              onClick={(e) => clickItem(e, customer)}
            >
              <div>{customer.custom_uid}</div>
              <div>{customer.apikey}</div>
              <div>{customer.tier_id || '-'}</div>
              <div>
                {new Date(customer.last_seen * 1000).toLocaleDateString()}
              </div>
              <div>
                {customer.status.replace('_', ' ')}
                <DropdownMenu title={<div className="context-menu-dots" />}>
                  <Link href={`/users/edit/${customer.custom_uid}`}>
                    <a className="edit-btn">Edit</a>
                  </Link>
                  <button
                    type="button"
                    className="generate-key-btn"
                    onClick={() => {
                      setSelectedId(customer.custom_uid);

                      onGKOpen();
                    }}
                  >
                    Reset API key
                  </button>
                  <button
                    type="button"
                    className="delete-btn"
                    onClick={() => {
                      setSelectedId(customer.custom_uid);

                      onOpen();
                    }}
                  >
                    Delete
                  </button>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </Card>
      </div>
      <DeleteUserModal isOpen={isOpen} onClose={onClose} id={selectedId} />
      <GenerateKey
        isOpen={isGKOpen}
        onClose={onGKClose}
        id={selectedId}
        onSuccess={() => {
          fetch();
        }}
      />
    </>
  );
};

export default Users;
