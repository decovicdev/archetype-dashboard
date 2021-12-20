import { forwardRef, useState } from "react";

import Modal from "../_common/Modal";

const Component = forwardRef(({}, ref) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const clickDeleteAccount = () => {};

  return (
    <div className="delete-user-modal">
      <Modal ref={ref} isBusy={isDeleting}>
        <div className="data">
          <h1>Delete a customer?</h1>
          <div className="body">
            <p>Do you want to delete the customer?</p>
            <p>You have to choose a refund option</p>
            <div className="radioBtns">
              <input
                type="radio"
                name="refundType"
                value={"No Refund"}
                id="noRefund"
              />{" "}
              <label htmlFor="noRefund">No Refund</label>
              <br />
              <input
                type="radio"
                name="refundType"
                value={"Prorated"}
                id="prorated"
              />{" "}
              <label htmlFor="prorated">Prorated ($255.34)</label>
              <br />
              <input
                type="radio"
                name="refundType"
                value={"Full"}
                id="full"
              />{" "}
              <label htmlFor="full">Full ($5600.30)</label>
            </div>
          </div>
        </div>
        <div className="btns">
          <button
            type="button"
            className="btn clear-white"
            onClick={clickDeleteAccount}
          >
            Delete
          </button>
          <button
            type="button"
            className="btn grey"
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
    </div>
  );
});

export default Component;
