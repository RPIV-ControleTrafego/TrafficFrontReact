import React from 'react';
import { FileText } from 'react-feather';

const Modal = ({ isOpen, onClose, onDownloadCSV, date }) => {
 

  const isValidDate = /^(\d{4})-(\d{2})-(\d{2})$/.test(date);

  return (
    <div className={`${isOpen ? 'block' : 'hidden'} fixed inset-0 z-50 overflow-auto bg-gray-500 bg-opacity-75 flex items-center justify-center`}>
      <div className="bg-white w-1/2 p-8 rounded-lg">
        {!isValidDate && (
          <p className="text-red-600 mb-4">A data deve estar no formato yyyy-mm-dd</p>
        )}
        
        {isValidDate && (
          <button
            onClick={onDownloadCSV} // Call onDownloadCSV when button is clicked
            className="flex items-center mt-5 bg-green-500 text-white py-2 px-4 rounded hover:bg-green-700"
          >
            Baixar CSV
            <FileText size={20} style={{ marginLeft: '0.5em' }} /> {/* Include the FileText icon */}
          </button>
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
