import {
  useState,
  useCallback,
  MouseEvent,
  Dispatch,
  SetStateAction
} from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import config from '../../config';
import Spinner from '../_common/Spinner';
import DropdownMenu from '../_common/DropdownMenu';
import DeleteModal from './DeleteModal';
import { ROUTES } from 'constant/routes';
import { Tier } from 'types/Tiers';
import Card from 'components/_common/Card';
import useDisclosure from 'hooks/useDisclosure';
import Title from 'components/_typography/Title';
import { TypographyVariant } from 'types/Typography';
import Button from 'components/_common/Button';
import { ButtonVariant } from 'types/Button';
import { useProducts } from 'hooks/useProducts';

type Props = {
  data?: Tier[];
  onOpen?: () => void;
  setSelectedTier?: Dispatch<SetStateAction<string>>;
};

const TiersTable: React.FC<Props> = ({ data, onOpen, setSelectedTier }) => {
  const router = useRouter();

  const onClickTier = useCallback(
    (e: MouseEvent<HTMLDivElement, MouseEvent>, item: Tier) => {
      if (
        e.target.className === 'product-context-menu' ||
        e.target.parentNode.classList.contains('dropdownMenu') ||
        e.target.parentNode.classList.contains('dropdownMenuContent')
      )
        return;

      void router.push(`${ROUTES.PRODUCTS.BASE_URL}/${item.tier_id}`);
    },
    [router]
  );

  if (!data?.length) {
    return <div className="no-content">No products added yet.</div>;
  }

  return (
    <Card>
      <div className="w-full grid grid-cols-7">
        <div>Type product</div>
        <div>Price</div>
        <div>Length</div>
        <div>Trial</div>
        <div>Subscribers</div>
        <div>Quota</div>
      </div>

      {data.map((item, i) => (
        <div
          key={i}
          onClick={(e) => {
            onClickTier(e, item);
          }}
          className="w-full grid grid-cols-7"
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
          <DropdownMenu title={<Button>Options</Button>}>
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

const Component = () => {
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const { data, isLoading, isError } = useProducts();

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <Head>
        <title>Products - {config.meta.title}</title>
      </Head>
      {isError ? (
        <div>Error</div>
      ) : isLoading ? (
        <Spinner />
      ) : (
        <div className="grid grid-rows-header text-black">
          <div className="flex space-x-2 items-center mb-2">
            <Title
              variant={TypographyVariant.dark}
              level={3}
              className="!text-left mb-2"
            >
              List products
            </Title>
            <Button className="whitespace-nowrap" url={ROUTES.PRODUCTS.ADD}>
              Add product
            </Button>
          </div>
          <TiersTable
            data={data as unknown as Tier[]}
            setSelectedTier={setSelectedTier}
            onOpen={onOpen}
          />
        </div>
      )}
      <DeleteModal
        isOpen={isOpen}
        onClose={onClose}
        id={selectedTier}
        onSuccess={fetch}
      />
    </>
  );
};

export default Component;
