import { useCallback, MouseEvent, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import DropdownMenu from 'components/_common/DropdownMenu';
import { ROUTES } from 'constant/routes';
import Card from 'components/_common/Card';
import Button from 'components/_common/Button';
import { ButtonVariant } from 'types/Button';
import type { User } from 'types/Users';

type Props = {
  data?: User[];
  gridTemplateColumns: string;
  onOpen?: () => void;
  onGKOpen?: () => void;
  setSelectedId?: Dispatch<SetStateAction<string>>;
};

const Table: React.FC<Props> = ({
  data,
  gridTemplateColumns,
  onOpen,
  onGKOpen,
  setSelectedId
}) => {
  const router = useRouter();
  const newData = data as any
  const clickItem = useCallback(
    (e: MouseEvent<HTMLDivElement, MouseEvent>, item: User) => {
      void router.push(`${ROUTES.USERS.BASE_URL}/${item.custom_uid}`);
    },
    [router]
  );

  if (!newData?.length) {
    return <div className="no-content">No products added yet.</div>;
  }

  return (
    <Card className="!p-0 !mt-4">
      <div
        className="w-full grid items-center py-4 px-4 font-bold"
        style={{ gridTemplateColumns }}
      >
        <p>Customer Id</p>
        <p>Name</p>
        <p>API key</p>
        <p>Tier</p>
        <p>Last seen</p>
        <p>Status</p>
        <p>Quota</p>
      </div>

      {newData.map((item, i) => (
        <div
          key={i}
          onClick={(e) =>
            clickItem(
              e as unknown as MouseEvent<HTMLDivElement, MouseEvent>,
              item
            )
          }
          className="w-full grid items-center hover:bg-gray-100 px-4 cursor-pointer"
          style={{ gridTemplateColumns }}
        >
          <div>{item.custom_uid}</div>
          <div>{item.name}</div>
          <div>{item.apikeys?.join(' ')}</div>
          <div>{item.tier_id || '-'}</div>
          <div>{new Date(item.last_seen * 1000).toLocaleDateString()}</div>
          <div>{item.status.replace('_', ' ')}</div>

          <div>{item.quota ? `${item.quota}/day` : `Unlimited`}</div>
          <DropdownMenu
            title={<Button variant={ButtonVariant.outlined}>...</Button>}
          >
            <Button url={`${ROUTES.USERS.EDIT}/${item.custom_uid}`} className="w-full mb-2">
              Edit
            </Button>
            <Button
            className='w-full mb-2'
              onClick={() => {
                setSelectedId(item.custom_uid);
                onGKOpen();
              }}
            >
              Reset API key
            </Button>
            <Button
            className='w-full'
              variant={ButtonVariant.danger}
              onClick={() => {
                setSelectedId(item.custom_uid);
                onOpen();
              }}
            >
              Delete
            </Button>
          </DropdownMenu>
        </div>
      ))}
    </Card>
  );
};

export default Table;
