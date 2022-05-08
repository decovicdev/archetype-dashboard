import Spinner from "components/_common/Spinner";
import { useHelpers } from "context/HelperProvider";
import { useRouter } from "next/router";
import { FC, } from "react";
import { useQuery } from "react-query";
import PaymentService from "services/payments.service";

const Payments: FC = () => {
  const router = useRouter();
  const { showAlert } = useHelpers();

  useQuery({
    queryKey: ['checkoutSessionId'],
    queryFn: () => PaymentService.generateCheckoutLink({ checkout_session_id: router.query.checkout_session_id as string }),
    onSuccess: (data) => { window.location.replace(data.url) },
    onError: (error) => {
      console.error(error);
      showAlert('Something went wrong', false)
    },
    enabled: !!router.query.checkout_session_id
  });

  return <Spinner />
}

export default Payments;