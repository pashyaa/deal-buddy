import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, CardMedia, CardActionArea } from '@mui/material';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<{ name: string; image: string }[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.map((category: any) => ({ name: category.name, image: category.image })));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ minHeight: '82vh', paddingTop: '20px', flexGrow: 1 }}>
      <Typography variant="h4" gutterBottom>All Categories</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {categories.map((category, index) => (
          <Card key={index} sx={{ maxWidth: 400 }}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="150"
                image={category.image}
                alt={category.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h6" component="div">
                  {category.name}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Container>
  );
};

export default CategoriesPage;
