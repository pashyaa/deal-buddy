import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';



const MenuBar: React.FC<{ open: boolean; onClose: () => void; navigation?: any[] }> = ({ open, onClose, navigation = [] }) => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <SwipeableDrawer
        anchor="left"
        open={open}
        onClose={onClose}
        onOpen={() => {}}
        PaperProps={{ style: { width: 200 } }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {navigation.map((item, index) => (
              <ListItem key={item.title} disablePadding>
                <ListItemButton component="a" href={item.link}>
                  <ListItemText primary={item.title} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </SwipeableDrawer>
    </Box>
  );
};

export default MenuBar;