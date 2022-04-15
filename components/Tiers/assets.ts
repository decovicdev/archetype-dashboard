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
  subscription: 'Subscription',
  tiered: 'Tiered Pricing',
  graduated: 'Graduated Pricing'
};

export const PRICING_MODEL_VALUES = {
  subscription: {
    id: 'subscription',
    usage_type: 'licensed',
    billing_schema: 'per_unit'
  },
  tiered: {
    id: 'tiered',
    usage_type: 'metered',
    billing_schema: 'tiered',
    tier_mode: 'volume'
  },
  graduated: {
    id: 'graduated',
    usage_type: 'metered',
    billing_schema: 'tiered',
    tier_mode: 'graduated'
  }
};

export const pricingOptions: Option[] = Object.entries(
  PRICING_MODEL_OPTIONS
).map(([key, val]) => ({
  label: val,
  value: PRICING_MODEL_VALUES[key]?.id
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
