import React from 'react';
import { Paper, Grid, Box } from '@mui/material';

const Home = () => {
  return (
    <div>
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '100vh' }}
      >
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center' }}>
            <Paper variant="outlined" sx={{ maxWidth: 800, p: 2, backgroundColor: '#F5F5DC' }}>
              <h1 style={{
                fontWeight: 'bold',
                fontSize: '36px',
                backgroundImage: 'linear-gradient(to right, #ff69b4, #ffa07a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent'
              }}>
                Welcome to DealBuddy!
              </h1>
              <p>Get the best coupons and cashback offers here.</p>
            </Paper>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Home;