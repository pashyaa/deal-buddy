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
import { Routes, Route, Link } from 'react-router-dom';

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

  const handleToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexGrow: 1 }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={handleToggle}
          >
            <Button color="inherit">Menu</Button>
          </IconButton>
          <Button color="inherit">Login</Button>
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