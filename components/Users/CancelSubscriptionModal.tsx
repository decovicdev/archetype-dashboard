import Button from 'components/_common/Button';
import Modal from 'components/_common/Modal';
import { useApi } from 'context/ApiProvider';
import { useHelpers } from 'context/HelperProvider';
import { useRouter } from 'next/router';
import { ButtonVariant } from 'types';

const CancelSubscriptionModal = ({ isOpen, onClose, refetch }) => {
  const { user } = useApi();
  const router = useRouter();
  const { showAlert } = useHelpers();

  const handleCancelSubscription = async (immadiately: boolean) => {
    try {
      await user.cancelSubscription({
        custom_uid: router.query.userId as string,
        cancel_immediately: immadiately
      });
      refetch();
      onClose();
    } catch (error) {
      showAlert('Oops, something went wrong', false);
      console.error(error.message);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Payment link"
      className="flex"
    >
      <div className="flex gap-2 items-center rounded-sm p-2 mt-2">
        <Button
          onClick={() => handleCancelSubscription(true)}
          variant={ButtonVariant.outlined}
        >
          Cancel now
        </Button>
        <Button
          onClick={() => handleCancelSubscription(false)}
          variant={ButtonVariant.primary}
        >
          Cancel at period end
        </Button>
      </div>
    </Modal>
  );
};

export default CancelSubscriptionModal;
