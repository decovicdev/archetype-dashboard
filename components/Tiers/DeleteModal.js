import React, { forwardRef, useCallback, useContext, useState } from "react";

import Modal from "../_common/Modal";

import TierService from "../../services/tier.service";

import { HelperContext } from "../../context/helper";

const Component = forwardRef(({ id }, ref) => {
  const { showAlert } = useContext(HelperContext);

  const [inProgress, setProgress] = useState(false);

  const submitForm = useCallback(async () => {
    try {
      if (inProgress) {
        return;
      }
      setProgress(true);

      await TierService.deleteById(id);

      showAlert("Success", true);

      ref.current?.hide();
    } catch (e) {
      showAlert(e.message);
    } finally {
      setProgress(false);
    }
  }, [ref, inProgress, showAlert]);

  return (
    <Modal ref={ref} title={"Delete product?"} isBusy={inProgress}>
      <div className={"data"}>
        <p>
          Do you want <span>to delete</span> this product?
        </p>
      </div>
      <div className={"btns"}>
        <button
          type={"button"}
          className={"half-width action"}
          onClick={submitForm}
        >
          Delete
        </button>
        <button
          type={"button"}
          className={"half-width"}
          onClick={() => {
            ref.current?.hide();
          }}
        >
          Cancel
        </button>
      </div>
    </Modal>
  );
});

export default Component;