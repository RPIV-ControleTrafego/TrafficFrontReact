import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SpeedSearchLworGt from '../../components/SpeedSearch/SpeedSearch';
import SearchInfractionByDate from '../../components/SearchByDate/SearchInfractionByDate';
import SearchFinePriceCPF from '../../components/FinePriceCPF/SearchFinePrice';
import { FileText } from 'react-feather';

const Infraction = () => {
  const [data, setData] = useState([]);
  const [searchPlate, setSearchPlate] = useState('');
  const [accordionExpanded, setAccordionExpanded] = useState(false);
  const [accordionExpanded2, setAccordionExpanded2] = useState(false);
  const [accordionExpanded3, setAccordionExpanded3] = useState(false);
  const [accordionExpanded4, setAccordionExpanded4] = useState(false);
  const [brandsData, setBrandsData] = useState([]);
  const [carTypesData, setCarTypesData] = useState([]);
  const [userRole, setUserRole] = useState('');

  const toggleAccordion = (accordionNumber) => {
    switch (accordionNumber) {
      case 1:
        setAccordionExpanded(!accordionExpanded);
        break;
      case 2:
        setAccordionExpanded2(!accordionExpanded2);
        break;
      case 3:
        setAccordionExpanded3(!accordionExpanded3);
        break;
      case 4:
        setAccordionExpanded4(!accordionExpanded4);
        break;
      default:
        break;
    }
  };

  const checkAuthorization = async () => {
    try {
      const response = await axios.get('http://localhost:7000/user/checkAuthorization');
      const isAdmin = response.data.isAdmin;
      setUserRole(isAdmin ? 'admin' : 'user');
    } catch (error) {
      console.error('Erro ao verificar autorização:', error);
      setUserRole('user');
    }
  };

  useEffect(() => {
    checkAuthorization();
  }, []);

  const downloadCSV = () => {
    const csvContent = 'Example CSV Data';
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    link.download = 'data.csv';
    link.click();
  };

  return (
    <div className="App">
      <h1 className='text-5xl mb-32 mt-16 px-5 min-h-screen'> Informações de Infração</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '100vh' }}>
        <div style={{ minWidth: '640px' }}>
          <iframe
            style={{}}
            src="https://example.com/chart1"
          ></iframe>
        </div>
        <div style={{ minWidth: '640px' }}>
          <iframe
            style={{}}
            src="https://example.com/chart2"
          ></iframe>
        </div>
      </div>

      <SpeedSearchLworGt />
      <SearchInfractionByDate />
      <SearchFinePriceCPF />

      {userRole === 'admin' && (
        <button onClick={downloadCSV}>
          <FileText /> Baixar CSV
        </button>
      )}
    </div>
  );
}

export default Infraction;
