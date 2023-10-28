import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import About from './pages/about/About';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import Accident from './pages/Accident/Accident';
import Infraction from './pages/Infraction/Infraction';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  // Verifica se o usuário está autenticado
  useEffect(() => {
    const loggedInUser = localStorage.getItem('loggedInUser');
    if (loggedInUser) {
      setAuthenticated(true);
    } else {
      setAuthenticated(false);
    }
  }, []); // Execute somente ao montar o componente


  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="flex-grow">
          <div className="container">
            <Routes>
              <Route path="/login" element={<Login setAuthenticated={setAuthenticated} />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={authenticated ? <Home /> : <Navigate to="/login" />} />
              <Route path="/about" element={authenticated ? <About /> : <Navigate to="/login" />} />
              <Route path="/stats" element={authenticated ? <Stats /> : <Navigate to="/login" />} />
              <Route path="/accident" element={authenticated ? <Accident /> : <Navigate to="/login" />} />
              <Route path="/infraction" element={authenticated ? <Infraction /> : <Navigate to="/login" />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
