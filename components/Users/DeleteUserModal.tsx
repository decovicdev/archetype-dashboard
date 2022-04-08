import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import Modal from 'components/_common/Modal';
import CustomerService from 'services/customer.service';
import Paragraph from 'components/_typography/Paragraph';
import { useHelpers } from 'context/HelperProvider';
import Button from 'components/_common/Button';
import { ButtonVariant } from 'types/Button';
import { ROUTES } from 'constant/routes';

const DeleteUserModal = ({ id, isOpen, onClose }) => {
  const { showAlert } = useHelpers();
  const queryClient = useQueryClient();
  const router = useRouter();

  const { mutate: deleteUser, isLoading: isDeleteUserLoading } = useMutation(
    async () => {
      try {
        if (isDeleteUserLoading) return;
        await CustomerService.deleteById(router.query.userId || id);
      } catch (e) {
        showAlert(e.message);
      }
    },
    {
      onError: (e: any) => showAlert(e.message),
      onSuccess: async () => {
        await queryClient.invalidateQueries('users');
        showAlert('Success', true);
        void router.push(ROUTES.USERS.BASE_URL);
      }
    }
  );

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Delete a customer?">
      <Paragraph>
        Do you want <span className="font-bold">to delete</span> the customer?
      </Paragraph>
      <div className="w-full flex space-x-2">
        <Button variant={ButtonVariant.danger} onClick={() => deleteUser()}>
          Delete
        </Button>
        <Button variant={ButtonVariant.outlined} onClick={onClose}>
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteUserModal;
