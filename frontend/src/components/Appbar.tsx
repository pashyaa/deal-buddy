import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { Link, useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import useMediaQuery from '@mui/material/useMediaQuery';
import AccountCircle from '@mui/icons-material/AccountCircle';

const MenuItems = () => {
  return (
    <div>
      <MenuItem>
        <Typography textAlign="center">About</Typography>
      </MenuItem>
      <MenuItem>
        <Typography textAlign="center">Contact</Typography>
      </MenuItem>
    </div>
  );
};

export default function MenuAppBar() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [accountMenuEl, setAccountMenuEl] = React.useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  
  // Check if the user is authenticated
  const isAuthenticated = !!localStorage.getItem('token');

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAccountMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAccountMenuEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setAccountMenuEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/auth');
    handleClose();
  };

  const isMobile = useMediaQuery("(max-width:600px)");
  const isDesktop = useMediaQuery("(min-width:600px)");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#F5F5DC' }}>
        <Toolbar>
          {isMobile && (
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={handleMenu}
            >
              <MenuIcon sx={{ color: 'black', fontSize: 36, fontWeight: 'bold' }} />
            </IconButton>
          )}
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold', fontSize: 24 }}>
            <span style={{
              backgroundImage: 'linear-gradient(to right, #ff69b4, #ffa07a)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent'
            }}>
              <Link to="/" onClick={handleClose}>DEAL BUDDY</Link>
            </span>
          </Typography>

          {/* Display About and Contact buttons on Desktop */}
          {isDesktop && (
            <div>
              <Button sx={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
                Contact
              </Button>
              <Button sx={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
                About
              </Button>
            </div>
          )}

         

          
          {isAuthenticated ? (
            <>
              <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls="menu-account"
                aria-haspopup="true"
                onClick={handleAccountMenu}
                color="inherit"
                sx={{ color: 'black' }}  
              >
                <AccountCircle sx={{ fontSize: 40 }} />  
              </IconButton>
              <Menu
                id="menu-account"
                anchorEl={accountMenuEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(accountMenuEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>
                  <Link to="/dashboard/users" style={{ textDecoration: 'none', color: 'inherit' }}>
                    Profile
                  </Link>
                </MenuItem>
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Button component={Link} to="/auth" sx={{ color: 'black', fontSize: 18, fontWeight: 'bold' }}>
              Login
            </Button>
          )}

          {isMobile && (
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
              <MenuItems />
              {!isAuthenticated && (
                <MenuItem component={Link} to="/auth" onClick={handleClose}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
              )}
            </Menu>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
}
