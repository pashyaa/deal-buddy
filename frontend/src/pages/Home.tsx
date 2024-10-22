import React from 'react';
import { Box, Typography, Grid, Button, Container } from '@mui/material';
import featureImage1 from '../assets/images/placeholder-1.png';
import featureImage2 from '../assets/images/placeholder-2.png';
import featureImage3 from '../assets/images/placeholder-3.png';

const Home: React.FC = () => {
  return (
    <div>
      {/* Hero Section */}
      <Box sx={{ bgcolor: '#f5f5f5', py: 8, textAlign: 'center' }}>
        <Typography variant="h2" gutterBottom>
          Welcome to DealBuddy
        </Typography>
        <Typography variant="h5" paragraph>
          Find the best deals, coupons, and offers on online shopping!
        </Typography>
        <Button variant="contained" color="primary" size="large">
          Get Started
        </Button>
      </Box>

      {/* Feature Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Why Choose DealBuddy?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Box textAlign="center">
              <img src={featureImage1} alt="Feature 1" style={{ width: '100%' }} />
              <Typography variant="h6" gutterBottom>
                Best Deals
              </Typography>
              <Typography>
                Access the most exclusive deals across multiple platforms with ease.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box textAlign="center">
              <img src={featureImage2} alt="Feature 2" style={{ width: '100%' }} />
              <Typography variant="h6" gutterBottom>
                Verified Coupons
              </Typography>
              <Typography>
                Get verified and updated coupons, ensuring you always save on purchases.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box textAlign="center">
              <img src={featureImage3} alt="Feature 3" style={{ width: '100%' }} />
              <Typography variant="h6" gutterBottom>
                Easy to Use
              </Typography>
              <Typography>
                Our user-friendly interface helps you find deals quickly and efficiently.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;