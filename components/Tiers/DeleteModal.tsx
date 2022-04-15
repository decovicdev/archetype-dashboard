import React from 'react';
import { useMutation } from 'react-query';
import Modal from '../_common/Modal';
import TierService from '../../services/tier.service';
import { useHelpers } from '../../context/HelperProvider';
import Button from 'components/_common/Button';
import { ButtonVariant } from 'types/Button';

const Component = ({ id, onSuccess, isOpen, onClose }) => {
  const { showAlert } = useHelpers();

  const { mutate: submitForm, isLoading: isMutationLoading } = useMutation(
    async () => {
      if (isMutationLoading) return;
      await TierService.deleteById(id);
    },
    {
      onSuccess: () => {
        showAlert('Success', true);
        onClose();
        if (onSuccess) {
          onSuccess();
        }
      },
      onError: (e: any) => {
        showAlert(e.message);
      }
    }
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete product?"
      isBusy={isMutationLoading}
    >
      <div className="data">
        <p>
          Do you want <span>to delete</span> this product?
        </p>
      </div>
      <div className="w-full flex justify-between items-center mt-20">
        <Button
          variant={ButtonVariant.danger}
          type="button"
          onClick={() => submitForm()}
        >
          Delete
        </Button>
        <Button
          variant={ButtonVariant.outlined}
          type="button"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default Component;
