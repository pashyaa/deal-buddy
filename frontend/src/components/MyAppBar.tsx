import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { Routes, Route, useNavigate } from 'react-router-dom';
import MenuBar from './MenuBar';
import Users from '../dashboard/Users';
import Coupons from '../dashboard/Coupons';

const NAVIGATION = [
  { title: 'Users', link: '/dashboard/users' },
  { title: 'Coupons', link: '/dashboard/coupons' },
];

export default function ButtonAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };
  

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
    handleClose();
  };

  return (
    <Box sx={{ width: '100%', display: 'flex', flexGrow: 1 }}>
      <AppBar position="fixed" sx={{ bgcolor: '#F5F5DC', width: '83%', left: '18%' }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: 24 }}>
            <span
              style={{
                backgroundImage: 'linear-gradient(to right, #ff69b4, #ffa07a)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              <Link to="/">
                DEAL BUDDY
              </Link>
            </span>
          </Typography>
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            sx={{ color: 'black' }}
          >
            <AccountCircle sx={{ fontSize: 40 }} />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchorEl}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            open={Boolean(anchorEl)}
            onClose={handleClose}
            
          >
            <MenuItem onClick={handleClose}>
              <Link to="/profile" style={{ textDecoration: 'none', color: 'inherit' }}>
                Profile
              </Link>
            </MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
      <MenuBar navigation={NAVIGATION} />
      <Routes>
        <Route path="/dashboard/users" element={<Users />} />
        <Route path="/dashboard/coupons" element={<Coupons />} />
      </Routes>
    </Box>
  );
}
