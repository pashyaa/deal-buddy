import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Card, CardContent, CardActionArea } from '@mui/material';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`);
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data.map((category: { name: string }) => category.name));
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  return (
    <Container maxWidth="lg" sx={{ minHeight: '82vh', paddingTop: '20px' }}>
      <Typography variant="h4" gutterBottom>
        All Categories
      </Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {categories.map((category, index) => (
          <Card key={index} sx={{ maxWidth: 400, height: 140 }}>
            <CardActionArea onClick={() => alert(` ${category}`)}>
              <CardContent>
                <Typography variant="body1" align="center">
                  {category}
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
