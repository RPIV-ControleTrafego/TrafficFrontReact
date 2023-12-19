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



    const chartStyle = {
      background: '#FFFFFF',
      border: 'none',
      borderRadius: '2px',
      boxShadow: '0 2px 10px 0 rgba(70, 76, 79, .2)',
      width: '100%',
      height: '480px',
    };

    const charts = [
      'https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=651889f7-8755-47b9-841e-b2418e28933a&maxDataAge=300&theme=light&autoRefresh=true',
      'https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=65188b17-92db-4fba-82ae-d973209fa5e6&maxDataAge=300&theme=light&autoRefresh=true',
      'https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=65188b86-22d0-43da-8c9c-a903b4309ff0&maxDataAge=300&theme=light&autoRefresh=true',
      'https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=65188dec-22d0-4915-81ba-a903b4337a48&maxDataAge=300&theme=light&autoRefresh=true',
      'https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=657e7785-0a41-49cb-88e9-6eea37d9280c&maxDataAge=3600&theme=light&autoRefresh=true',
      'https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=657e7749-e9c5-417d-8afe-ed24c7ab9ce9&maxDataAge=3600&theme=light&autoRefresh=true',
      'https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=657e7785-0a41-49cb-88e9-6eea37d9280c&maxDataAge=3600&theme=light&autoRefresh=true',
      'https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=657e78ac-5a32-4327-878a-22e1c074908e&maxDataAge=3600&theme=light&autoRefresh=true',
      'https://charts.mongodb.com/charts-project-0-yqqda/embed/charts?id=657e79f8-5a32-469d-8cf6-22e1c0942ac6&maxDataAge=3600&theme=light&autoRefresh=true',
    ];



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
      <div className="App" style={{marginTop:800}}>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', marginTop: 1000 }}>

          {charts.map((chart, index) => (
            <div key={index} style={{ minWidth: '400px' }}>
              <iframe style={chartStyle} src={chart}></iframe>
            </div>
          ))}
        </div>

      <SpeedSearchLworGt />
      <SearchInfractionByDate />
      <SearchFinePriceCPF />
    </div>
  );
}

export default Infraction;
