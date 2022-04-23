import { useCallback, MouseEvent, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import DropdownMenu from 'components/_common/DropdownMenu';
import { ROUTES } from 'constant/routes';
import { Tier } from 'types/Tiers';
import Card from 'components/_common/Card';
import Button from 'components/_common/Button';
import { ButtonVariant } from 'types/Button';

type Props = {
  data?: Tier[];
  gridTemplateColumns: string;
  onOpen?: () => void;
  setSelectedTier?: Dispatch<SetStateAction<string>>;
};

const Table: React.FC<Props> = ({
  data,
  gridTemplateColumns,
  onOpen,
  setSelectedTier
}) => {
  const router = useRouter();

  const onClickTier = useCallback(
    (e: MouseEvent<HTMLDivElement, MouseEvent>, item: Tier) => {
      void router.push(`${ROUTES.PRODUCTS.BASE_URL}/${item.tier_id}`);
    },
    [router]
  );

  if (!data?.length) {
    return <div className="no-content">No products added yet.</div>;
  }

  return (
    <Card className="!p-0 !mt-4">
      <div
        className="w-full grid items-center py-4 px-4 font-bold"
        style={{ gridTemplateColumns }}
      >
        <p>Type product</p>
        <p>Price</p>
        <p>Length</p>
        <p>Trial</p>
        <p>Subscribers</p>
        <p>Quota</p>
      </div>

      {data.map((item, i) => (
        <div
          key={i}
          onClick={(e) => {
            onClickTier(
              e as unknown as MouseEvent<HTMLDivElement, MouseEvent>,
              item
            );
          }}
          className="w-full grid items-center hover:bg-gray-100 px-4 cursor-pointer"
          style={{ gridTemplateColumns }}
        >
          <div>{item.name}</div>
          <div>${item.price}</div>
          <div>{`${item.period}ly`}</div>
          <div>
            {item.has_trial
              ? `${item.trial_length} ${item.trial_time_frame}`
              : '-'}
          </div>
          <div>{item.users.length} users</div>

          <div>{item.quota ? `${item.quota}/day` : `Unlimited`}</div>
          <DropdownMenu
            title={<Button variant={ButtonVariant.outlined}>...</Button>}
          >
            <Button url={`${ROUTES.PRODUCTS.EDIT}/${item.tier_id}`}>
              Edit
            </Button>
            <Button
              variant={ButtonVariant.danger}
              onClick={() => {
                setSelectedTier(item.tier_id);
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
