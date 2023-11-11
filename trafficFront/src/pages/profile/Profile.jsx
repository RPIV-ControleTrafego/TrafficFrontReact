import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({});
  const [finesData, setFinesData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUser(loggedInUser);
      fetchData();
    }
  }, []);

  const fetchData = () => {
    axios.get(`http://localhost:7000/user/profile`)
      .then(response => {
        setUser(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter informações do usuário:', error);
      });

    axios.get(`http://localhost:7000/user/search-fines?query=example&startDate=${startDate}&endDate=${endDate}`)
      .then(response => {
        setFinesData(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter dados de multas:', error);
      });

    axios.get(`http://localhost:7000/user/calculate-fines?query=example&startDate=${startDate}&endDate=${endDate}`)
      .then(response => {
        console.log('Resposta do cálculo de multas:', response.data);
      })
      .catch(error => {
        console.error('Erro ao calcular multas:', error);
      });
  };

  const payFine = (fineId) => {
    console.log('Pagamento da multa com ID:', fineId);
  };

  return (
    <div className="max-w-2xl mx-auto p-8 border rounded shadow-md">
      <h2 className="text-2xl font-bold mb-4">Perfil do Usuário</h2>
      <p><strong>Username:</strong> {user.username}</p>
      <p><strong>Email:</strong> {user.email}</p>

      <div className="mt-6 mb-4">
        <label className="block text-sm font-medium text-gray-700">Data de Início:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="mt-1 p-2 border rounded-md"
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700">Data de Fim:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="mt-1 p-2 border rounded-md"
        />
      </div>

      <button
        onClick={fetchData}
        className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700"
      >
        Buscar Multas por Data
      </button>

      <h2 className="text-2xl font-bold mt-6 mb-4">Dados de Multas</h2>
      <ul className="list-none p-0">
        {finesData.map(fine => (
          <li key={fine.id} className="mb-2 flex justify-between items-center">
            <span className="text-base">{fine.description}</span>
            <button
              onClick={() => payFine(fine.id)}
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700"
            >
              Pagar Multa
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
