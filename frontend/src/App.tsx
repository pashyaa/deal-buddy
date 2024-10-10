import React from 'react';
import './App.css';
import Home from './Home';
import Auth from './Auth';
import Createaccount from './Createaccount';
import MainLayout from './MainLayout';
import DashboardLayout from './DashboardLayout';
import Users from './Users';
import Coupons from './Coupons';
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
              path="users" 
              element={
                <ProtectedRoute>
                  <Users />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="coupons" 
              element={
                <ProtectedRoute>
                  <Coupons />
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
