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
          setUserRole(''); // Limpe o papel do usuário se não estiver autenticado
        });
    } else {
      setAuthenticated(false);
      setUserRole(''); // Limpe o papel do usuário se não estiver autenticado
    }
    
  }, []); // Execute somente ao montar o componente


  const renderInfractionRoute = () => {
    if (authenticated && loggedInUser && loggedInUser.role && (loggedInUser.role === 'police' || loggedInUser.role === 'admin' || loggedInUser.role === 'cop' )) {
      return <Route path="/infraction" element={<Infraction />} />;
    }
    return null; // ou redirecionamento para outra rota, ou uma mensagem de permissão negada
  };
  
  const renderAccidentRoute = () => {
    if (authenticated && loggedInUser && loggedInUser.role && (loggedInUser.role === 'fireman' || loggedInUser.role === 'admin')) {
      return <Route path="/accident" element={<Accident />} />;
    }
    return null; // ou redirecionamento para outra rota, ou uma mensagem de permissão negada
  };
  
  const renderAdminRoute = () => {
    if (authenticated && loggedInUser && loggedInUser.role && loggedInUser.role === 'admin') {
      return <Route path="/admin" element={<AdminPage />} />;
    }
    return null; // ou redirecionamento para outra rota, ou uma mensagem de permissão negada
  };


  
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
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}
export default App;