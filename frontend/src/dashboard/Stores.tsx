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
  Typography,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

interface Store {
  id?: number;
  name: string;
  image?: string;
}

const StoresPage: React.FC = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [image, setImage] = useState<File | null>(null);
  const [storeData, setStoreData] = useState<Store>({ name: '' });
  const [editId, setEditId] = useState<number | undefined>(undefined);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [storeToDelete, setStoreToDelete] = useState<number | undefined>(undefined);

  const fetchStores = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/stores`);
      if (!response.ok) throw new Error('Failed to fetch stores');
      
      const data = await response.json();
      setStores(data);
    } catch (error) {
      console.error('Error fetching stores:', error);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setStoreData({ ...storeData, name: e.target.value });
  };

  const handleAddStore = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/stores`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storeData),
      });
      if (!response.ok) throw new Error('Failed to add store');

      await fetchStores();
      setStoreData({ name: '' });
    } catch (error) {
      console.error('Error adding store:', error);
    }
  };

  const handleEditStore = async (id: number) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/stores/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(storeData),
      });
      if (!response.ok) throw new Error('Failed to update store');

      await fetchStores();
      setStoreData({ name: '' });
      setEditId(undefined);
    } catch (error) {
      console.error('Error updating store:', error);
    }
  };

  const handleDeleteStore = async (id: number) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/stores/${id}`, { method: 'DELETE' });
      if (!response.ok) throw new Error('Failed to delete store');

      await fetchStores();
    } catch (error) {
      console.error('Error deleting store:', error);
    }
  };

  const handleButtonClick = async () => {
    if (editId) {
      await handleEditStore(editId);
    } else {
      await handleAddStore();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
      <Container maxWidth="md" sx={{ position: 'fixed', top: 100, width: '100%', pt: 2, pb: 2, boxShadow: 3, borderRadius: 4 }}>
        <Typography variant="h4" sx={{ textAlign: 'center', color: '#000000' }}>Stores</Typography>
        <Grid container spacing={2}>
          <Grid item xs={8}>
            <TextField
              label="Store Name"
              value={storeData.name}
              onChange={handleInputChange}
              fullWidth
              size="small"
              required
            />
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" color="primary" onClick={handleButtonClick} fullWidth>
              {editId ? 'Update Store' : 'Add Store'}
            </Button>
          </Grid>
        </Grid>

        <Paper sx={{ mt: 2 }}>
          <TableContainer>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Sr No</TableCell>
                  <TableCell>Store Name</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {stores.map((store, index) => (
                  <TableRow key={store.id}>
                    <TableCell>{index + 1}</TableCell>
                    <TableCell>{store.name}</TableCell>
                    <TableCell>
                      <IconButton aria-label="edit" onClick={() => { setStoreData({ name: store.name }); setEditId(store.id); }}>
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        aria-label="delete"
                        onClick={() => {
                          setStoreToDelete(store.id);
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
          <DialogContent>Are you sure you want to delete this store?</DialogContent>
          <DialogActions>
            <Button onClick={() => setDialogOpen(false)} color="primary">Cancel</Button>
            <Button
              onClick={async () => {
                if (storeToDelete) await handleDeleteStore(storeToDelete);
                setDialogOpen(false);
                setStoreToDelete(undefined);
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

export default StoresPage;
