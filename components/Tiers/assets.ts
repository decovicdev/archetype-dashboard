import { Option } from 'components/_common/Dropdown';

export const TIME_FRAMES_OPTIONS = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month'
};

export const BILLING_OPTIONS = {
  MONTH: 'month',
  YEAR: 'year'
};

export const PRICING_MODEL_OPTIONS = {
  1: 'Subscription'
};

export const pricingOptions: Option[] = Object.entries(
  PRICING_MODEL_OPTIONS
).map(([key, val]) => ({
  label: val,
  value: parseInt(key, 10)
}));

export const billingOptions: Option[] = Object.entries(BILLING_OPTIONS).map(
  ([key, val]) => ({
    label: val,
    value: key
  })
);

export const trialTimeOptions: Option[] = Object.entries(
  TIME_FRAMES_OPTIONS
).map(([key, val]) => ({
  label: val,
  value: key
}));
