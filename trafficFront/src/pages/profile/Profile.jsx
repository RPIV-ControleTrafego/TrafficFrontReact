import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({});
  const [finesData, setFinesData] = useState([]);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [infractions, setInfractions] = useState([]);
  const [selectedFines, setSelectedFines] = useState([]);
  const [selectedGridFines, setSelectedGridFines] = useState([]);
  const [selectedCurrency, setSelectedCurrency] = useState('real');
  const [totalFinePrice, setTotalFinePrice] = useState(0);
  const [latestInfraction, setLatestInfraction] = useState(null);
  const [paidInfractions, setPaidInfractions] = useState([]);
  const [nonPaidInfractions, setNonPaidInfractions] = useState([]);

<<<<<<< HEAD
  const fetchData = async () => {
=======
  useEffect(() => {
    fetchPaidInfractions();
    fetchNonPaidInfractions();
  }, [selectedCurrency]);

  const fetchPaidInfractions = () => {
    axios.get(`http://localhost:8086/infraction/list-paid/${selectedCurrency}/${user.cpf}`)
      .then(response => {
        setPaidInfractions(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter multas pagas:', error);
      });
  };

  const fetchNonPaidInfractions = () => {
    axios.get(`http://localhost:8086/infraction/list-non-paid/${selectedCurrency}/${user.cpf}`)
      .then(response => {
        setNonPaidInfractions(response.data);
      })
      .catch(error => {
        console.error('Erro ao obter multas não pagas:', error);
      });
  };

  const payIndividualFine = (fineId) => {
    axios.post(`http://localhost:8086/infraction/pay/${fineId}`)
      .then(() => {
        // Atualizar a lista de multas pagas e não pagas após o pagamento individual
        fetchPaidInfractions();
        fetchNonPaidInfractions();
      })
      .catch(error => {
        console.error('Erro ao pagar a multa:', error);
      });
  };
  useEffect(() => {
>>>>>>> main
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
    if (loggedInUser) {
      setUser(loggedInUser);}

    console.log('Fetching data...');
    try {
      const userResponse = await axios.get(`http://localhost:7000/user/findUser?username=${user.username}`);
      console.log('User data:', userResponse.data);
     



      const latestInfractionResponse = await axios.get(`http://localhost:8086/infraction/latest/${user.cpf}`);
      console.log('Latest infraction data:', latestInfractionResponse.data);
     
      const listByCPFResponse = await axios.get(`http://localhost:8086/infraction/list-by-cpf/${user.cpf}`);
      console.log('List by CPF data:', listByCPFResponse.data);
      
      const totalFinePriceResponse = await axios.get(`http://localhost:8086/infraction/total-fine-price/${selectedCurrency}/${user.cpf}`);
      console.log('Total fine price data:', totalFinePriceResponse.data);
  
<<<<<<< HEAD
      // Update state
      setUser(userResponse.data);
      setLatestInfraction(latestInfractionResponse.data);
      setListByCPF(listByCPFResponse.data);
      setTotalFinePrice(totalFinePriceResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
=======
  const intervalId = setInterval(() => {
    fetchData();
  }, 1000000000000);
  

  function toggleSelect(fineId, isGrid) {
    if (isGrid) {
      setSelectedGridFines((prevSelectedFines) => {
        if (prevSelectedFines.includes(fineId)) {
          return prevSelectedFines.filter((id) => id !== fineId);
        } else {
          return [...prevSelectedFines, fineId];
        }
      });
    } else {
      setSelectedFines((prevSelectedFines) => {
        if (prevSelectedFines.includes(fineId)) {
          return prevSelectedFines.filter((id) => id !== fineId);
        } else {
          return [...prevSelectedFines, fineId];
        }
      });
>>>>>>> main
    }
  };

  useEffect(() => {
    fetchData();


    const intervalId = setInterval(() => {
      fetchData();
    }, 1000000);

    // Cleanup function to clear the interval when the component is unmounted
    return () => clearInterval(intervalId);
  }, [user.username, user.cpf, selectedCurrency]);




  // useEffect(() => {
  //   fetchData();

  //   const intervalId = setInterval(() => {
  //     fetchData();
  //   }, 10000);

  //   // Cleanup function to clear the interval when the component is unmounted
  //   return () => clearInterval(intervalId);
  // }, [user.username, user.cpf, selectedCurrency]);

  const toggleSelect = (fineId, isGrid) => {
    // ... (no changes here)
  };

  const handleCurrencyChange = () => {
    fetchData();  // Assuming that you want to fetch data when the currency changes
  };

  const payFine = (fineId) => {
    console.log('Pagamento da multa com ID:', fineId);
    // Add logic for paying the fine if needed
  };


  const handleLogout = async () => {
    try {
      const response = await axios.get('http://localhost:7000/user/logout');
      console.log(response.data);

      // history.push("/login");
      window.location.href = '/login'; // Exemplo de redirecionamento para a página de login
    } catch (error) {
      // Lidar com erros, se necessário
      console.error('Erro durante o logout', error);
    }
  };

  function confirmLogout() {
    const userConfirmed = window.confirm("Tem certeza de que deseja sair do sistema?");
    if (userConfirmed) {
      handleLogout();
    }
  }




  return (

    
    <div className="max-w-2xl mx-auto p-8 border rounded shadow-md bg-white mt-60">

 
             
                  <button
                    onClick={confirmLogout}
                    className="block py-2 pl-3 pr-4 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                  >
                    Logout
                  </button>
            
              
           

      <h2 className="text-3xl font-bold mb-6 text-gray-800">Perfil do Usuário</h2>
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div>
          <p className="text-gray-700">
            <span className="font-semibold">Username:</span> {user.username}
          </p>
          <p className="text-gray-700">
            <span className="font-semibold">Email:</span> {user.email}
          </p>
        </div>
        <div className="flex items-center justify-end">
        </div>
      </div>
  
      <h2 className="text-3xl font-bold mt-8 mb-6 text-gray-800">Dados de Multas</h2>
  
              <div className="mb-8">
          <h3 className="text-3xl font-bold mb-4 text-red-500">Última multa do CPF</h3>
          <div className="mb-4">
            <div className="flex items-center mb-2">
              <p className="mr-2 font-semibold text-gray-700">Data:</p>
              <p className="text-lg text-green-500">{latestInfraction?.date}</p>
            </div>
            <div className="flex items-center">
              <p className="mr-2 font-semibold text-gray-700">Valor:</p>
              <p className="text-lg text-green-500">{latestInfraction?.finePrice}</p>
            </div>
          </div>
        </div>
  
      <ul className="list-none p-0">
        {finesData.map(fine => (
          <li key={fine.id} className="mb-4">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">{fine.description}</span>
              <button
                onClick={() => payFine(fine.id)}
                className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700"
              >
                Pagar Multa
              </button>
            </div>
          </li>
        ))}
      </ul>
  
      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-2 text-gray-800">Dados</h2>
        <p className="text-gray-700"><span className="font-semibold">Nome:</span> {user.username}</p>
        <p className="text-gray-700"><span className="font-semibold">Email:</span> {user.email}</p>
        <p className="text-gray-700"><span className="font-semibold">Role:</span> {user.role}</p>
        <p className="text-gray-700"><span className="font-semibold">CPF:</span> {user.cpf}</p>
      </div>
  
      <div className="mt-6 mb-4">
        <label className="block text-sm font-medium text-gray-700">Moeda:</label>
        <div className="flex items-center">
          <select
            value={selectedCurrency}
            onChange={(e) => setSelectedCurrency(e.target.value)}
            className="p-2 border rounded-md"
          >
            <option value="real">Real</option>
            <option value="dollar">Dollar</option>
            <option value="euro">Euro</option>
          </select>
          <button
            onClick={handleCurrencyChange}
            className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-700 ml-2"
          >
            Atualizar Moeda
          </button>
        </div>
        <p className="mt-2 text-gray-700"><span className="font-semibold">Total a ser pago:</span> {totalFinePrice}</p>
        <button
          onClick={() => payFine(fine.id)}
          className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700 mt-4"
        >
          Pagar Multa
        </button>


      </div>


      <h2 className="text-3xl font-bold mt-8 mb-6 text-gray-800">Multas Pagas</h2>
      <ul className="list-none p-0">
        {paidInfractions.map(fine => (
          <li key={fine.id} className="mb-4">
            {/* Renderizar as multas pagas */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">{fine.description}</span>
              <p className="text-gray-700">Valor: {fine.finePrice}</p>
            </div>
          </li>
        ))}
      </ul>

      <h2 className="text-3xl font-bold mt-8 mb-6 text-gray-800">Multas Não Pagas</h2>
      <ul className="list-none p-0">
        {nonPaidInfractions.map(fine => (
          <li key={fine.id} className="mb-4">
            {/* Renderizar as multas não pagas com botão de pagamento individual */}
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">{fine.description}</span>
              <button
                onClick={() => payIndividualFine(fine.id)}
                className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700"
              >
                Pagar Multa
              </button>
            </div>
          </li>
        ))}
      </ul>
        


    </div>
  );
};



export default Profile;
