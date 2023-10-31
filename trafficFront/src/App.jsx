import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import Infraction from './pages/Infraction/Infraction';
import axios from 'axios';
import Accident from './pages/Accident/Accident';
import AdminPage from './pages/admin/AdminPage';
import Stats from './pages/Stats/Stats';
function App({loggedInUser}) {
  const [authenticated, setAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState('');

 useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));

    if (loggedInUser) {
      setAuthenticated(true);
      axios.get(`http://localhost:7000/user/getRole/${loggedInUser.username}`)
        .then(response => {
          setUserRole(response.data);
          setAuthenticated(true);
          console.log('Papel do usuário:', response.data);
        })
        .catch(error => {
          console.error('Erro ao obter papel do usuário:', error);
          setAuthenticated(false);
          setUserRole(''); 
        });
    } else {
      setAuthenticated(false);
      setUserRole(''); 
    }
    
  }, []); 


  const renderInfractionRoute = () => {
    if (authenticated && loggedInUser && loggedInUser.role && (loggedInUser.role === 'policial' || loggedInUser.role === 'admin' || loggedInUser.role === 'cop' )) {
      return <Route path="/infraction" element={<Infraction />} />;
    }
    return null; 
  };
  
  const renderAccidentRoute = () => {
    if (authenticated && loggedInUser && loggedInUser.role && (loggedInUser.role === 'bombeiro' || loggedInUser.role === 'admin')) {
      return <Route path="/accident" element={<Accident />} />;
    }
    return null; 
  };
  
  const renderAdminRoute = () => {
    if (authenticated && loggedInUser && loggedInUser.role && loggedInUser.role === 'admin') {
      return <Route path="/admin" element={<AdminPage />} />;
    }
    return null; 
  };


  const renderStatsRoute = () => {
    if (authenticated && loggedInUser && loggedInUser.role && (loggedInUser.role === 'admin' || loggedInUser.role === 'policial' || loggedInUser.role === 'bombeiro' || loggedInUser.role === 'user' )) {
      return <Route path="/stats" element={<Stats />} />;
    }
    return null; 
  }




  
  return (
    <Router>
      <div className="App">
      <Navbar loggedInUser={loggedInUser} />
        <main className="flex-grow">
          <div className="container">
            <Routes>
              <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
              <Route path="/register" element={<Register />} />
              <Route
                path="/"
                element={authenticated ? <Home /> : <Navigate to="/login" />}
              />
             {renderInfractionRoute()}
              {renderAccidentRoute()}
              {renderAdminRoute()}
              {renderStatsRoute()}
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;