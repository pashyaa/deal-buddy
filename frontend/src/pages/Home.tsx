import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Box, Typography, Grid, Button, Container, Tabs, Tab } from '@mui/material';
import featureImage1 from '../assets/images/placeholder-1.png';
import featureImage2 from '../assets/images/placeholder-2.png';
import featureImage3 from '../assets/images/placeholder-3.png';

const Home: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [stores, setStores] = useState<{ name: string; image: string }[]>([]);
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`);
      const data = await response.json();
      setCategories(data.map((category: any) => category.name));
    };

    const fetchStores = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/stores`);
      const data = await response.json();
      setStores(data.map((store: any) => ({ name: store.name, image: store.image })));
    };

    fetchCategories();
    fetchStores();
  }, []);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <div>
      {/* Hero Section */}

      {/* Navigation Bar */}
      <AppBar position="static" color="default" sx={{  bgcolor: '#f8f8f8' }}>
        <Toolbar>
          <Tabs value={activeTab} onChange={handleTabChange} aria-label="Category and Store Tabs">
            <Tab label="Categories" />
            <Tab label="Stores" />
          </Tabs>
        </Toolbar>

        {/* Tab Content */}
        {activeTab === 0 && (
          <Toolbar>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {categories.map((category, index) => (
                <Typography key={index} variant="body1">
                  {category}
                </Typography>
              ))}
            </Box>
          </Toolbar>
        )}
        {activeTab === 1 && (
          <Toolbar>
            <Box sx={{ display: 'flex', gap: 2 }}>
              {stores.map((store, index) => (
                <Box
                  key={index}
                  sx={{
                    position: 'relative',
                    width: 60,
                    height: 60,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    '&:hover .store-name': { display: 'block' },
                  }}
                >
                  <img
                    src={store.image}
                    alt={store.name}
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <Typography
                    className="store-name"
                    variant="caption"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      width: '100%',
                      bgcolor: 'rgba(0, 0, 0, 0.6)',
                      color: '#fff',
                      textAlign: 'center',
                      display: 'none',
                    }}
                  >
                    {store.name}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Toolbar>
        )}
      </AppBar>

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
