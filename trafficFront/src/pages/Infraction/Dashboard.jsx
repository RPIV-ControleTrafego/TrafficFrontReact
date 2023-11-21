import React, { useEffect, useState } from 'react';
import { Navigate,useNavigate } from 'react-router-dom'; // Importe o Navigate
import { FileText } from 'react-feather';
  
  function InfractionDashboard() {
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

  return (
    <div className="App">      
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop:'100vh' }}>
      <iframe
          src="http://localhost:3000/public/dashboard/df101022-641d-485d-bb51-9923f3355752"
          frameborder="0"
          width="1200"
          height="800"
        ></iframe>
      </div>
    </div>
  );
}

export default InfractionDashboard;
