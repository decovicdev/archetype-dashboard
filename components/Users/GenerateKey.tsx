import { useCallback, useState } from 'react';

import Modal from '../_common/Modal';

import { useHelpers } from '../../context/HelperProvider';
import { useApi } from 'context/ApiProvider';

const Component = ({ id, onSuccess, isOpen, onClose }) => {
  const { showAlert } = useHelpers();
  const { user } = useApi();

  const [inProgress, setProgress] = useState(false);

  const clickSubmit = useCallback(async () => {
    try {
      if (inProgress) {
        return;
      }
      setProgress(true);

      await user.resetApiKey(id);

      showAlert('Success', true);

      if (onSuccess) {
        onSuccess();
      }

      onClose();
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, [inProgress, id, showAlert, onSuccess, onClose]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete a customer?"
      isBusy={inProgress}
    >
      <div className="data">
        <p>Are you sure you want to reset this user’s api key?</p>
      </div>
      <div className="btns">
        <button
          type="button"
          className="half-width action"
          onClick={() => clickSubmit()}
        >
          Yes
        </button>
        <button type="button" className="half-width" onClick={onClose}>
          Cancel
        </button>
      </div>
    </Modal>
  );
};

export default Component;
