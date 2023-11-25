import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FileText } from 'react-feather';

function App() {
  const [data, setData] = useState([]);
  const [searchPlate, setSearchPlate] = useState('');
  const [accordionExpanded, setAccordionExpanded] = useState(false);
  const [accordionExpanded2, setAccordionExpanded2] = useState(false); 
  const [accordionExpanded3, setAccordionExpanded3] = useState(false); 
  const [accordionExpanded4, setAccordionExpanded4] = useState(false);
  const [brandsData, setBrandsData] = useState([]);
  const [carTypesData, setCarTypesData] = useState([]);
 
  function fetchData() {
    axios.get('http://localhost:8082/service/traffic/car-plate/list')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }
  
  function fetchBrandsData() {
    axios.get('http://localhost:8082/service/traffic/car/brands')
      .then((response) => {
        setBrandsData(response.data); // Alterado para setBrandsData
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchCarTypesData() {
    axios.get('http://localhost:8082/service/traffic/car/types')
      .then((response) => {
        setCarTypesData(response.data); // Alterado para setCarTypesData
      })
      .catch((error) => {
        console.log(error);
      });

  }

  useEffect(() => {
    fetchCarTypesData();
  }, []);

  useEffect(() => {
    fetchBrandsData();
  }, []);

  useEffect(() => {
    fetchData(); 
  }, []);

  const DashboardButtons = () => {
    return (
      <div className="dashboard-buttons flex justify-center items-center">
        <Link to="/infraction/graphics">
          <button className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded btn-primary mr-2">Gráficos</button>
        </Link>
        
        <Link to="/infraction/dashboard">
          <button className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded btn-primary">Dashboard</button>
        </Link>
      </div>
    );
  };
  
    return (
      <div className="App">
        <h1 className='text-5xl mb-12 mt-16'> Informações de Tráfego</h1>
        <br /><br /><br /><br /><br />
      <DashboardButtons />
      </div>
    );
  };

export default App;
