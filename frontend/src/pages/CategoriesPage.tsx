
import React, { useEffect, useState } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';

const CategoriesPage: React.FC = () => {
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`);
      const data = await response.json();
      setCategories(data.map((category: any) => category.name));
    };
    fetchCategories();
  }, []);

  return (
    <Container maxWidth="lg">
        <Paper variant="outlined" sx={{ p: 2, width: '100%',height:'100%' }}>
      <Typography variant="h4" gutterBottom>All Categories</Typography>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
        {categories.map((category, index) => (
          <Typography key={index} variant="body1">
            {category}
          </Typography>
        ))}
      </Box>
      </Paper>
    </Container>
  );
};

export default CategoriesPage;
