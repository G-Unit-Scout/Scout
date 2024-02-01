





// AdminModal.jsx
import React, { useEffect, useRef } from 'react';

const AdminModal = ({ isOpen, onClose }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (isOpen && dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [isOpen]);

  // Ensure to close the dialog properly if isOpen changes to false
  // Note: This part is optional and assumes you might programmatically
  // need to close the dialog from parent component without using the dialog's default close mechanism
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!isOpen && dialog && typeof dialog.close === 'function') {
      dialog.close();
    }
  }, [isOpen]);

  return (
    <dialog id="my_modal_2" className="modal" ref={dialogRef}>
        <div className="modal-box">
            <h3 className="font-bold text-lg">Hello!</h3>
            <p className="py-4">Press ESC key or click outside to close</p>
        </div>
        <form method="dialog" className="modal-backdrop" onClick={onClose}>
            <button type="button">close</button>
        </form>
    </dialog>
  );
};

export default AdminModal;
