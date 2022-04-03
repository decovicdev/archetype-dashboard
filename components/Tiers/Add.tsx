import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Spinner from '../_common/Spinner';
import {
  TIME_FRAMES_OPTIONS,
  BILLING_OPTIONS,
  PRICING_MODEL_OPTIONS
} from './assets';
import config from 'config';
import TierService from 'services/tier.service';
import { useHelpers } from 'context/HelperProvider';
import { ROUTES } from 'constant/routes';
import BreadCrumbs from 'components/_common/BreadCrumbs';
import Input from 'components/_common/Input';
import Switch from 'components/_common/Switch';
import Title from 'components/_typography/Title';
import Dropdown, { Option } from 'components/_common/Dropdown';
import Button from 'components/_common/Button';
import Divider from 'components/_common/Divider';
import { TypographyVariant } from 'types/Typography';

const Component = () => {
  const router = useRouter();

  const { showAlert } = useHelpers();

  const [inProgress, setProgress] = useState(false);
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

  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors }
  // } = useForm<CreateProductFormData>({ resolver: yupResolver(schema) });

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

  const submitForm = useCallback(async () => {
    try {
      if (inProgress) return;

      if (!fields.name) {
        return showAlert('Name is required field');
      }
      if (!fields.price) {
        return showAlert('Price is required field');
      }

      setProgress(true);

      await TierService.addNew({
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
        trial_time_frame: TIME_FRAMES_OPTIONS[fields.trialTimeFrame]
      });

      showAlert('Success', true);

      void router.push('/products');
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, [
    inProgress,
    fields.name,
    fields.price,
    fields.hasTrial,
    fields.description,
    fields.billingPeriod,
    fields.meteredUsage,
    fields.quota,
    fields.trialLen,
    fields.trialTimeFrame,
    showAlert,
    router
  ]);

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

  const pricingOptions: Option[] = Object.entries(PRICING_MODEL_OPTIONS).map(
    ([key, val]) => ({
      label: val,
      value: key
    })
  );

  const billingOptions: Option[] = Object.entries(BILLING_OPTIONS).map(
    ([key, val]) => ({
      label: val,
      value: key
    })
  );

  const trialTimeOptions: Option[] = Object.entries(TIME_FRAMES_OPTIONS).map(
    ([key, val]) => ({
      label: val,
      value: key
    })
  );

  return (
    <>
      <Head>
        <title>Add Product - {config.meta.title}</title>
      </Head>
      {inProgress && <Spinner />}
      <div className="flex flex-col space-y-2">
        <BreadCrumbs
          links={[
            { url: ROUTES.PRODUCTS.BASE_URL, title: 'Products' },
            { url: ROUTES.PRODUCTS.ADD, title: 'Add Product' }
          ]}
        />
        <Title variant={TypographyVariant.dark}>Product Information</Title>
        <Input
          name="name"
          placeholder="Add name"
          label="Name"
          value={fields.name}
          onChange={(e) => changeFields('name', e.target.value)}
        />
        <Input
          name="description"
          placeholder="Add description"
          label="Description"
          value={fields.description}
          onChange={(e) => changeFields('description', e.target.value)}
        />
        <Switch
          checked={fields.meteredUsage}
          onChange={(checked) => changeFields('meteredUsage', checked)}
        />
        {fields.meteredUsage && (
          <Input
            name="quota"
            placeholder="Add quota"
            label="Quota"
            value={fields.quota}
            onChange={(e) => {
              if (e.target.value && !/^[0-9]*$/g.test(e.target.value)) return;
              changeFields('quota', e.target.value);
            }}
          />
        )}
        <Divider />
        <Title variant={TypographyVariant.dark}>Price Information</Title>
        <Title variant={TypographyVariant.dark}>Pricing details</Title>
        <Dropdown
          label="Pricing model"
          name="pricingModel"
          value={pricingOptions.find(
            (option) => option.value === fields.pricingModel
          )}
          onChange={(option) => changeFields('pricingModel', option.value)}
          options={pricingOptions}
        />
        <Input
          name="price"
          placeholder="Add price"
          label="Price"
          value={fields.price}
          onChange={(e) => {
            if (e.target.value && !/^[0-9]*\.?[0-9]*$/g.test(e.target.value))
              return;
            changeFields('price', e.target.value);
          }}
          onBlur={(e) => {
            if (!e.target.value) return;
            changeFields('price', parseFloat(e.target.value).toFixed(2));
          }}
        />
        <Dropdown
          name="billingPeriod"
          placeholder="Add billing period"
          label="Billing period"
          value={billingOptions.find(
            (option) => option.value === fields.billingPeriod
          )}
          onChange={(option) => changeFields('billingPeriod', option.value)}
          options={billingOptions}
        />
        <Button onClick={clickAddTrial}>
          {fields.hasTrial ? '- Remove' : '+ Add'} free trial
        </Button>
        {fields.hasTrial && (
          <>
            <Input
              name="length"
              placeholder="Add length"
              label="Length"
              type="number"
              value={fields.trialLen}
              onChange={(e) => changeFields('trialLen', e.target.value)}
            />
            <Dropdown
              name="trialTimeFrame"
              placeholder="Add trial time"
              label="Type"
              value={trialTimeOptions.find(
                (option) => option.value === fields.trialTimeFrame
              )}
              onChange={(option) =>
                changeFields('trialTimeFrame', option.value)
              }
              options={trialTimeOptions}
            />
          </>
        )}
        <Divider />
        <Button onClick={submitForm}>Create</Button>
        <Link href={ROUTES.PRODUCTS.BASE_URL}>
          <a className="text-black">Cancel</a>
        </Link>
      </div>
    </>
  );
};

export default Component;
