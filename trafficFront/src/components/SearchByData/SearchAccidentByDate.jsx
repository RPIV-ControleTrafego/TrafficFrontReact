import React, { useState } from 'react';
import axios from 'axios';
import Modal from './ModalDate'; // Adjust the path as needed

const DateSearch = () => {
  const [date, setDate] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [infractionData, setInfractionData] = useState(null);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const downloadCSV = () => {
    let csvContent = "carPlate,date,violation,carType,carColor,carBrand,veiculeOwnerName,veiculeOwneCPF,speed,maxSpeed,finePrice\n";
    infractionData.forEach((item) => {
      const rowData = `${item.carPlate},"${item.date}","${item.violation}","${item.carType}","${item.carColor}","${item.carBrand}","${item.veiculeOwnerName}","${item.veiculeOwneCPF}",${item.speed},${item.maxSpeed},${item.finePrice}\n`;
      csvContent += rowData;
    });
  
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'data.csv';
    link.click();
  };
  

  const fetchInfractionsByDate = async () => {
    try {
      const response = await axios.get(`http://localhost:8086/Accident/date/${date}`);
      console.log('Response data:', response.data);
      setAccidentData(response.data);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error fetching Accidents:', error);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchAccidentsByDate();
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="mt-10">
      <h1 className="text-2xl font-bold mb-4">Pesquisa de Infrações por Data</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <label className="block mb-2">
          Insira a data (dd/mm/yyyy):
          <input
            type="text"
            value={date}
            onChange={handleDateChange}
            className="border p-2"
            placeholder="dd/mm/yyyy"
          />
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
        Accidents={AccidentData}
        date={date}
        onDownloadCSV={downloadCSV}
      />
    </div>
  );
};

export default DateSearch;