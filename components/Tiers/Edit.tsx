import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { v4 as uuid } from 'uuid';
import { TIME_FRAMES_OPTIONS } from './assets';
import Form from './Form';
import config from 'config';
import Spinner from 'components/_common/Spinner';
import Modal from 'components/_common/Modal';
import TierService from 'services/tier.service';
import { useHelpers } from 'context/HelperProvider';
import { ROUTES } from 'constant/routes';
import useDisclosure from 'hooks/useDisclosure';
import Button from 'components/_common/Button';
import { ButtonVariant } from 'types/Button';
import Paragraph from 'components/_typography/Paragraph';
import BreadCrumbs from 'components/_common/BreadCrumbs';
import { Tier } from 'types/Tiers';
import { TypographyVariant } from 'types/Typography';

const Component = () => {
  const router = useRouter();

  const { showAlert } = useHelpers();

  const [fields, setFields] = useState <any>({}) ;

  const { isLoading } = useQuery(
    ['product', router.query.tierId],
    async () => TierService.getById(router.query.tierId as string),
    {
      onError: (e: any) => showAlert(e.message),
      onSuccess: (newData: Tier) => {
        setFields({
          name: newData.name,
          description: newData.description,
          quota: newData.quota,
          pricingModel: {
            id:
              newData.usage_type === 'licensed' &&
              newData.billing_scheme === 'per_unit'
                ? 'subscription'
                : newData.tier_mode === 'graduated'
                ? 'graduated'
                : 'tiered',
            usage_type: newData.usage_type,
            billing_scheme: newData.billing_scheme,
            tier_mode: newData.tier_mode
          },
          price: newData.price,
          billingPeriod: newData.period,
          meteredUsage: newData.has_quota && newData.quota > 0,
          hasTrial: newData.has_trial,
          trialLen: newData.trial_length,
          trialTimeFrame: newData.trial_time_frame,
          plans: newData.usage_tiers?.map((field) => ({
            ...field,
            id: uuid()
          }))
        });
      }
    }
  );

  const changeFields = useCallback(
    (field, value, obj?: any) => {
      const result = { ...fields };

      if (!field && !value && obj) {
        for (const key in obj) {
          result[key] = obj[key];
        }
      } else {
        result[field] = value;
      }

      setFields(result);
    },
    [fields]
  );

  const queryClient = useQueryClient();

  const { mutate: submitForm, isLoading: isMutationLoading } = useMutation(
    async () => {
      if (isMutationLoading) return;
      await TierService.updateById(router.query.tierId as string, {
        name: fields.name,
        description:
          !fields.hasTrial && !fields.description
            ? 'No trial'
            : fields.description,
        price: parseFloat(parseFloat(fields.price).toFixed(2)),
        period: fields.billingPeriod,
        currency: 'usd',
        has_quota: fields.meteredUsage && parseInt(fields.quota) > 0,
        quota: fields.meteredUsage ? parseInt(fields.quota) : 0,
        has_trial: fields.hasTrial,
        trial_length: fields.trialLen,
        trial_time_frame: TIME_FRAMES_OPTIONS[fields.trialTimeFrame],
        usage_type: fields.pricingModel.usage_type,
        billing_scheme: fields.pricingModel.billing_scheme,
        tier_mode: fields.pricingModel.tier_mode,
        usage_tiers: fields.plans
      });
    },
    {
      onError: (e: any) => showAlert(e.message),
      onSuccess: async () => {
        await queryClient.invalidateQueries(['product', router.query.tierId]);
        showAlert('Success', true);
        void router.push(ROUTES.PRODUCTS.BASE_URL);
      }
    }
  );

  const clickAddTrial = useCallback(() => {
    if (fields.hasTrial) {
      changeFields(null, null, {
        hasTrial: false,
        trialLen: 0,
        trialTimeFrame: null
      });
    } else {
      changeFields(null, null, {
        hasTrial: true,
        trialLen: 7,
        trialTimeFrame: 'DAY'
      });
    }
  }, [fields, changeFields]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Head>
        <title>Edit Product - {config.meta.title}</title>
      </Head>
      {isLoading && <Spinner />}

      <BreadCrumbs
        links={[
          { url: ROUTES.PRODUCTS.BASE_URL, title: 'Products' },
          {
            url: `${ROUTES.PRODUCTS.EDIT}/${router.query.tierId}`,
            title: 'Edit Product'
          }
        ]}
      />
      <Form
        type="edit"
        fields={fields}
        changeFields={changeFields}
        clickAddTrial={clickAddTrial}
        submitForm={onOpen}
      />

      <Modal isOpen={isOpen} onClose={onClose} title="Save product?">
        <Paragraph variant={TypographyVariant.dark} className="my-2" level={2}>
          Do you want <span className="font-bold">to save</span> the changes?
        </Paragraph>
        <Paragraph variant={TypographyVariant.dark} className="my-2" level={2}>
          If you choose <span className="font-bold">not to save</span> changes
          will be lost
        </Paragraph>
        <div className="w-full flex justify-between space-x-2 mt-20 mb-2">
          <Button onClick={() => submitForm()}>Save</Button>
          <Button variant={ButtonVariant.outlined} onClick={onClose}>
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default Component;
