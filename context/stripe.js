
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import config from '../config';

const stripe = loadStripe(config.stripe.key);

export const StripeProvider = (props) => <Elements stripe={stripe}>{props.children}</Elements>;
