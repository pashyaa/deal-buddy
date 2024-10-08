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
import Dashboard from './Dashboard'
import MainLayout from './MainLayout';
import DashboardLayout from './DashboardLayout';
import ProductList from './ProductList';
import Order from './Orders';
import { Box, Container } from '@mui/material';

const App = () => {
  return (
    <Router>
        <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/register" element={<Createaccount />} />
          <Route path="/vouchers" element={<Vouchers />} />
          </Route>
        </Routes>
        <Routes>
        <Route element={<DashboardLayout />}>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/dashboard/products" element={<ProductList />}  />
        <Route path="/dashboard/orders" element={<Order />}  />
        </Route>
        </Routes>
    </Router>
    
  );
};
export default App;