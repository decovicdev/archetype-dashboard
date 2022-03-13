import { forwardRef, useCallback, useContext, useState } from "react";

import Modal from "../_common/Modal";

import CustomerService from "../../services/customer.service";

import { HelperContext } from "../../context/helper";

const Component = forwardRef(function Component({ id, onSuccess }, ref) {
  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);

  const clickSubmit = useCallback(async () => {
    try {
      if (inProgress) {
        return;
      }
      setProgress(true);

      await CustomerService.resetApiKey(id);

      showAlert("Success", true);

      if (onSuccess) {
        onSuccess();
      }

      ref.current.hide();
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, [inProgress, id, showAlert, onSuccess, ref]);

  return (
    <Modal ref={ref} title={"Delete a customer?"} isBusy={inProgress}>
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
        <button
          type="button"
          className="half-width"
          onClick={() => {
            if (ref.current) {
              ref.current.hide();
            }
          }}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
});

export default Component;
