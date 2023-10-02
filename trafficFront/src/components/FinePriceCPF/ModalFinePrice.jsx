import React from 'react';

const Modal = ({ isOpen, onClose, totalFinePrice }) => {
  return (
    <div className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center`}>
      <div className="bg-white w-1/2 p-8 rounded-lg">
        {totalFinePrice !== null ? (
          <div>
            <p>Total de multas: {totalFinePrice}</p>
          </div>
        ) : (
          <p className="text-red-600 mb-4">Erro ao buscar o total de multas.</p>
        )}

        <button
          className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 ml-4"
          onClick={onClose}
        >
          Fechar
        </button>
      </div>
    </div>
  );
};

export default Modal;
