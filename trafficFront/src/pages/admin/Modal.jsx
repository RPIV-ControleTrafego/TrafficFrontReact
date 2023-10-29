import React from 'react';

const Modal = ({ children, closeModal }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg relative">
        <button onClick={closeModal} className="absolute top-0 right-0 p-2 m-4  text-gray-600">&times;</button>
        {children}
      </div>
    </div>
  );
};

export default Modal;