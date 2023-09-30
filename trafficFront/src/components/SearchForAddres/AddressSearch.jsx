import React, { useState } from 'react';
import axios from 'axios';
import AddressModal from './AddressModal'; // Make sure to adjust the path according to your file structure

const AddressSearch = () => {
  const [speed, setSpeed] = useState('');
  const [gtorLw, setGtorLw] = useState('speed-greater');
  const [AccidentData, setAccidentData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [address, setAddress] = useState('');

  const handleSpeedChange = (event) => {
    setSpeed(event.target.value);
  };

  const handleGtorLwChange = (event) => {
    setGtorLw(event.target.value);
  };

  const downloadCSV = () => {
    let csvContent = "carPlate,date,violation,carType,carColor,carBrand,veiculeOwnerName,veiculeOwneCPF,speed,maxSpeed,finePrice\n";
    AccidentData.forEach((item) => {
      const rowData = `${item.carPlate},"${item.date}","${item.violation}","${item.carType}","${item.carColor}","${item.carBrand}","${item.veiculeOwnerName}","${item.veiculeOwneCPF}",${item.speed},${item.maxSpeed},${item.finePrice}\n`;
      csvContent += rowData;
    });
  
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'data.csv';
    link.click();
  };
  
  const fetchSpeedSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:8086/Accident/${gtorLw}/${speed}`);
      console.log('Response data:', response.data);
      setIsModalOpen(true);
      setAccidentData(response.data);
      
      // Assuming you have an address in the response data, you can set it and open the address modal
      const addressData = response.data.address;
      if (addressData) {
        setAddress(addressData);
        setIsAddressModalOpen(true);
      }
    } catch (error) {
      console.error('Erro ao buscar o total de multas:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchSpeedSearch();
  };
  
  const closeModal = () => {
    setIsModalOpen(false);
  };

  const closeAddressModal = () => {
    setIsAddressModalOpen(false);
  };

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold mb-4">Pesquisa de Infrações por Velocidade</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block mb-2">
          Insira a velocidade em km/h:
          <input
            type="text"
            value={speed}
            onChange={handleSpeedChange}
            className="border p-2"
            placeholder='Velocidade (Km/h)'
          />
        </label>
        <label className="block mb-2">
          Escolha o tipo:
          <select
            value={gtorLw}
            onChange={handleGtorLwChange}
            className="border p-2"
          >
            <option value="speed-greater">Velocidade Maior que (Km/h)</option>
            <option value="speed-lower">Velocidade Menor que (Km/h)</option>
          </select>
        </label>
       
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          Buscar
        </button>
      </form>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        speed={speed}
        onDownloadCSV={downloadCSV}
      />
      
      {/* AddressModal */}
      <AddressModal
        isOpen={isAddressModalOpen}
        onClose={closeAddressModal}
        address={address}
        onCopyAddress={() => {
          // Implement your logic for copying the address here
          // You can use the 'address' state variable for the address value
        }}
      />
    </div>
  );
};

export default AddressSearch;
