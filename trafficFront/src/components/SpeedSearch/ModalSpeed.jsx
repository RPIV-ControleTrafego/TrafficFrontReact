import React from 'react';

const Modal = ({ isOpen, onClose, speed, onDownloadCSV }) => {
  return (
    <div className={`modal ${isOpen ? 'block' : 'hidden'} fixed inset-0 flex items-center justify-center z-50`}>
      <div className="modal-overlay absolute w-full h-full bg-gray-900 opacity-50"></div>
      <div className="modal-container bg-white w-11/12 md:max-w-md mx-auto rounded shadow-lg z-50 overflow-y-auto">
        <div className="modal-content py-4 text-left px-6">
          <div className="flex justify-between items-center pb-3">
            <p className="text-2xl font-bold">Detalhes da Pesquisa</p>
            <button className="modal-close" onClick={onClose}>
              <span className="text-3xl">&times;</span>
            </button>
          </div>
          <p>
            Velocidade selecionada: {speed} Km/h
          </p>
          {/* Adicione mais conteúdo ao modal conforme necessário */}
          <div className="mt-5">
            <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 mr-2" onClick={onDownloadCSV}>
              Download CSV
            </button>
            <button className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400" onClick={onClose}>
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
