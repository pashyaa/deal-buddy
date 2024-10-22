
import React from 'react';
import { Box, Container, Typography } from '@mui/material';



const Dashboardfooter: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#666', color: '#fff', py: 3, mt: 6 }}>
      <Container>
        <Typography variant="body2" align="center"sx={{ ml: 2  }}>
          &copy; {new Date().getFullYear()} DealBuddy. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Dashboardfooter;