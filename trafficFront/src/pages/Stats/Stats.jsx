import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [searchPlate, setSearchPlate] = useState('');
 
  const [accordionExpanded, setAccordionExpanded] = useState(false);
  const [accordionExpanded2, setAccordionExpanded2] = useState(false); 
  const [accordionExpanded3, setAccordionExpanded3] = useState(false); 
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
  

  const toggleAccordion = () => {
    setAccordionExpanded(!accordionExpanded);
  };

  const toggleAccordion2 = () => {
    setAccordionExpanded2(!accordionExpanded2);
  };

  const toggleAccordion3 = () => {
    setAccordionExpanded3(!accordionExpanded3);
  };


  return (
    <div className="App">
      
      
      
   
    <h1 className='text-5xl mb-12 mt-16'> Informações de Tráfego</h1>
      <div id="accordion-collapse" data-accordion="collapse" className='overflow-auto mb-96'>
        <h2 id="accordion-collapse-heading-1">
          <button
            type="button"
            className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
            data-accordion-target="#accordion-collapse-body-1"
            aria-expanded={accordionExpanded}
            aria-controls="accordion-collapse-body-1"
            onClick={toggleAccordion}
          >
            <span>Lista de Dados Gerais</span>
            <svg
              data-accordion-icon
              className={`w-3 h-3 rotate-${accordionExpanded ? '180' : '0'} shrink-0`}
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 10 6"
            >
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
            </svg>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-1"
          className={accordionExpanded ? "p-5 border border-b-0 border-gray-200 dark:border-gray-700" : "hidden"}
          aria-labelledby="accordion-collapse-heading-1"
        >
          <div>
            <h1 className="text-2xl font-bold mb-4 bg-blue">Test</h1>
            <div className="table-container">
              {/* Conteúdo do item do acordeão aqui */}
              <table className="table">
                <thead>
                  <tr>
                    <th>Car Plate</th>
                    <th>Car Type</th>
                    <th>Car Color</th>
                    <th>Car Brand</th>
                    <th>Vehicle Owner Name</th>
                    <th>Vehicle Owner CPF</th>
                    <th>Time</th>
                    <th>Date</th>
                    <th>Address</th>
                    <th>Speed</th>
                    <th>Max Speed</th>
                    <th>Direction</th>
                    <th>Street Direction</th>
                    {/* Adicione outras colunas do cabeçalho aqui */}
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index} className="tr">
                      <td className="border border-slate-500">{item.carPlate}</td>
                      <td className="border border-slate-500">{item.carType}</td>
                      <td className="border border-slate-500">{item.carColor}</td>
                      <td className="border border-slate-500">{item.carBrand}</td>
                      <td className="border border-slate-500">{item.veiculeOwnerName}</td>
                      <td className="border border-slate-500">{item.veiculeOwneCPF}</td>
                      <td className="border border-slate-500">{item.time}</td>
                      <td className="border border-slate-500">{item.date}</td>
                      <td className="border border-slate-500">{item.address}</td>
                      <td className="border border-slate-500">{item.speed}</td>
                      <td className="border border-slate-500">{item.maxSpeed}</td>
                      <td className="border border-slate-500">{item.direction}</td>
                      <td className="border border-slate-500">{item.streetDirection}</td>
                   
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <h2 id="accordion-collapse-heading-2">
  <button
    type="button"
    className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
    data-accordion-target="#accordion-collapse-body-2"
    aria-expanded={accordionExpanded2} 
    aria-controls="accordion-collapse-body-2"
    onClick={toggleAccordion2}
  >
    <span>Quantas marcas foram registrada?</span>
    <svg
      data-accordion-icon
      className={`w-3 h-3 rotate-${accordionExpanded2 ? '180' : '0'} shrink-0`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
    </svg>
  </button>
</h2>
<div
  id="accordion-collapse-body-2"
  className={accordionExpanded2 ? "p-5 border border-b-0 border-gray-200 dark:border-gray-700" : "hidden"}
  aria-labelledby="accordion-collapse-heading-2"
>
  <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
  <table className="table">
  <thead>
    <tr>
      <th>Car Brands</th>
    </tr>
  </thead>
  <tbody>
    {brandsData.map((item, index) => (
      <tr key={index} className="tr">
        <td className="border border-slate-500">{item}</td> {/* Alterado para {item} */}
      </tr>
    ))}
  </tbody>
</table>   
  </div>
</div>
        


<h2 id="accordion-collapse-heading-3">
  <button
    type="button"
    className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
    data-accordion-target="#accordion-collapse-body-3"
    aria-expanded={accordionExpanded3} 
    aria-controls="accordion-collapse-body-3"
    onClick={toggleAccordion3}
  >
    <span>Quantas cores foram registradas?</span>
    <svg
      data-accordion-icon
      className={`w-3 h-3 rotate-${accordionExpanded3 ? '180' : '0'} shrink-0`}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 10 6"
    >
      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5"/>
    </svg>
  </button>
</h2>
<div
  id="accordion-collapse-body-3"
  className={accordionExpanded3 ? "p-5 border border-b-0 border-gray-200 dark:border-gray-700" : "hidden"}
  aria-labelledby="accordion-collapse-heading-2"
>
  <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700">
  <table className="table">
  <thead>
    <tr>
      <th>Car Colors</th>
    </tr>
  </thead>
  <tbody>
    {carTypesData.map((item, index) => (
      <tr key={index} className="tr">
        <td className="border border-slate-500">{item}</td> {/* Alterado para {item} */}
      </tr>
    ))}
  </tbody>
</table>   
  </div>
</div>
      </div>

   

     
    </div>
  );
}

export default App;
