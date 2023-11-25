import React, { useEffect, useState } from 'react';
import { Navigate,useNavigate } from 'react-router-dom'; // Importe o Navigate
import { FileText } from 'react-feather';

function InfractionGraphics() {
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
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop:'100vh' }}>
        <div style={{ minWidth: '640px',}}>
          <iframe
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
              width: '100%',
              height: '480px'
            }}
            src="https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=651889f7-8755-47b9-841e-b2418e28933a&maxDataAge=300&theme=light&autoRefresh=true"
          ></iframe>
        </div>
        <div style={{  minWidth: '640px' }}>
          <iframe
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
              width: '100%',
              height: '480px'
            }}
            src="https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=65188b17-92db-4fba-82ae-d973209fa5e6&maxDataAge=300&theme=light&autoRefresh=true"
          ></iframe>
        </div>
      </div>
      <div style={{ gap: '20px' }}>
        <div style={{  minWidth: '640px' }}>
          <iframe
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
              width: '100%',
              height: '480px'
            }}
            src="https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=65188b86-22d0-43da-8c9c-a903b4309ff0&maxDataAge=300&theme=light&autoRefresh=true"
          ></iframe>
        </div>
        <div style={{  minWidth: '640px' }}>
          <iframe
            style={{
              background: '#FFFFFF',
              border: 'none',
              borderRadius: '2px',
              boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
              width: '100%',
              height: '480px'
            }}
            src="https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=65188dec-22d0-4915-81ba-a903b4337a48&maxDataAge=300&theme=light&autoRefresh=true"
          ></iframe>
        </div>
      </div>
    </div>
  );
}

export default InfractionGraphics;