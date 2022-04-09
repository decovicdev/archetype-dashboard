import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  TIME_FRAMES_OPTIONS,
  BILLING_OPTIONS,
  PRICING_MODEL_OPTIONS
} from './assets';
import config from 'config';
import Spinner from 'components/_common/Spinner';
import Modal from 'components/_common/Modal';
import TierService from 'services/tier.service';
import { useHelpers } from 'context/HelperProvider';
import { ROUTES } from 'constant/routes';
import useDisclosure from 'hooks/useDisclosure';
import Input from 'components/_common/Input';
import { TypographyVariant } from 'types/Typography';
import Title from 'components/_typography/Title';
import Switch from 'components/_common/Switch';
import Divider from 'components/_common/Divider';
import Dropdown, { Option } from 'components/_common/Dropdown';
import Button from 'components/_common/Button';
import { ButtonVariant } from 'types/Button';
import ErrorText from 'components/_typography/ErrorText';
import Paragraph from 'components/_typography/Paragraph';
import BreadCrumbs from 'components/_common/BreadCrumbs';

const Component = () => {
  const router = useRouter();

  const { showAlert } = useHelpers();

  const [fields, setFields] = useState(null);

  const { isLoading } = useQuery(
    ['product', router.query.tierId],
    async () => TierService.getById(router.query.tierId as string),
    {
      onError: (e: any) => showAlert(e.message),
      onSuccess: (newData) => {
        setFields({
          name: newData.name,
          description: newData.description,
          quota: newData.quota,
          pricingModel: 1,
          price: newData.price,
          billingPeriod: newData.period,
          meteredUsage: newData.has_quota && parseInt(newData.quota) > 0,
          hasTrial: newData.has_trial,
          trialLen: newData.trial_length,
          trialTimeFrame: newData.trial_time_frame
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
      await TierService.updateById(router.query.tierId, {
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
        trialLen: 1,
        trialTimeFrame: 'MONTH'
      });
    }
  }, [fields, changeFields]);

  const { isOpen, onOpen, onClose } = useDisclosure();

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
      {fields ? (
        <>
          <Title
            variant={TypographyVariant.dark}
            level={3}
            className="!text-left mb-2"
          >
            Product Information
          </Title>
          <Input
            name="name"
            placeholder="Name"
            label="Name"
            value={fields.name}
            onChange={(e) => changeFields('name', e.target.value)}
          />
          <Input
            name="description"
            placeholder="Description"
            label="Description"
            value={fields.description}
            onChange={(e) => changeFields('description', e.target.value)}
          />

          <Switch
            label={fields.meteredUsage ? 'Usage is metered' : 'Unlimited Quota'}
            checked={fields.meteredUsage}
            onChange={(checked) => changeFields('meteredUsage', checked)}
          />
          {fields.meteredUsage && (
            <Input
              name="quota"
              placeholder="Add quota"
              htmlType="number"
              label="Quota"
              value={fields.quota}
              onChange={(e) => {
                if (e.target.value && !/^[0-9]*$/g.test(e.target.value)) return;
                changeFields('quota', e.target.value);
              }}
            />
          )}

          <Divider className="my-3" />

          <Title
            variant={TypographyVariant.dark}
            level={3}
            className="!text-left mb-2"
          >
            Price Information
          </Title>
          <Title
            variant={TypographyVariant.dark}
            level={3}
            className="!text-left mb-2"
          >
            Pricing details
          </Title>
          <Dropdown
            label="Pricing model"
            // name="pricingModel"
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
            // name="billingPeriod"
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
                htmlType="number"
                value={fields.trialLen}
                onChange={(e) => changeFields('trialLen', e.target.value)}
              />
              <Dropdown
                // name="trialTimeFrame"
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

          <div className="flex space-x-2">
            <Button onClick={onOpen}>Save</Button>
            <Button
              variant={ButtonVariant.outlined}
              url={`${ROUTES.PRODUCTS.BASE_URL}/${router.query.tierId}`}
            >
              Cancel
            </Button>
          </div>
        </>
      ) : (
        <ErrorText>Product not found.</ErrorText>
      )}

      <Modal isOpen={isOpen} onClose={onClose} title="Save product?">
        <Paragraph>
          Do you want <span className="font-bold">to save</span> the changes?
        </Paragraph>
        <Paragraph>
          If you choose <span className="font-bold">not to save</span> changes
          will be lost
        </Paragraph>
        <div className="w-full flex space-x-2">
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
