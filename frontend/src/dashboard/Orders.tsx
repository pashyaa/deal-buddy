import React from 'react';
import { Grid, Button, Typography, Table, TableHead, TableRow, TableCell, TableBody, TextField, FormControl, FormLabel, Container, Box, Tabs, Tab } from '@mui/material';
const Order = () => {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
  <Box sx={{ position: 'fixed', top: 60, left: 0, right: 0, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#000000', color: 'white', py: 2 }}>
        <Typography variant="h4">Orders</Typography>
      </Box>
      <Container maxWidth="lg" sx={{
        position: 'fixed', top: 150, right: 0, left: 0, width: '100%', pt: 6, pb: 6, zIndex: 1, 
        boxShadow: 3,
        borderRadius: 4,
        overflow: 'auto',
        flex: 'none',
      }}>
         <Grid container spacing={2}>
    <Grid item xs={6}>
      <Typography variant="h6">Products Ordered</Typography>
     
    </Grid>
    <Grid item xs={6}>
      <Typography variant="h6">Cancel Orders</Typography>
    
    </Grid>
  </Grid>

        
      </Container>

    </Box>
  );
};

export default Order;