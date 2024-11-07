
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box } from '@mui/material';

const StorePage: React.FC = () => {
  const [stores, setStores] = useState<{ name: string; image: string }[]>([]);

  useEffect(() => {
    const fetchStores = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/stores`);
      const data = await response.json();
      setStores(data.map((store: any) => ({ name: store.name, image: store.image })));
    };
    fetchStores();
  }, []);

  return (
    <Container>
      <Typography variant="h4" gutterBottom>All Stores</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {stores.map((store, index) => (
          <Box key={index} sx={{ textAlign: 'center', width: 100 }}>
            <img src={store.image} alt={store.name} style={{ width: '100%', borderRadius: '50%' }} />
            <Typography variant="body1">{store.name}</Typography>
          </Box>
        ))}
      </Box>
    </Container>
  );
};

export default StorePage;
