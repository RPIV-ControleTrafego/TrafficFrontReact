import React, { useEffect, useState } from 'react';
import axios from 'axios';

  import { Navigate,useNavigate } from 'react-router-dom'; // Importe o Navigate
  import { FileText } from 'react-feather';
  import { Link } from 'react-router-dom';
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

  const DashboardButtons = () => {
    return (
      <div className="dashboard-buttons flex justify-center items-center">
        <Link to="/accident/graphics">
          <button className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded btn-primary mr-2">Dashboard</button>
        </Link>
        
        <Link to="/accident/dashboard">
          <button className="btn bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded btn-primary">Consultas</button>
        </Link>
      </div>
    );
  };
  
  return (
    
    <div className="App">
      <DashboardButtons />
    </div>
  );
}

export default Accident;
