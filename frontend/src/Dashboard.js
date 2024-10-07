import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import ProductList from './ProductList';
import MenuBar from './MenuBar';
import Order from './Orders';
import MyAppBar from './MyAppBar'
import { Box, Grid, Container, AppBar, Toolbar } from '@mui/material';

const Dashboard = () => {
  return (
    <Container maxWidth="lg" sx={{ mt: 64, overflow: 'hidden' }}> 
      <Grid container spacing={2}>
        <Grid item xs={3} sx={{ mt: -64 }}>
          <MenuBar />
        </Grid>
        <Grid item xs={9}>
          <MyAppBar></MyAppBar>
          <Routes>
            <Route path="/products" element={<ProductList />} />
            <Route path="/orders" element={<Order />} />
          </Routes>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;