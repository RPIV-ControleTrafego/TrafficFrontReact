import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const loggedInUser = JSON.parse(localStorage.getItem('loggedInUser'));


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <App loggedInUser={loggedInUser} />
  </React.StrictMode>,
)
