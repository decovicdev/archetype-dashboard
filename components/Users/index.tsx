import { useMemo, useState } from 'react';
import Head from 'next/head';
import GenerateKey from './GenerateKey';
import DeleteUserModal from './DeleteUserModal';
import Table from './Table';
import config from 'config';
import Spinner from 'components/_common/Spinner';
import useDisclosure from 'hooks/useDisclosure';
import Card from 'components/_common/Card';
import Title from 'components/_typography/Title';
import Input from 'components/_common/Input';
import Button from 'components/_common/Button';
import { ROUTES } from 'constant/routes';
import { TypographyVariant } from 'types/Typography';
import { useUsers } from 'hooks/useUsers';
import { User } from 'types/Users';

const gridTemplateColumns = '2fr repeat(6, 1fr) 50px';

const Users = () => {
  const [searchVal, setSearchVal] = useState('');
  const [selectedId, setSelectedId] = useState<string>(null);

  const { data, isLoading } = useUsers();

  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: isGKOpen,
    onOpen: onGKOpen,
    onClose: onGKClose
  } = useDisclosure();

  const list: User[] = useMemo(
    () =>
      // TODO: attrs is always null
      searchVal
        ? (data as unknown as User[])?.filter(
            (item) =>
              item.attrs?.name
                ?.toLowerCase()
                .indexOf(searchVal.toLowerCase()) >= 0
          )
        : (data as unknown as User[]),
    [data, searchVal]
  );

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
            + Add user
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
        <Table
          data={list}
          setSelectedId={setSelectedId}
          onOpen={onOpen}
          onGKOpen={onGKOpen}
          gridTemplateColumns={gridTemplateColumns}
        />
      </div>
      <DeleteUserModal isOpen={isOpen} onClose={onClose} id={selectedId} />
      <GenerateKey
        isOpen={isGKOpen}
        onClose={onGKClose}
        id={selectedId}
        onSuccess={() => {
          // fetch();
        }}
      />
    </>
  );
};

export default Users;
