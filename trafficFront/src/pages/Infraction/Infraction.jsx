import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SpeedSearchLworGt from '../../components/SpeedSearch/SpeedSearch';
import SearchInfractionByDate from '../../components/SearchByDate/SearchInfractionByDate';
import SearchFinePriceCPF from '../../components/FinePriceCPF/SearchFinePrice';

  // import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
  // import { faFileCsv } from '@fortawesome/free-solid-svg-icons';
  import { Navigate,useNavigate } from 'react-router-dom'; // Importe o Navigate
  import { FileText } from 'react-feather';
  function Infraction() {
  const [data, setData] = useState([]);
  const [searchPlate, setSearchPlate] = useState('');
  const navigate = useNavigate();
  const [accordionExpanded, setAccordionExpanded] = useState(false);
  const [accordionExpanded2, setAccordionExpanded2] = useState(false); 
  const [accordionExpanded3, setAccordionExpanded3] = useState(false); 
  const [accordionExpanded4, setAccordionExpanded4] = useState(false);
  const [brandsData, setBrandsData] = useState([]);
  const [carTypesData, setCarTypesData] = useState([]);
  const [userRole, setUserRole] = useState('');

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
    data.forEach((item) => {
      const rowData = `${item.carPlate},${item.carType},${item.carColor},${item.carBrand},${item.veiculeOwnerName},${item.veiculeOwneCPF},${item.time},${item.date},${item.address},${item.speed},${item.maxSpeed},${item.direction},${item.streetDirection}\n`;
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
      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop:'100vh' }}>
      <iframe
          src="http://localhost:3000/public/dashboard/df101022-641d-485d-bb51-9923f3355752"
          frameborder="0"
          width="1200"
          height="800"
          allowtransparency
        ></iframe>
      </div>

      <SpeedSearchLworGt />
      <SearchInfractionByDate />
      <SearchFinePriceCPF />
    </div>
  );
}

export default Infraction;
