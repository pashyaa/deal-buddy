import React from 'react';
import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import Users from './Users';
import MenuBar from './MenuBar';
import Coupons from './Coupons';
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
            <Route path="/dashboard/users" element={<Users/>} exact />
            <Route path="/dashboard/coupons" element={<Coupons />} exact />
          </Routes>
        </Grid>
      </Grid>
    </Container>
  );
};


export default Dashboard;