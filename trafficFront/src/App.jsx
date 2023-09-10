// CSS
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages 
import Home from './pages/Home/Home';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';



function App() {
  
  return (
    <div className="App">
      <Router>
      <Navbar />
        <div className="container"> 
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/mars" element={<Mars />} />
            <Route path="/about" element={<About />} /> */}
          </Routes>
        </div>
        <Footer />
      </Router>
    </div>
  );
}

export default App

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';

// function App() {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     axios.get('http://localhost:8082/service/traffic/car-plate/list')
//       .then((response) => {
//         setData(response.data);
//       })
//       .catch((error) => {
//         console.log(error);
//       });
//   }, []);

//   return (
//     <div className="App">
//       <h1 className="text-2xl font-bold mb-4 bg-blue ">Test</h1>
//       <div className="table-container">
//         <table className="table">
//           <thead>
//             <tr className='ml-8 bg-slate-600'>
//             <th>Car Plate</th>
//             <th>Car Type</th>
//             <th>Car Color</th>
//             <th>Car Brand</th>
//             <th>Vehicle Owner Name</th>
//             <th>Vehicle Owner CPF</th>
//             <th >Time</th>
//             <th>Date</th>
//             <th>Address</th>
//             <th>Speed</th>
//             <th>Max Speed</th>
//             <th>Direction</th>
//             <th>Street Direction</th>
//               {/* Adicione outras colunas do cabeçalho aqui */}
//             </tr>
//           </thead>
//           <tbody>
//             {data.map((item, index) => (
//               <tr key={index} className="tr">
//                <td>{item.carPlate}</td>
//               <td>{item.carType}</td>
//               <td>{item.carColor}</td>
//               <td>{item.carBrand}</td>
//               <td>{item.veiculeOwnerName}</td>
//               <td>{item.veiculeOwneCPF}</td>
//               <td>{item.time}</td>
//               <td>{item.date}</td>
//               <td>{item.address}</td>
//               <td>{item.speed}</td>
//               <td>{item.maxSpeed}</td>
//               <td>{item.direction}</td>
//               <td>{item.streetDirection}</td>
//                 {/* Adicione outras células de dados aqui */}
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// }

// export default App;
