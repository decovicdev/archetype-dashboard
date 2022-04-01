import React, { useCallback, useState } from 'react';
import Modal from '../_common/Modal';
import EndpointService from '../../services/endpoint.service';
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

      await EndpointService.deleteById(id);

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
      title="Delete endpoint?"
      isBusy={inProgress}
    >
      <div className="data">
        <p>
          Do you want <span>to delete</span> this endpoint?
        </p>
      </div>
      <div className="btns">
        <button
          type="button"
          className="half-width action"
          onClick={submitForm}
        >
          Delete
        </button>
        <button type="button" className="half-width" onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default Component;
