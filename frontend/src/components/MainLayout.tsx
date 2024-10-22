import React  from 'react';
import  AppBar from '../components/Appbar'
import Footer from '../components/Footer'; 
import { Outlet } from 'react-router-dom';

const MainLayout = () => {
  return (
    <div className="app-container">
        <AppBar />
        <main>
        <Outlet />
        </main>
        <Footer />
        </div>
  );
};

export default MainLayout;
