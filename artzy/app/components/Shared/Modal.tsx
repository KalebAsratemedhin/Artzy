import React from 'react';

const Modal = ({ isOpen, onClose, children }: {isOpen: Boolean, onClose: () => void, children: React.ReactNode}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed w-screen inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white w-full p-2 m-20 rounded-lg shadow-lg">
        <button onClick={onClose} className="close-button">X</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
