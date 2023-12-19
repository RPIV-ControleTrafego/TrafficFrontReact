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
  const toggleAccordion = () => {
    setAccordionExpanded(!accordionExpanded);
  };
  const toggleAccordion2 = () => {
    setAccordionExpanded2(!accordionExpanded2);
  };
  const toggleAccordion3 = () => {
    setAccordionExpanded3(!accordionExpanded3);
  };
  const toggleAccordion4 = () => {
    setAccordionExpanded4(!accordionExpanded4);
  }
  const downloadCSV = () => {
    let csvContent = "carPlate,carType,carColor,carBrand,veiculeOwnerName,veiculeOwneCPF,time,date,address,speed,maxSpeed,direction,streetDirection\n";
    infractionData.forEach((item) => {
      const rowData = `${item.carPlate},${item.carType},${item.carColor},${item.carBrand},${item.veiculeOwnerName},${item.veiculeOwneCPF},${item.time},${item.date},${item.address},${item.speed},${item.maxSpeed},${item.direction},${item.streetDirection}\n`;
      csvContent += rowData;
    });
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'data.csv';
    link.click();
  };
  const chartStyle = {
    background: '#FFFFFF',
    border: 'none',
    borderRadius: '2px',
    boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
    width: '100%',
    height: '480px',
  };
  const charts = [
    "https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=65023917-a83c-4d99-8c0b-ffcd4285f4c6&maxDataAge=3600&theme=light&autoRefresh=true",
    "https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=65023b00-9bed-4870-8a60-4722b5d657a9&maxDataAge=3600&theme=light&autoRefresh=true",
    "https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=65023b20-c954-44bf-89be-5daa9d31be66&maxDataAge=300&theme=light&autoRefresh=true",
    "https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=6581d557-46f5-4b3a-8dc6-a27a8d07cc3f&maxDataAge=3600&theme=light&autoRefresh=true",
    "https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=6581d5b3-46f5-4f22-86ea-a27a8d0d77ff&maxDataAge=3600&theme=light&autoRefresh=true",
    "https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=6581d5e6-6716-4031-828d-ef9da65b5d5d&maxDataAge=3600&theme=light&autoRefresh=true"
  ];
  // PAINEL METABASE - TRÁFEGO GERAL

  // PAINEL METABASE - TRÁFEGO GERAL
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
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5 5 1 1 5" />
            </svg>
          </button>
        </h2>
        <div
          id="accordion-collapse-body-1"
          className={accordionExpanded ? "p-5 border border-b-0 border-gray-200 dark:border-gray-700" : "hidden"}
          aria-labelledby="accordion-collapse-heading-1"
        >
          <div>
            <p className='flex'>
              Baixe os registros de tráfego em formato CSV.
            </p>
            <button onClick={downloadCSV} className='flex items-center mt-5
            '>
              Baixar CSV
              <FileText size={20} style={{ marginLeft: '0.5em' }} />
            </button>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: 1000 }}>
          {charts.map((chart, index) => (
            <div key={index} style={{ minWidth: '400px' }}>
              <iframe style={chartStyle} src={chart}></iframe>
            </div>
          ))}
        </div>

      <iframe
    src="https://metabase.ayvu.net/public/dashboard/4ebee3d7-67ee-4945-940f-5af14df14463"
    frameborder="0"
    width="800"
    height="600"
    marginTop="300"
    allowtransparency
  ></iframe>
      </div>




    </div>
  );
}
export default App;
