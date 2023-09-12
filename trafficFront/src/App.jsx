// CSS
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// pages 
import Home from './pages/Home/Home';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Stats from './pages/Stats/Stats';
import About from './pages/about/About';

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
          </Routes>
        </div>
        </main>
        <Footer />
      </Router>
    </div>
  );
}

export default App
