import Spinner from 'components/_common/Spinner';
import { useApi } from 'context/ApiProvider';
import { useHelpers } from 'context/HelperProvider';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useQuery } from 'react-query';

const Payments: FC = () => {
  const router = useRouter();
  const { showAlert } = useHelpers();
  const { payment } = useApi();

  useQuery({
    queryKey: ['checkoutSessionId'],
    queryFn: () =>
      payment.generateCheckoutLink({
        checkout_session_id: router.query.checkout_session_id as string
      }),
    onSuccess: (data) => {
      window.location.replace(data.url);
    },
    onError: () => {
      showAlert('Something went wrong', false);
    },
    enabled: !!router.query.checkout_session_id
  });

  return <Spinner />;
};

export default Payments;
