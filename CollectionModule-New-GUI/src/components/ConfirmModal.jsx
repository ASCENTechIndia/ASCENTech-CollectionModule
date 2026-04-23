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
        <div className="confirm-modal-icon">⚠️</div>
        <div className="confirm-modal-title">Confirm</div>
        <div className="confirm-modal-body">{message}</div>
        <div className="confirm-modal-actions">
          <button
            className="btn btn-outline-secondary"
            onClick={onCancel}
            disabled={disabled}
          >
            Cancel
          </button>
          <button
            className="btn btn-danger"
            onClick={onConfirm}
            disabled={disabled}
          >
            {disabled ? "Processing..." : "Confirm"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
