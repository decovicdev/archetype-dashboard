import config from '../config';

import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';

const stripe = loadStripe(config.stripe.key);

export const StripeProvider = (props) => {
  return <Elements stripe={stripe}>{props.children}</Elements>;
};
