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
  const [brandsData, setBrandsData] = useState([]);
  const [carTypesData, setCarTypesData] = useState([]);

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



{/* <iframe style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="640" height="480" src="https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=6580ebd1-6716-4ad9-8fdf-ef9da635ec28&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>


<iframe style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="640" height="480" src="https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=6580ec3c-613e-4c7b-8c19-8bf495096059&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>


<iframe style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="640" height="480" src="https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=6580ec86-a8d1-47d1-8659-08eeef1fa176&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>


<iframe style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="640" height="480" src="https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=6580ece2-613e-425f-8c8b-8bf49520b282&maxDataAge=3600&theme=light&autoRefresh=true"></iframe>


<iframe style="background: #FFFFFF;border: none;border-radius: 2px;box-shadow: 0 2px 10px 0 rgba(70, 76, 79, .2);" width="640" height="480" src="https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=6580ed52-163d-4e1e-8cf9-21e63a7a7230&maxDataAge=3600&theme=light&autoRefresh=true"></iframe> */}

  const charts = [
    'https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=6580ebd1-6716-4ad9-8fdf-ef9da635ec28&maxDataAge=3600&theme=light&autoRefresh=true',
    'https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=6580ec3c-613e-4c7b-8c19-8bf495096059&maxDataAge=3600&theme=light&autoRefresh=true',
    'https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=6580ec86-a8d1-47d1-8659-08eeef1fa176&maxDataAge=3600&theme=light&autoRefresh=true',
    'https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=6580ece2-613e-425f-8c8b-8bf49520b282&maxDataAge=3600&theme=light&autoRefresh=true',
    'https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=6580ed52-163d-4e1e-8cf9-21e63a7a7230&maxDataAge=3600&theme=light&autoRefresh=true',


  ]

  const chartStyle = {
    background: '#FFFFFF',
    border: 'none',
    borderRadius: '2px',
    boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
    width: '100%',
    height: '480px',
  };

  const downloadCSV = () => {
    let csvContent = "date,hasInjuries,hasFatalities,address,hasInfraction\n";
    data.forEach((item) => {
      const rowData = `${item.data},${item.hasInjuries},${item.hasFatalities},${item.address},${item.hasInfraction}\n`;
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
{/*
    <iframe
        src={}
        frameBorder={0}
        width={800}
        height={600}
        allowTransparency
    /> */}

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
<div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '20px', marginTop: 600 }}>
          {charts.map((chart, index) => (
            <div key={index} style={{ minWidth: '640px' }}>
              <iframe style={chartStyle} src={chart}></iframe>
            </div>
          ))}
        </div>
    </div>


    </div>
  );
}

export default Accident;
