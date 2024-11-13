import React, { useEffect, useState } from 'react';
import { AppBar, Toolbar, Box, Typography, Container, Tabs, Tab, Menu, MenuItem, Divider, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home: React.FC = () => {
  const [categories, setCategories] = useState<{ name: string; image: string }[]>([]);
  const [stores, setStores] = useState<{ name: string; image: string }[]>([]);
  const [activeTab, setActiveTab] = useState<number | null>(null);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.map((category: { name: string; image: string }) => ({ name: category.name, image: category.image })));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchStores = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/stores`);
      const data = await response.json();
      setStores(data.map((store: { name: string; image: string }) => ({ name: store.name, image: store.image })));
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
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src={category.image} alt={category.name} style={{ width: 30, height: 30, marginRight: 8 }} />
              <Typography variant="body1">{category.name}</Typography>
            </Box>
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

      {/* Categories Section */}
      <Container maxWidth="lg" sx={{ minHeight: '82vh', paddingTop: '20px' }}>
        <Typography variant="h4" gutterBottom>All Categories</Typography>
        < Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {categories.map((category, index) => (
            <Card key={index} sx={{ maxWidth: 400 }}>
              <CardActionArea onClick={() => alert(`Category: ${category.name}`)}>
                <CardMedia
                  component="img"
                  height="150"
                  image={category.image}
                  alt={category.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div" align="center">
                    {category.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>

        {/* Stores Section */}
        <Typography variant="h4" gutterBottom sx={{ marginTop: '40px' }}>All Stores</Typography>
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
          {stores.map((store, index) => (
            <Card key={index} sx={{ maxWidth: 400 }}>
              <CardActionArea>
                <CardMedia
                  component="img"
                  height="150"
                  image={store.image}
                  alt={store.name}
                />
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div" align="center">
                    {store.name}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
      </Container>
    </div>
  );
};

export default Home;