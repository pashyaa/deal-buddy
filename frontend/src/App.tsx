import React from 'react';
import logo from './logo.svg';
import './App.css';
import Home from './Home';
import Auth from './Auth';
import Createaccount from './Createaccount';
import Appbar from './Material Component/Appbar'
import Footer from './Material Component/Footer'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Vouchers from './Vouchers';
import Dashboard from './Dashboard';
import { Box, Container } from '@mui/material';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        <Appbar></Appbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/register" element={<Createaccount />} />
          <Route path="/vouchers" element={<Vouchers />} />
          <Route path="/dashboard/*" element={<Dashboard /> } />
        </Routes>
      </div>
    </Router>
  );
};
export default App;