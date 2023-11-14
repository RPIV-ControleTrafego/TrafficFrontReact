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

  import { Navigate,useNavigate } from 'react-router-dom'; // Importe o Navigate
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
      <h1 className='text-5xl mb-32 mt-16 px-5 min-h-screen ' > Informações de Infração</h1>
        <iframe
          src="http://localhost:3000/public/dashboard/23dc06fe-be1f-4f07-ad25-d95fa1cb14f3"
          frameBorder="0"
          width="1200"
          height="1000"
        ></iframe>
    </div>
  );
}

export default Accident;
