  import React, { useState, useEffect } from 'react';
  import axios from 'axios';

  const BASE_URL_USER = 'http://localhost:7000'; // Set your base URL for user-related endpoints
  const BASE_URL_INFRACTION = 'http://localhost:8086'; // Set your base URL for infraction-related endpoints

  const makeRequest = async (baseUrl, endpoint, params = {}) => {
    try {
      const response = await axios.get(`${baseUrl}/${endpoint}`, { params });
      return response.data;
    } catch (error) {
      console.error(`Error fetching data from ${endpoint}:`, error);
      throw error;
    }
  };

  const Profile = () => {
    const [loggedInUser, setLoggedInUser] = useState({});
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
    const [isPaymentConfirmed, setIsPaymentConfirmed] = useState(false);


    const fetchData = async () => {
      try {
        const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));
        if (loggedInUser) {
          setUser(loggedInUser);
        }

        console.log('User data:', user);

        console.log('Fetching data...');

        // Fetch user data
        const userResponse = await makeRequest(BASE_URL_USER, 'user/findUser', { username: loggedInUser.username });
        setLoggedInUser(userResponse);
        setUser(userResponse);

        // Fetch total fine price
        const totalFinePriceResponse = await makeRequest(BASE_URL_INFRACTION, `infraction/total-fine-price/${selectedCurrency}/${userResponse.cpf}`);
        setTotalFinePrice(totalFinePriceResponse);

        // Fetch list of infractions
        const listByCPFResponse = await makeRequest(BASE_URL_INFRACTION, `infraction/list-by-cpf/${selectedCurrency}/${userResponse.cpf}`);
        setInfractions(listByCPFResponse);

        // Fetch latest infraction
        const latestInfractionResponse = await makeRequest(BASE_URL_INFRACTION, `infraction/latest/${userResponse.cpf}`);
        setLatestInfraction(latestInfractionResponse);

        // Fetch paid infractions
        const paidInfractionsResponse = await makeRequest(BASE_URL_INFRACTION, `infraction/list-paid/${userResponse.cpf}`);
        setPaidInfractions(paidInfractionsResponse);

        // Fetch non-paid infractions
        const nonPaidInfractionsResponse = await makeRequest(BASE_URL_INFRACTION, `infraction/list-non-paid/${userResponse.cpf}`);
        setNonPaidInfractions(nonPaidInfractionsResponse);

        console.log('idInfraction:', userResponse.idInfraction);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    useEffect(() => {
      fetchData();
      const storedUser = JSON.parse(localStorage.getItem('loggedInUser'));

      const intervalId = setInterval(() => {
        fetchData();
      }, 1000000);

      // Cleanup function to clear the interval when the component is unmounted
      return () => clearInterval(intervalId);
    }, [loggedInUser.username, loggedInUser.cpf, selectedCurrency]);


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

     const payFine = (idInfraction) => {
    console.log('Trying to pay fine with idInfraction:', idInfraction);

    axios
      .post(`http://localhost:8086/infraction/pay/${idInfraction}`)
      .then((response) => {
        console.log('Payment successful:', response.data);
        fetchData(); // Assuming you want to fetch data after successful payment
        setIsPaymentConfirmed(true); // Set the flag to show the payment confirmation message
      })
      .catch((error) => {
        console.error('Error during payment:', error);
      });
  };

    const handleLogout = async () => {
      try {
        const response = await axios.get('http://localhost:7000/user/logout');
        console.log(response.data);
        localStorage.removeItem('loggedInUser');


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
    const renderFineList = (fines) => (
      <ul className="list-none p-0">
        {fines.map((fine) => (
          <li key={fine.id?.timestamp} className="mb-4">
            <div className="border p-4 rounded-md">
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-lg font-semibold text-gray-800">{fine.violation}</p>
                  <p className="text-gray-700">Data: {fine.date}</p>
                  <p className="text-gray-700">Valor: {fine.finePrice}</p>
                  {/* <p className="text-gray-700">Valor: {fine.idInfraction}</p> */}
                </div>
                {!fine.paid && (
                  <button
                    onClick={() => fine.id && payFine(fine.idInfraction)}
                    className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700"
                  >
                    Pagar Multa
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    );





    return (


      <div className="max-w-2xl mx-auto p-8 border rounded shadow-md bg-white mt-80 -mb-72">



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
              <span className="font-semibold">Username:</span> {loggedInUser.username}
            </p>
            <p className="text-gray-700">
              <span className="font-semibold">Email:</span> {loggedInUser.email}
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
                  onClick={() => fine.idInfraction && payFine(fine.idInfraction)}
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
          <p className="text-gray-700"><span className="font-semibold">Nome:</span> {loggedInUser.username}</p>
          <p className="text-gray-700"><span className="font-semibold">Email:</span> {loggedInUser.email}</p>
          <p className="text-gray-700"><span className="font-semibold">Role:</span> {loggedInUser.role}</p>
          <p className="text-gray-700"><span className="font-semibold">CPF:</span> {loggedInUser.cpf}</p>
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
            onClick={() => payFine(fine.idInfraction)}
            className="bg-green-500 text-white p-2 rounded-md hover:bg-green-700 mt-4"
          >
            Pagar Multa
          </button>
          {isPaymentConfirmed && (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-4">
              <p className="font-bold">Multa paga com sucesso!</p>
            </div>
          )}


        </div>


        <h2 className="text-3xl font-bold mt-8 mb-6 text-gray-800">Multas Pagas</h2>
      <div className="max-h-52 overflow-auto">
        {renderFineList(paidInfractions)}
      </div>

      <h2 className="text-3xl font-bold mt-8 mb-6 text-gray-800">Multas Não Pagas</h2>
      <div className="max-h-52 overflow-auto">
        {renderFineList(nonPaidInfractions)}
      </div>


      </div>
    );
  };



  export default Profile;
