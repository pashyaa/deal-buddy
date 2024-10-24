import React from 'react';
import { Outlet } from 'react-router-dom';
import MenuBar from '../components/MenuBar';
import MyAppBar from '../components/MyAppBar';
import Dashboardfooter from '../components/Dashboardfooter';
import { Box, Grid, Container } from '@mui/material';

const DashboardLayout = () => {
  return (
    <Box >
      <MyAppBar />
      <Container maxWidth="lg" >
        <Grid container spacing={2}>
          <Grid item xs={3}>
            <MenuBar />
          </Grid>
          <Grid item xs={9}>
            <Outlet />
          </Grid>
        </Grid>
      </Container>
      <Dashboardfooter />
    </Box>
  );
};

export default DashboardLayout;