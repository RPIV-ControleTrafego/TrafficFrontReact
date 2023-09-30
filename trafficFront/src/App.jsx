// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './service/ProtectedRoute';
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
  return (
    <div className="App">
      <Router>
        <Navbar />
        <main className="flex-grow">
          <div className="container">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/About" element={<About />} />
              <Route path="/Stats" element={<Stats />} />
              {/* Use ProtectedRoute for routes you want to protect */}
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
              <Route path="Accident" element={<Accident />} />
              <Route path='Infraction' element={<Infraction />} />
            </Routes>
          </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App;
