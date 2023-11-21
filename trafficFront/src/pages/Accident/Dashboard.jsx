import React, { useEffect, useState } from 'react';
import axios from 'axios';

  import { Navigate,useNavigate } from 'react-router-dom'; // Importe o Navigate
  import { FileText } from 'react-feather';

  function AccidentDashboard() {
  const [data, setData] = useState([]);
  const [searchPlate, setSearchPlate] = useState('');
  const [accordionExpanded, setAccordionExpanded] = useState(false);
  const [accordionExpanded2, setAccordionExpanded2] = useState(false); 
  const [accordionExpanded3, setAccordionExpanded3] = useState(false); 
  const [accordionExpanded4, setAccordionExpanded4] = useState(false);
  const [brandsData, setBrandsData] = useState([]);
  const [carTypesData, setCarTypesData] = useState([]);

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

export default AccidentDashboard;
