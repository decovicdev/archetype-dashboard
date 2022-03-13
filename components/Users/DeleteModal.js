import { forwardRef, useCallback, useContext, useState } from "react";

import Modal from "../_common/Modal";

import CustomerService from "../../services/customer.service";

import { HelperContext } from "../../context/helper";

const Component = forwardRef(function Component({ id, onSuccess }, ref) {
  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);

  const deleteUser = useCallback(async () => {
    try {
      if (inProgress) {
        return;
      }
      setProgress(true);

      await CustomerService.deleteById(id);

      showAlert("Success", true);

      if (onSuccess) {
        onSuccess();
      }
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, [id, onSuccess, inProgress, showAlert]);

  return (
    <Modal ref={ref} title="Delete a customer?" isBusy={inProgress}>
      <div className="data">
        <p>
          Do you want to <span>delete</span> the customer?
        </p>
      </div>
      <div className="btns">
        <button
          type="button"
          className="half-width action"
          onClick={() => deleteUser()}
        >
          Delete
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
