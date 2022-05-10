import { useMutation, useQueryClient } from 'react-query';
import { useRouter } from 'next/router';
import Modal from 'components/_common/Modal';

import Paragraph from 'components/_typography/Paragraph';
import { useHelpers } from 'context/HelperProvider';
import Button from 'components/_common/Button';
import { ButtonVariant } from 'types/Button';
import { ROUTES } from 'constant/routes';
import { useApi } from 'context/ApiProvider';

const DeleteUserModal = ({ id, isOpen, onClose }) => {
  const { showAlert } = useHelpers();
  const queryClient = useQueryClient();
  const router = useRouter();
  const { user } = useApi();

  const { mutate: deleteUser, isLoading: isDeleteUserLoading } = useMutation(
    async () => {
      if (isDeleteUserLoading) return;
      await user.deleteById(router.query.userId || id);
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
