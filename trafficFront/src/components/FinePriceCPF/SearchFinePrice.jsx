import React, { useState } from 'react';
import axios from 'axios';
import Modal from './ModalFinePrice'; // Adjust the path according to your file structure

const SearchFinePriceCPF = () => {
  const [cpf, setCpf] = useState('');
  const [selectedCurrency, setSelectedCurrency] = useState('real');
  const [totalFinePrice, setTotalFinePrice] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCpfChange = (event) => {
    setCpf(event.target.value);
  };

  const handleCurrencyChange = (event) => {
    setSelectedCurrency(event.target.value);
  };

  const fetchTotalFinePrice = async () => {
    try {
      const response = await axios.get(`http://localhost:8086/infraction/total-fine-price/${selectedCurrency}/${cpf}`);
      setTotalFinePrice(response.data);
      setIsModalOpen(true); // Open the modal when the data is fetched
    } catch (error) {
      console.error('Error fetching total fine price:', error);
      setTotalFinePrice(null);
      setIsModalOpen(true); // Open the modal even if there's an error
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchTotalFinePrice();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold mb-4 text-center">Pesquisa de Total de Multas por CPF</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block mb-2">
          Insira o CPF:
          <input
            type="text"
            value={cpf}
            onChange={handleCpfChange}
            className="border p-2"
            placeholder="CPF"
          />
        </label>

        <label className="block mb-2">
          Escolha a moeda:
          <select
            value={selectedCurrency}
            onChange={handleCurrencyChange}
            className="border p-2"
          >
            <option value="real">Real (BRL)</option>
            <option value="dollar">Dólar (USD)</option>
            <option value="euro">Euro (EUR)</option>
            <option value="argentine-peso">Peso Argentino (ARS)</option>
          </select>
        </label>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </form>

      <Modal isOpen={isModalOpen} onClose={closeModal} totalFinePrice={totalFinePrice} />
    </div>
  );
};

export default SearchFinePriceCPF;
