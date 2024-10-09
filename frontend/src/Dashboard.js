import React from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import ProductList from './ProductList';
import MenuBar from './MenuBar';
import Order from './Orders';
import MyAppBar from './MyAppBar';
import { Box, Grid, Container, AppBar, Toolbar } from '@mui/material';
import { useState, useEffect } from 'react';

const Dashboard = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);  
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;  
  }

  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 64, overflow: 'hidden' }}>
      <Grid container spacing={2}>
        <Grid item xs={3} sx={{ mt: -64 }}>
          <MenuBar />
        </Grid>
        <Grid item xs={9}>
          <MyAppBar />
          <Routes>
            <Route path="/dashboard/products" element={<ProductList />} exact />
            <Route path="/dashboard/orders" element={<Order />} exact />
          </Routes>
        </Grid>
      </Grid>
    </Container>
  );
};


export default Dashboard;