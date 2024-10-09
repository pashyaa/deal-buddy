import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuBar from './MenuBar';
import ProductList from './ProductList';
import Order from './Orders';
import { Link } from 'react-router-dom';
import { Routes, Route, useNavigate } from 'react-router-dom';

const NAVIGATION = [
  {
    title: 'Products',
    link: '/dashboard/products',
  },
  {
    title: 'Orders',
    link: '/dashboard/orders',
  },
];

export default function ButtonAppBar() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null); 

  const handleToggle = () => {
    setOpen(!open);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };
  

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: '#F5F5DC' }}> {/* Beige background color */}
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleToggle}
          >
            <Button sx={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>Menu</Button>
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: 24 }}>
            <span style={{
              backgroundImage: 'linear-gradient(to right, #ff69b4, #ffa07a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              <Link to="/" onClick={handleClose}>DEAL BUDDY</Link>
            </span>
          </Typography>
          <Button color="inherit" onClick={handleLogout} sx={{ ml: 'auto',color: 'black', fontSize: 18, fontWeight: 'bold' }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <MenuBar open={open} onClose={handleToggle} navigation={NAVIGATION} />
      <Routes>
        <Route path="/dashboard/products" element={<ProductList />} />
        <Route path="/dashboard/orders" element={<Order />} />
      </Routes>
    </Box>
  );
}
