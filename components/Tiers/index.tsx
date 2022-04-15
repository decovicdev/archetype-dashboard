import { useState } from 'react';
import Head from 'next/head';
import config from '../../config';
import Spinner from '../_common/Spinner';
import DeleteModal from './DeleteModal';
import { ROUTES } from 'constant/routes';
import { Tier } from 'types/Tiers';
import useDisclosure from 'hooks/useDisclosure';
import Title from 'components/_typography/Title';
import { TypographyVariant } from 'types/Typography';
import Button from 'components/_common/Button';
import { useProducts } from 'hooks/useProducts';
import Table from 'components/Tiers/Table';

const gridTemplateColumns = 'repeat(6, 1fr) 50px';

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
              + Add product
            </Button>
          </div>
          <Table
            data={data as unknown as Tier[]}
            setSelectedTier={setSelectedTier}
            onOpen={onOpen}
            gridTemplateColumns={gridTemplateColumns}
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
