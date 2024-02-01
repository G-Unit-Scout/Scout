
import React, { useEffect, useRef, useState } from 'react';

const AdminModal = ({ isOpen, onClose, createNotification, handleNotificationCreate }) => {
  const [message, setMessage] = useState("")
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

  const handleChange = (e) => {
    setMessage(e.target.value);
  }

  const handleClick = (e) => {
    createNotification(message)
    handleNotificationCreate();
    onClose();
    setMessage("");
  }

  return (
    <dialog id="my_modal_2" className="modal" ref={dialogRef}>
        <div className="modal-box">
            <h3 className="font-bold text-lg">Message To Student -</h3>
            <textarea className="textarea textarea-bordered w-96 m-5" onChange={handleChange} placeholder="What would you like to say?"></textarea>
            <button className='btn' onClick={handleClick}>Send</button>
        </div>
        <form method="dialog" className="modal-backdrop" onClick={onClose}>
            <button type="button">close</button>
        </form>
    </dialog>
  );
};

export default AdminModal;