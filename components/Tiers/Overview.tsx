import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useQuery } from 'react-query';
import config from '../../config';
import Spinner from '../_common/Spinner';
import Modal from '../_common/Modal';
import { useHelpers } from '../../context/HelperProvider';
import { ROUTES } from 'constant/routes';
import useDisclosure from 'hooks/useDisclosure';
import BreadCrumbs from 'components/_common/BreadCrumbs';
import Button from 'components/_common/Button';
import { ButtonVariant } from 'types/Button';
import Title from 'components/_typography/Title';
import { TypographyVariant } from 'types/Typography';
import Paragraph from 'components/_typography/Paragraph';
import Divider from 'components/_common/Divider';
import ErrorText from 'components/_typography/ErrorText';
import { useApi } from 'context/ApiProvider';

const Component = () => {
  const router = useRouter();

  const { showAlert } = useHelpers();

  // const [inProgress, setProgress] = useState(false);
  const [fields, setFields] = useState(null);
  const { tier } = useApi();

  const { isLoading, error } = useQuery(
    ['product', router.query.tierId],
    async () => await tier.getById(router.query.tierId as string),
    {
      onSuccess: (newData) => {
        setFields(newData);
      },
      onError: (e: any) => {
        showAlert(e.message);
      }
    }
  );

  const renderContent = useCallback(() => {
    if (!fields) {
      return <div className="no-content">Product not found.</div>;
    }

    return (
      <>
        <div className="flex justify-between">
          <div className="data">
            <Title
              level={2}
              className="!text-left"
              variant={TypographyVariant.dark}
            >
              {fields.name}
            </Title>
            <Paragraph
              level={2}
              className="!text-left"
              variant={TypographyVariant.dark}
            >
              ${fields.price} {fields.currency} / <span>{fields.period}</span>
            </Paragraph>
          </div>

          <Button url={`${ROUTES.PRODUCTS.EDIT}/${router.query.tierId}`}>
            Edit product
          </Button>
        </div>
        <div className="flex justify-start">
          <Paragraph
            level={2}
            className="!text-left !w-fit mr-2"
            variant={TypographyVariant.dark}
          >
            Updated:
          </Paragraph>
          <Paragraph
            level={2}
            className="!text-left"
            variant={TypographyVariant.dark}
          >
            {new Date().toLocaleDateString()}
          </Paragraph>
        </div>
        <Divider className="my-4" />
        <Title
          variant={TypographyVariant.dark}
          level={3}
          className="!text-left my-4"
        >
          Details
        </Title>
        <div className="grid grid-cols-2">
          <Paragraph
            level={3}
            className="!text-left"
            variant={TypographyVariant.dark}
          >
            Name:
          </Paragraph>
          <Paragraph
            level={3}
            className="!text-left font-bold"
            variant={TypographyVariant.dark}
          >
            {fields.name}
          </Paragraph>
          <Paragraph
            level={3}
            className="!text-left"
            variant={TypographyVariant.dark}
          >
            ID:
          </Paragraph>
          <Paragraph
            level={3}
            className="!text-left font-bold"
            variant={TypographyVariant.dark}
          >
            {fields.tier_id}
          </Paragraph>
          <Paragraph
            level={3}
            className="!text-left"
            variant={TypographyVariant.dark}
          >
            Description:
          </Paragraph>
          <Paragraph
            level={3}
            className="!text-left font-bold"
            variant={TypographyVariant.dark}
          >
            {fields.description}
          </Paragraph>
          <Paragraph
            level={3}
            className="!text-left"
            variant={TypographyVariant.dark}
          >
            Trial:
          </Paragraph>
          <Paragraph
            level={3}
            className="!text-left"
            variant={TypographyVariant.dark}
          >
            {fields.trial_length} {fields.trial_time_frame}
          </Paragraph>
        </div>
        <Divider className="my-4" />
        <Title
          variant={TypographyVariant.dark}
          level={3}
          className="!text-left mb-4"
        >
          Pricing
        </Title>
        <div className="grid grid-cols-2">
          <Paragraph
            level={3}
            className="!text-left"
            variant={TypographyVariant.dark}
          >
            Price:
          </Paragraph>
          <Paragraph
            level={3}
            className="!text-left"
            variant={TypographyVariant.dark}
          >
            {!fields.price
              ? `Free`
              : `${fields.price} ${fields.currency} / ${fields.period}`}
          </Paragraph>

          <Paragraph
            level={3}
            className="!text-left"
            variant={TypographyVariant.dark}
          >
            API ID:
          </Paragraph>
          <Paragraph
            level={3}
            className="!text-left"
            variant={TypographyVariant.dark}
          >
            {fields.app_id}
          </Paragraph>

          <Paragraph
            level={3}
            className="!text-left"
            variant={TypographyVariant.dark}
          >
            Subscription:
          </Paragraph>
          <Paragraph
            level={3}
            className="!text-left"
            variant={TypographyVariant.dark}
          >
            {fields.period}
          </Paragraph>
          <Paragraph
            level={3}
            className="!text-left"
            variant={TypographyVariant.dark}
          >
            Usage type
          </Paragraph>
          <Paragraph
            level={3}
            className="!text-left"
            variant={TypographyVariant.dark}
          >
            {fields.usage_type}
          </Paragraph>
          <Paragraph
            level={3}
            className="!text-left"
            variant={TypographyVariant.dark}
          >
            Billing Scheme
          </Paragraph>
          <Paragraph
            level={3}
            className="!text-left"
            variant={TypographyVariant.dark}
          >
            {fields.billing_scheme}
          </Paragraph>
          <Paragraph
            level={3}
            className="!text-left"
            variant={TypographyVariant.dark}
          >
            Created:
          </Paragraph>
          <Paragraph
            level={3}
            className="!text-left"
            variant={TypographyVariant.dark}
          >
            {new Date().toLocaleDateString()}
          </Paragraph>
        </div>
        <Divider className="my-4" />
        {fields.usage_tiers?.length ? (
          <Title
            variant={TypographyVariant.dark}
            level={3}
            className="!text-left mb-4"
          >
            Plans
          </Title>
        ) : null}
        {fields.usage_tiers?.map((tier) => (
          <div className="grid grid-cols-2" key={tier.id}>
            <Paragraph
              level={3}
              className="!text-left"
              variant={TypographyVariant.dark}
            >
              price: ${tier.unit_amount_decimal}
            </Paragraph>
            <Paragraph
              level={3}
              className="!text-left"
              variant={TypographyVariant.dark}
            >
              {tier.up_to === 'inf'
                ? 'Unlimited API calls'
                : `up to: ${tier.up_to} API calls`}
            </Paragraph>
          </div>
        ))}
        <Button
          className="col-span-2 mt-4"
          variant={ButtonVariant.danger}
          type="button"
        >
          Delete product
        </Button>
      </>
    );
  }, [fields, router.query.tierId]);

  const { isOpen, onClose } = useDisclosure();

  if (error)
    return <ErrorText>Oops there was an error {error.message}</ErrorText>;

  return (
    <>
      <div className="page tiers-details-page">
        <Head>
          <title>Product Overview - {config.meta.title}</title>
        </Head>
        <div className="content">
          <BreadCrumbs
            links={[
              { url: ROUTES.PRODUCTS.BASE_URL, title: 'Products' },
              {
                url: `${ROUTES.PRODUCTS.BASE_URL}/${router.query.tierId}`,
                title: 'Overview a product'
              }
            ]}
          />

          {isLoading ? <Spinner /> : renderContent()}
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} title="Delete product?">
        <div className="data">
          <p>
            Do you want <span>to delete</span> the product?
          </p>
        </div>
        <div className="btns">
          <Button
            variant={ButtonVariant.danger}
            type="button"
            className="half-width action"
            // onClick={() => {}}
          >
            Delete
          </Button>
          <Button
            variant={ButtonVariant.outlined}
            type="button"
            className="half-width"
            onClick={onClose}
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Component;
