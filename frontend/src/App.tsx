import React from 'react';
import './styles/App.css';
import Home from './pages/Home';
import Auth from './components/Auth';
import Createaccount from './pages/Createaccount';
import MainLayout from './components/MainLayout';
import DashboardLayout from './dashboard/DashboardLayout';
import Users from './dashboard/Users';
import Coupons from './dashboard/Coupons';
import Vouchers from './dashboard/Vouchers';
import Dashboard from './dashboard/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
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
