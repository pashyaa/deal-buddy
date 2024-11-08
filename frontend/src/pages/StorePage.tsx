import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';

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
    <Container maxWidth="lg" sx={{ minHeight: '82vh', paddingTop: '20px', flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>All Stores</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {stores.map((store, index) => (
          <Card key={index} sx={{ maxWidth: 400 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={store.image}
                alt={store.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {store.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default StorePage;
