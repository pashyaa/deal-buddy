
import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box sx={{ bgcolor: '#333', color: '#fff', py: 3}}>
      <Container >
        <Typography variant="body2" align="center">
          &copy; {new Date().getFullYear()} DealBuddy. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;