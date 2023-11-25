import React, { useEffect, useState } from 'react';
import axios from 'axios';

 // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  // import { faFileCsv } from '@fortawesome/free-solid-svg-icons';

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
  
    return (
      <div className="App">
        <h1 className='text-5xl mb-12 mt-16'> Informações de Tráfego</h1>
      </div>
    );
  };

export default App;
