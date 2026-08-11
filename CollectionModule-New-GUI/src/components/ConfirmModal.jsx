// components/ConfirmModal.jsx
import React from "react";

const ConfirmModal = ({
  show,
  onConfirm,
  onCancel,
  message = "Are you sure you want to submit?",
  disabled = false,
}) => {
  if (!show) return null;

  return (
    <div className="confirm-modal-backdrop" onClick={onCancel}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>

        <div className="confirm-modal-icon-wrap">⚠️</div>

        <div className="confirm-modal-title">Are you sure?</div>

        <div className="confirm-modal-body">{message}</div>

        <div className="confirm-modal-actions">
          <button
            className="btn-cancel"
            onClick={onCancel}
            disabled={disabled}
          >
            Cancel
          </button>
          <button
            className="btn-confirm"
            onClick={onConfirm}
            disabled={disabled}
          >
            {disabled ? (
              <>
                <span className="confirm-spinner" />
                Processing...
              </>
            ) : (
              "Confirm"
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

export default ConfirmModal;