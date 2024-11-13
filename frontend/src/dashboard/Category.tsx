import React, { useState, useEffect, ChangeEvent } from 'react';
import { 
  Box, 
  Button, 
  Container, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle, 
  Grid, 
  IconButton, 
  Paper, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  TextField, 
  Typography 
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Category {
  id?: number;
  name: string;
  image?: string; 
}

const Category = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [categoryData, setCategoryData] = useState<Category>({ name: '' });
  const [isEditing, setIsEditing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [currentCategoryId, setCurrentCategoryId] = useState<number | undefined>(undefined);
  const [categoryToDelete, setCategoryToDelete] = useState<number | undefined>(undefined);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`);
      if (!response.ok) throw new Error('Failed to fetch categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setCategoryData({ ...categoryData, name: e.target.value });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setImage(e.target.files[0]);
    }
  };

  const handleAddCategory = async () => {
    try {
      const formData = new FormData();
      formData.append('name', categoryData.name);
      if (image) formData.append('image', image);

      const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to add category');

      await fetchCategories();
      setCategoryData({ name: '' });
      setImage(null); // Reset image state
    } catch (error) {
      console.error('Error adding category:', error);
    }
  };

  const handleEditCategory = async (id: number) => {
    try {
      const formData = new FormData();
      formData.append('name', categoryData.name);
      if (image) formData.append('image', image);

      const response = await fetch(`${process.env.REACT_APP_API_URL}/categories/${id}`, {
        method: 'PUT',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to update category');

      await fetchCategories();
      setCategoryData({ name: '' });
      setImage(null); // Reset image state
      setIsEditing(false);
      setCurrentCategoryId(undefined);
    } catch (error) {
      console.error('Error updating category:', error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/categories/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete category');

      await fetchCategories();
    } catch (error) {
      console.error('Error deleting category:', error);
    }
  };

  const handleButtonClick = async () => {
    if (isEditing && currentCategoryId) {
      await handleEditCategory(currentCategoryId);
    } else {
      await handleAddCategory();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
      <Container maxWidth="md" sx={{
        position: 'fixed', top: 100, right: 10, left: '18%', width: '100%',
        pt: 2, pb: 2, zIndex: 1, boxShadow: 3, borderRadius: 4
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ textAlign: 'center', color: '#000000' }}>Categories</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Category Name"
              value={categoryData.name}
              onChange={handleInputChange}
              fullWidth
              size="small"
              required
            />
          </Grid>
          <Grid item xs={6}>
            <Button variant="outlined" component="label" fullWidth>
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImageChange}
              />
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleButtonClick}>
              {currentCategoryId ? 'Update Category' : 'Add Category'}
            </Button>
          </Grid>
        </Grid>

        <Paper sx={{ mt: 2 }}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Sr No</TableCell>
                  <TableCell>Category Name</TableCell>
                  <TableCell>Image</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {categories.map((category, index) => (
                  <TableRow key={category.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{category.name}</TableCell>
                    <TableCell>
                      {category.image && (
                        <img src={category.image} alt={category.name} width="30" height="30" style={{ borderRadius: '4px' }} />
                      )}
                    </TableCell>
                    <TableCell>
                      <IconButton aria-label="edit" onClick={() => { setIsEditing(true); setCategoryData({ name: category.name }); setCurrentCategoryId(category.id); }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          setCategoryToDelete(category.id);
                          setDialogOpen(true);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>Are you sure you want to delete this category?</DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="primary">Cancel</Button>
            <Button
              onClick={async () => {
                if (categoryToDelete) await handleDeleteCategory(categoryToDelete);
                setDialogOpen(false);
                setCategoryToDelete(undefined);
              }}
              color="primary"
            >
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Category;
