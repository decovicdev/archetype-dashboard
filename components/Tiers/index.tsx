import {
  useState,
  useCallback,
  MouseEvent,
  Dispatch,
  SetStateAction
} from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import config from '../../config';
import Spinner from '../_common/Spinner';
import DropdownMenu from '../_common/DropdownMenu';
import TierService from '../../services/tier.service';
import { useHelpers } from '../../context/HelperProvider';
import DeleteModal from './DeleteModal';
import { ROUTES } from 'constant/routes';
import { Tier } from 'types/Tiers';
import Card from 'components/_common/Card';
import useDisclosure from 'hooks/useDisclosure';

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
      <div className="grid grid-cols-6">
        <div>Type product</div>
        <div>Price</div>
        <div>Length</div>
        <div>Trial</div>
        <div>Subscribers</div>
        <div>Quota</div>
      </div>
      <div>
        {data.map((item, i) => (
          <div
            key={i}
            onClick={(e) => {
              onClickTier(e, item);
            }}
            className="grid grid-cols-6"
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
            <div>
              <div>{item.quota ? `${item.quota}/day` : `Unlimited`}</div>
              <DropdownMenu
                title={
                  <div className="border border-red-400 h-10 w-10 bg-red-700" />
                }
              >
                <Link href={`${ROUTES.PRODUCTS.EDIT}/${item.tier_id}`}>
                  <a>Edit</a>
                </Link>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedTier(item.tier_id);
                    onOpen();
                  }}
                >
                  Delete
                </button>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

const Component = () => {
  const { showAlert } = useHelpers();
  const [selectedTier, setSelectedTier] = useState<string | null>(null);

  const { data, isLoading, isError } = useQuery(
    'products',
    TierService.getList,
    {
      onError: (err: any) => {
        showAlert(err?.message);
      }
    }
  );

  const { isOpen, onClose, onOpen } = useDisclosure();

  return (
    <>
      <div className="page tiers-page !text-black">
        <Head>
          <title>Products - {config.meta.title}</title>
        </Head>
        {isError ? (
          <div>Error</div>
        ) : isLoading ? (
          <Spinner />
        ) : (
          <div className="grid grid-rows-header text-black">
            <div>
              <h1>List products</h1>
              <Link href={ROUTES.PRODUCTS.ADD}>
                <a>Add product</a>
              </Link>
            </div>
            <TiersTable
              data={data as unknown as Tier[]}
              setSelectedTier={setSelectedTier}
              onOpen={onOpen}
            />
          </div>
        )}
      </div>
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
