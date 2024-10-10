import React from 'react';
import { Grid, Button, Typography, Table, TableHead, TableRow, TableCell, TableBody, TextField, FormControl, FormLabel, Container, Box, Tabs, Tab } from '@mui/material';
const Coupons = () => {
  return (
    <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
    <Box sx={{ position: 'fixed', top: 60, left: '5%', right: 0, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', color: 'white', py: 2 , border: ' solid #000000'}}>
      <Typography variant="h4" sx={{ flex: 1, textAlign: 'center',color: '#000000' }}>Coupons</Typography>
      </Box>
      <Container maxWidth="sm" sx={{
       position: 'fixed', top: 150, right: 0, left: '15%', width: '100%', pt: 6, pb: 6, zIndex: 1,
       boxShadow: 3,
       borderRadius: 4,
       backgroundColor: '#D5D5D5',
       flex: 'none',
       maxHeight: 560
      }}>
         <Grid container spacing={2}>
    <Grid item xs={12}>
      <Typography variant="h6">Vouchers</Typography>
     
    </Grid>
    <Grid item xs={12}>
      <Typography variant="h6">Offers</Typography>
    
    </Grid>
  </Grid>

        
      </Container>

    </Box>
  );
};

export default Coupons;