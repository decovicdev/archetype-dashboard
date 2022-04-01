import React, { useCallback, useState } from 'react';
import Modal from '../_common/Modal';
import TierService from '../../services/tier.service';
import { useHelpers } from '../../context/HelperProvider';

const Component = ({ id, onSuccess, isOpen, onClose }) => {
  const { showAlert } = useHelpers();

  const [inProgress, setProgress] = useState(false);

  const submitForm = useCallback(async () => {
    try {
      if (inProgress) {
        return;
      }
      setProgress(true);

      await TierService.deleteById(id);

      showAlert('Success', true);

      onClose();

      if (onSuccess) {
        onSuccess();
      }
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, [inProgress, id, showAlert, onClose, onSuccess]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete product?"
      isBusy={inProgress}
    >
      <div className="data">
        <p>
          Do you want <span>to delete</span> this product?
        </p>
      </div>
      <div className="btns">
        <button type="button" onClick={submitForm}>
          Delete
        </button>
        <button type="button" onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default Component;
