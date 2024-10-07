import { Box, Typography } from '@mui/material';

const Footer = () => {
  return (
    <Box sx={{ height: 70, display: 'flex', justifyContent: 'center', paddingTop: 0, paddingBottom: 'auto' }}>
      <Typography variant="body2" color="text.secondary">
        Copyright {new Date().getFullYear()} DealBuddy
      </Typography>
    </Box>
  );
};

export default Footer;