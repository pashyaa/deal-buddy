import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Box, Typography, Container, Tabs, Tab, Grid, Menu, MenuItem, Divider } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import featureImage1 from '../assets/images/placeholder-1.png';
import featureImage2 from '../assets/images/placeholder-2.png';
import featureImage3 from '../assets/images/placeholder-3.png';

const Home: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [stores, setStores] = useState<{ name: string; image: string }[]>([]);
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

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

  const handleTabClick = (event: React.MouseEvent<HTMLElement>, tabIndex: number) => {
    setAnchorEl(event.currentTarget);
    setActiveTab(tabIndex);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setActiveTab(null);
  };

  return (
    <div>
      <AppBar position="static" color="default" sx={{ bgcolor: '#f8f8f8' }}>
        <Toolbar>
          <Tabs value={activeTab} onChange={(e, value) => setActiveTab(value)} aria-label="Category and Store Tabs">
            <Tab label="Categories" onClick={(e) => handleTabClick(e, 0)} />
            <Tab label="Stores" onClick={(e) => handleTabClick(e, 1)} />
          </Tabs>
        </Toolbar>
      </AppBar>

      {/* Menu for Categories and Stores */}
      <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
        {activeTab === 0 && categories.map((category, index) => (
          <MenuItem key={index} onClick={handleClose}>
            {category}
          </MenuItem>
        ))}
        {activeTab === 1 && stores.map((store, index) => (
          <MenuItem key={index} onClick={handleClose}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={store.image} alt={store.name} style={{ width: 30, height: 30, marginRight: 8 }} />
              <Typography variant="body1">{store.name}</Typography>
            </Box>
          </MenuItem>
        ))}
        
        <Divider />

        {/* "More" button at the bottom */}
        {activeTab === 0 && (
          <MenuItem onClick={() => navigate('/home/categories')}>
            <Typography variant="body1" color="primary">More Categories</Typography>
          </MenuItem>
        )}
        {activeTab === 1 && (
          <MenuItem onClick={() => navigate('/home/stores')}>
            <Typography variant="body1" color="primary">More Stores</Typography>
          </MenuItem>
        )}
      </Menu>

      {/* Feature Section */}
      <Container sx={{ py: 6 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Why Choose DealBuddy?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          <Grid item xs={12} sm={6} md={4}>
            <Box textAlign="center">
              <img src={featureImage1} alt="Feature 1" style={{ width: '100%' }} />
              <Typography variant="h6" gutterBottom>Best Deals</Typography>
              <Typography>Access the most exclusive deals across multiple platforms with ease.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box textAlign="center">
              <img src={featureImage2} alt="Feature 2" style={{ width: '100%' }} />
              <Typography variant="h6" gutterBottom>Verified Coupons</Typography>
              <Typography>Get verified and updated coupons, ensuring you always save on purchases.</Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Box textAlign="center">
              <img src={featureImage3} alt="Feature 3" style={{ width: '100%' }} />
              <Typography variant="h6" gutterBottom>Easy to Use</Typography>
              <Typography>Our user-friendly interface helps you find deals quickly and efficiently.</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default Home;
