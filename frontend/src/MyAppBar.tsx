import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import MenuBar from './MenuBar';
import Users from './Users';
import Coupons from './Coupons';
import { Link } from 'react-router-dom';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';

const NAVIGATION = [
  {
    title: 'Users',
    link: '/dashboard/users',
  },
  {
    title: 'Coupons',
    link: '/dashboard/coupons',
  },
];

export default function ButtonAppBar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: '#F5F5DC', width: `83%`, 
    left: '18%' }}> 
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: 24 }}>
            <span style={{
              backgroundImage: 'linear-gradient(to right, #ff69b4, #ffa07a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              <Link to="/" onClick={() => {}}>DEAL BUDDY</Link>
            </span>
          </Typography>
          <Button color="inherit" onClick={handleLogout} sx={{ ml: 'auto',color: 'black', fontSize: 18, fontWeight: 'bold' }}>
            Logout
          </Button>
        </Toolbar>
      </AppBar>
      <MenuBar navigation={NAVIGATION} />
      <Routes>
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/dashboard/coupons" element={<Coupons/>} />
      </Routes>
    </Box>
  );
}