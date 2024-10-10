import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuBar from './MenuBar';
import MyAppBar from './MyAppBar';
import { Box, Grid, Container, AppBar, Toolbar } from '@mui/material';

const DashboardLayout = () => {
  return (
    <Box>
      
        <Container maxWidth="lg" sx={{ mt: 64, overflow: 'hidden' }}> 
          <Grid container spacing={2}>
            <Grid item xs={3} sx={{ mt: -64 }}>
              <MenuBar />
            </Grid>
            <Grid item xs={9}>
              <MyAppBar></MyAppBar>
              <Outlet />
            </Grid>
          </Grid>
        </Container>
    
    </Box>
  );
};

export default DashboardLayout;