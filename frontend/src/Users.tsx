import React, { useState, useEffect } from 'react';
import { Grid, Button, Typography, Table, TableHead, TableRow, TableCell, TableBody, TextField, FormControl, FormLabel, Container, Box, Tabs, Tab } from '@mui/material';
import Paper from '@mui/material/Paper';
import MenuBar from './MenuBar';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Product {
  id: number;
  name: string;
  price: number;
  quantity: number;
}
interface NewProduct {
  name: string;
  price: number;
  quantity: number;
}

const Users = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);
  const [editingProductId, setEditingProductId] = useState<number | null>(null);

  useEffect(() => {
    const storedProducts = localStorage.getItem('products');
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  const handleSaveProduct = () => {
    if (editingProductId !== null && editingProductId !== undefined) {
      const updatedProduct: Product = {
        id: editingProductId,
        name,
        price,
        quantity
      };
      const updatedProducts = products.map(product => {
        if (product.id === editingProductId) {
          return updatedProduct;
        }
        return product;
      });
      setProducts(updatedProducts);
      localStorage.setItem('products', JSON.stringify(updatedProducts));
      setEditingProductId(null);
      setName('');
      setPrice(0);
      setQuantity(0);
    } else {
      const newProduct: NewProduct = {
        name,
        price,
        quantity
      };
      const newProductId = Math.max(...products.map(product => product.id), 0) + 1;
      const newProductWithId: Product = { id: newProductId, ...newProduct };
      setProducts([...products, newProductWithId]);
      localStorage.setItem('products', JSON.stringify([...products, newProductWithId]));
      setName('');
      setPrice(0);
      setQuantity(0);
    }
  };

  const handleEditProduct = (id: number) => {
    const productToEdit = products.find(product => product.id === id);
    if (productToEdit) {
      setEditingProductId(id);
      setName(productToEdit.name);
      setPrice(productToEdit.price);
      setQuantity(productToEdit.quantity);
    }
  };

  const handleDeleteProduct = (id: number) => {
    setProducts(products.filter(product => product.id !== id));
    localStorage.setItem('products', JSON.stringify(products.filter(product => product.id !== id)));
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ position: 'fixed', top: 60, left: '5%', right: 0, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#FFFFFF', color: 'white', py: 2 , border: ' solid #000000'}}>
        <Typography variant="h4" sx={{ flex: 1, textAlign: 'center',color: '#000000' }}>Users</Typography>
      </Box>

      <Container maxWidth="md" sx={{
        position: 'fixed', top: 150, right: 0, left: '18%', width: '100%', pt: 6, pb: 6, zIndex: 1,
        boxShadow: 3,
        borderRadius: 4,
        flex: 'none',
        maxHeight: 560
      }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box sx={{ flex: 1 }}>
            <Grid container spacing={2}>
             
              <Grid item xs={12}>
                <Typography variant="h4">User List</Typography>
                <Paper sx={{ maxHeight: 175,backgroundColor: '#F5F5F5', overflow: 'auto' }}>
                  <Table>
                    <TableRow sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                      <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white', width: 150, px: 1 }}>First Name</TableCell>
                      <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white', width: 100, px: 1 }}>Last Name</TableCell>
                      <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white', width: 100, px: 1 }}>Email</TableCell>
                      <TableCell sx={{ position: 'sticky', left: 0, backgroundColor: 'white', width: 80, px: 1 }}>Actions</TableCell>
                    </TableRow>
                    <TableBody>
                      {products.length > 0 && products.map((product: Product) => (
                        <TableRow key={product.id}>
                          <TableCell sx={{ width: 150, px: 1 }}>{product.name}</TableCell>
                          <TableCell sx={{ width: 100, px: 1 }}>${product.price}</TableCell>
                          <TableCell sx={{ width: 100, px: 1 }}>{product.quantity}</TableCell>
                          <TableCell sx={{ width: 80, px: 1 }}>
                            <IconButton aria-label="edit" onClick={() => handleEditProduct(product.id)}>
                              <EditIcon />
                            </IconButton>
                            &nbsp;&nbsp;{/* Add a little bit of space between the icons */}
                            <IconButton aria-label="delete" onClick={() => handleDeleteProduct(product.id)}>
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Paper>
              </Grid>
            </Grid>

          </Box>

        </Box>
      </Container>

    </Box>
  );
};

export default Users;