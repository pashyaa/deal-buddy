import React from 'react';
import './styles/App.css';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Createaccount from './pages/Createaccount';
import Profile from './pages/Profile';
import CouponsByCategory from './pages/CouponsByCategory';
import CouponsByStore from './pages/CouponsByStore';
import MainLayout from './components/MainLayout';
import DashboardLayout from './dashboard/DashboardLayout';
import Users from './dashboard/Users';
import Coupons from './dashboard/Coupons';
import Vouchers from './dashboard/Vouchers';
import Dashboard from './dashboard/Dashboard';
import Category from './dashboard/Category'
import StoresPage from './dashboard/Stores';
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
          <Route path="/category/:categoryId" element={<CouponsByCategory />} />
          <Route path="/store/:storeId" element={<CouponsByStore />} />
          <Route  path="/profile" element={<Profile />} />
        </Route>

        <Route element={<DashboardLayout />}>
          <Route path="/dashboard/*" element={<Dashboard />}>
            <Route path= "category" element={<Category/>} />
            <Route path="users" element={<Users />}/>
            <Route path="stores" element={<StoresPage />}/>
            <Route path="coupons" element={ <Coupons />}/>
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
