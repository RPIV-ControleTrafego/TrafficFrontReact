// App.js
import React from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from './service/firebaseConfig';

import Navbar from './components/Navbar/Navbar';
import Footer from './components/Footer/Footer';
import Home from './pages/Home/Home';
import Stats from './pages/Stats/Stats';
import About from './pages/about/About';
import { Login } from './pages/Login/Login';
import { Register } from './pages/Register/Register';
import Accident  from './pages/Accident/Accident'
import Infraction from "./pages/Infraction/Infraction"

function ProtectedRoute({ children, ...rest }) {
  const [user] = useAuthState(auth);

  return user ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main className="flex-grow">
          <div className="container">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              {/* Rota protegida - só pode ser acessada por usuários autenticados */}
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/about"
                element={
                  <ProtectedRoute>
                    <About />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/stats"
                element={
                  <ProtectedRoute>
                    <Stats />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/accident"
                element={
                  <ProtectedRoute>
                    <Accident />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/infraction"
                element={
                  <ProtectedRoute>
                    <Infraction />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;