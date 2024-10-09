import React from 'react';
import './App.css';
import Home from './Home';
import Auth from './Auth';
import Createaccount from './Createaccount';
import MainLayout from './MainLayout';
import DashboardLayout from './DashboardLayout';
import ProductList from './ProductList';
import Order from './Orders';
import Vouchers from './Vouchers';
import Dashboard from './Dashboard';
import ProtectedRoute from './ProtectedRoute'; // Import the ProtectedRoute component
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

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
        
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route 
              path="products" 
              element={
                <ProtectedRoute>
                  <ProductList />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="orders" 
              element={
                <ProtectedRoute>
                  <Order />
                </ProtectedRoute>
              } 
            />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
