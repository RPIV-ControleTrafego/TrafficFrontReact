import React, { useEffect, useState } from 'react';
import axios from 'axios';

  // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  // import { faFileCsv } from '@fortawesome/free-solid-svg-icons';

  // modelo tabela de acidentes
  // _id 650f5fe2ec37b863fb51acb5
  // date "2019-08-16"
  // hasInjuries false
  // hasFatalities false
  // address "Oak Lane, New York, NY 33101"
  // hasInfraction false
  // _class "com.accident.serviceaccident.Entity.AccidentEntity"

  import { FileText } from 'react-feather';
function Accident() {
  const [data, setData] = useState([]);
  const [searchPlate, setSearchPlate] = useState('');
 
  const [accordionExpanded, setAccordionExpanded] = useState(false);
  const [accordionExpanded2, setAccordionExpanded2] = useState(false); 
  const [accordionExpanded3, setAccordionExpanded3] = useState(false); 
  const [accordionExpanded4, setAccordionExpanded4] = useState(false);
  const [addressData, setAddressData] = useState([]);
  const [severityData, setSeverityData] = useState([]);
 


  function fetchData() {
    axios.get('http://localhost:8082/service/accident/')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchAddressData() {
    axios.get('http://localhost:8082/service/acident/address')
      .then((response) => {
        setAddress(response.data); 
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function fetchSeverityData() {
    axios.get('http://localhost:8082/service/acident/severity')
      .then((response) => {
        setSeverityData(response.data); 
      })
      .catch((error) => {
        console.log(error);
      });

  }

  useEffect(() => {
    fetchSeverityData();
  }, []);

  useEffect(() => {
    fetchAddressData();
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
    let csvContent = "date,hasInjuries,hasFatalities,address,hasInfraction,severity,type,description\n";
    data.forEach((item) => {
      const rowData = `${item.data},${item.hasInjuries},${item.hasFatalities},${item.address},${item.hasInfraction},${item.severity},${item.type},${item.description}\n`;
      csvContent += rowData;
    });
  
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'data.csv';
    link.click();
  };
  return (
    <div className="App">
      
    <h1 className='text-5xl mb-12 mt-16'> Informações de Acidentes</h1>
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
              <p className='flex'>
                Baixe os registros dos acidentes em formato CSV.
              </p>
            <button onClick={downloadCSV} className='flex items-center mt-5
            '>
              Baixar CSV
              <FileText size={20} style={{ marginLeft: '0.5em' }} />
            </button>
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
<div className="flex justify-center items-center p-5 border border-b-0 border-gray-200 dark:border-gray-700">


  <iframe
    style={{
      background: '#FFFFFF',
      border: 'none',
      borderRadius: '2px',
      boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
    }}
    width="1200"
    height="630"
    src="https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=65023917-a83c-4d99-8c0b-ffcd4285f4c6&maxDataAge=3600&theme=light&autoRefresh=true"
  ></iframe>

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
<div className="flex justify-center items-center p-5 border border-b-0 border-gray-200 dark:border-gray-700">
    
      <iframe
      style={{
        background: '#FFFFFF',
        border: 'none',
        borderRadius: '2px',
        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
      }}
      width="1200"
      height="630"
      src="https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=65023b00-9bed-4870-8a60-4722b5d657a9&maxDataAge=3600&theme=light&autoRefresh=true"
    ></iframe>

  </div>
</div>

<h2 id="accordion-collapse-heading-4">
  <button
    type="button"
    className="flex items-center justify-between w-full p-5 font-medium text-left text-gray-500 border border-b-0 border-gray-200 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
    data-accordion-target="#accordion-collapse-body-4"
    aria-expanded={accordionExpanded4} 
    aria-controls="accordion-collapse-body-4"
    onClick={toggleAccordion4}
  >
    <span>Quantas cores foram registradas?</span>
    <svg
      data-accordion-icon
      className={`w-3 h-3 rotate-${accordionExpanded4 ? '180' : '0'} shrink-0`}
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
  id="accordion-collapse-body-4"
  className={accordionExpanded4 ? "p-5 border border-b-0 border-gray-200 dark:border-gray-700" : "hidden"}
  aria-labelledby="accordion-collapse-heading-2"
>
<div className="flex justify-center items-center p-5 border border-b-0 border-gray-200 dark:border-gray-700">
    
      <iframe
      style={{
        background: '#FFFFFF',
        border: 'none',
        borderRadius: '2px',
        boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
      }}
      width="1200"
      height="630"
      src="https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=65023b20-c954-44bf-89be-5daa9d31be66&maxDataAge=300&theme=light&autoRefresh=true"
    ></iframe>

  </div>
</div>





      </div>

        

     
    </div>
  );
}

export default Accident;
