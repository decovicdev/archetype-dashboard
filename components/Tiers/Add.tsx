import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useMutation, useQueryClient } from 'react-query';
import Spinner from '../_common/Spinner';
import {
  billingOptions,
  pricingOptions,
  TIME_FRAMES_OPTIONS,
  trialTimeOptions
} from './assets';
import config from 'config';
import TierService from 'services/tier.service';
import { useHelpers } from 'context/HelperProvider';
import { ROUTES } from 'constant/routes';
import BreadCrumbs from 'components/_common/BreadCrumbs';
import Input from 'components/_common/Input';
import Switch from 'components/_common/Switch';
import Title from 'components/_typography/Title';
import Dropdown from 'components/_common/Dropdown';
import Button from 'components/_common/Button';
import Divider from 'components/_common/Divider';
import { TypographyVariant } from 'types/Typography';
import { ButtonVariant } from 'types/Button';
import Form from './Form';

const Component = () => {
  const router = useRouter();
  const { showAlert } = useHelpers();
  const queryClient = useQueryClient();

  const [fields, setFields] = useState({
    name: '',
    description: '',
    quota: 1000,
    pricingModel: 1,
    price: '',
    billingPeriod: 'MONTH',
    meteredUsage: false,
    hasTrial: false,
    trialLen: 0,
    trialTimeFrame: null
  });

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

  const { mutate: submitForm, isLoading } = useMutation(
    async () => {
      if (isLoading) return;
      if (!fields.name) throw new Error('Name is required field');
      if (!fields.price) throw new Error('Price is required field');

      await TierService.addNew({
        name: fields.name,
        description:
          !fields.hasTrial && !fields.description
            ? 'No trial'
            : fields.description,
        price: parseFloat(parseFloat(fields.price).toFixed(2)),
        period: fields.billingPeriod,
        currency: 'usd',
        has_quota: fields.meteredUsage && parseInt(`${fields.quota}`) > 0,
        quota: fields.meteredUsage ? parseInt(`${fields.quota}`) : 0,
        has_trial: fields.hasTrial,
        trial_length: fields.trialLen,
        trial_time_frame: TIME_FRAMES_OPTIONS[fields.trialTimeFrame]
      });
    },
    {
      onSuccess: async () => {
        await queryClient.invalidateQueries('products');
        showAlert('Success', true);
        void router.push(ROUTES.PRODUCTS.BASE_URL);
      },
      onError: (e: any) => {
        showAlert(e.message);
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
        trialLen: 1,
        trialTimeFrame: 'MONTH'
      });
    }
  }, [fields, changeFields]);

  return (
    <>
      <Head>
        <title>Add Product - {config.meta.title}</title>
      </Head>
      {isLoading && <Spinner />}
      <BreadCrumbs
        links={[
          { url: ROUTES.PRODUCTS.BASE_URL, title: 'Products' },
          { url: ROUTES.PRODUCTS.ADD, title: 'Add Product' }
        ]}
      />
      <Form
        fields={fields}
        changeFields={changeFields}
        clickAddTrial={clickAddTrial}
        submitForm={submitForm}
      />
    </>
  );
};

export default Component;
