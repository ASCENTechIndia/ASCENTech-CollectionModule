// context/ConfirmModalContext.jsx
import React, { createContext, useContext, useState, useCallback } from "react";
import ConfirmModal from "../components/ConfirmModal";

const ConfirmModalContext = createContext(null);

export function ConfirmModalProvider({ children }) {
  const [modalState, setModalState] = useState({
    show: false,
    message: "Are you sure?",
    resolve: null,
  });

  const confirm = useCallback((message) => {
    return new Promise((resolve) => {
      setModalState({ show: true, message, resolve });
    });
  }, []);

  const handleConfirm = () => {
    modalState.resolve(true);
    setModalState((s) => ({ ...s, show: false }));
  };

  const handleCancel = () => {
    modalState.resolve(false);
    setModalState((s) => ({ ...s, show: false }));
  };

  return (
    <ConfirmModalContext.Provider value={{ confirm }}>
      {children}
      <ConfirmModal
        show={modalState.show}
        message={modalState.message}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </ConfirmModalContext.Provider>
  );
}

export function useConfirm() {
  const ctx = useContext(ConfirmModalContext);
  if (!ctx) throw new Error("useConfirm must be used inside ConfirmModalProvider");
  return ctx.confirm;
}