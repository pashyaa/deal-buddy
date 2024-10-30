import React, { useState, ChangeEvent, useEffect } from 'react';
import {
  Grid, Button, Typography, Container, Box, TextField, FormControl, InputLabel, Select, MenuItem, Paper, Table, TableBody, TableCell, TableHead, TableRow, IconButton, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { SelectChangeEvent } from '@mui/material';

interface Coupon {
  id?: number;
  code: string;
  description: string;
  discountType: 'Percentage' | 'Flat';
  discountValue: string;
  expiryDate: string;
  status: string;
  categoryId?: string;
  storeId?: string;
  categoryName?: string;
  storeName?: string;
}

interface Category {
  id: number;
  name: string;
}

interface Store {
  id: number;
  name: string;
}
const Coupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [stores, setStores] = useState<Store[]>([]);
  const [couponData, setCouponData] = useState<Omit<Coupon, 'status'>>({

    code: '',
    description: '',
    discountType: 'Percentage',
    discountValue: '',
    expiryDate: '',
    categoryId: '',
    storeId: '',
  });

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [couponToDelete, setCouponToDelete] = useState<number | undefined>(undefined);
  const [currentCouponId, setCurrentCouponId] = useState<number | undefined>(undefined);

  const fetchCategories = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`);
      const data = await response.json();
      console.log("Categories:", data); // Log categories data
      setCategories(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching categories:', error.message);
      } else {
        console.error('Unknown error fetching categories:', error);
      }
    }
  };
  
  const fetchStores = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/stores`);
      const data = await response.json();
      console.log("Stores:", data); // Log stores data
      setStores(data);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error fetching stores:', error.message);
      } else {
        console.error('Unknown error fetching stores:', error);
      }
    }
  };
  
  const fetchCoupons = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/coupons`);
      const data = await response.json();
  
      const updatedCoupons = data.map((coupon: any) => {
        const category = categories.find((cat) => cat.id === coupon.categoryId);
        const store = stores.find((store) => store.id === coupon.storeId);
  
        return {
          ...coupon,
          categoryName: category ? category.name : 'Unknown',
          storeName: store ? store.name : 'Unknown',
        };
      });
  
      setCoupons(updatedCoupons);
    } catch (error) {
      console.error('Error fetching coupons:', error);
    }
  };
  

  useEffect(() => {
    const fetchData = async () => {
      await fetchCategories();
      await fetchStores();
      await fetchCoupons();
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (categories.length > 0 && stores.length > 0) {
      fetchCoupons();
    }
  }, [categories, stores]);
  
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCouponData({ ...couponData, [name]: value });
  };

  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setCouponData({ ...couponData, [name]: value });
  };

  const handleAddCoupon = async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/coupons`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...couponData, status: 'Active' }),
      });

      if (!response.ok) throw new Error('Failed to add coupon');

      await fetchCoupons(); // Refresh coupons after adding
      setCouponData({
        code: '',
        description: '',
        discountType: 'Percentage',
        discountValue: '',
        expiryDate: '',
        categoryId: '',
        storeId: '',
      });
    } catch (error) {
      console.error('Error adding coupon:', error);
    }
  };


  const handleEditCoupon = async (id: number) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/coupons/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(couponData),
      });
      if (!response.ok) throw new Error('Failed to update coupon');

      await fetchCoupons(); 
      setCouponData({
        code: '',
        description: '',
        discountType: 'Percentage',
        discountValue: '',
        expiryDate: '',
        categoryId: '',
        storeId: '',
      });
      setIsEditing(false);
      setCurrentCouponId(undefined);
    } catch (error) {
      console.error('Error updating coupon:', error);
    }
  };


  const handleSelectCouponForEdit = (coupon: Coupon) => {
    setCouponData({
      code: coupon.code,
      description: coupon.description,
      discountType: coupon.discountType,
      discountValue: coupon.discountValue,
      expiryDate: coupon.expiryDate,
      categoryId: coupon.categoryId,
      storeId: coupon.storeId,
    });
    setIsEditing(true);
    setCurrentCouponId(coupon.id);
  };

  const handleDeleteCoupon = async (id: number) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/coupons/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete coupon');
      }

      await fetchCoupons();
    } catch (error) {
      console.error('Error deleting coupon:', error);
    }
  };

  const formatExpiryDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const handleButtonClick = async () => {
    if (isEditing && currentCouponId) {
      await handleEditCoupon(currentCouponId);
    } else {
      await handleAddCoupon();
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', marginTop: '20px' }}>
      <Container
        maxWidth="md"
        sx={{
          position: 'fixed',
          top: 100,
          right: 10,
          left: '18%',
          width: '100%',
          pt: 2,
          pb: 2,
          zIndex: 1,
          boxShadow: 3,
          borderRadius: 4,
          flex: 'full',
          paddingTop: '20px',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <Typography variant="h4" sx={{ textAlign: 'center', color: '#000000' }}>Coupons</Typography>
        </Box>
        <Grid container spacing={2} sx={{ mt: 0 }}>
          <Grid item xs={4}>
            <TextField
              size="small"
              label="Code"
              name="code"
              value={couponData.code}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              label="Description"
              name="description"
              value={couponData.description}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <FormControl fullWidth required size="small">
              <InputLabel shrink>Discount Type</InputLabel>
              <Select
                name="discountType"
                value={couponData.discountType}
                onChange={handleSelectChange}
                label="Discount Type"
              >
                <MenuItem value="Percentage">Percentage</MenuItem>
                <MenuItem value="Flat">Flat</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              label="Discount Value"
              name="discountValue"
              type="number"
              value={couponData.discountValue}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={4}>
            <TextField
              size="small"
              label="Expiry Date"
              name="expiryDate"
              type="date"
              value={couponData.expiryDate}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={4}>
          <FormControl fullWidth required>
              <InputLabel shrink>Category</InputLabel>
              <Select name="categoryId" value={couponData.categoryId || ''} onChange={handleSelectChange}>
                {categories.map((category) => <MenuItem key={category.id} value={category.id}>{category.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
          <FormControl fullWidth required>
              <InputLabel shrink>Store</InputLabel>
              <Select name="storeId" value={couponData.storeId || ''} onChange={handleSelectChange}>
                {stores.map((store) => <MenuItem key={store.id} value={store.id}>{store.name}</MenuItem>)}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={4}>
            <Button variant="contained" color="primary" onClick={handleButtonClick}>
              {isEditing ? 'Update Coupon' : 'Add Coupon'}
            </Button>
          </Grid>
        </Grid>
        <Paper sx={{ mt: 2 }}>
          <Table size="small">
            <TableHead>
              <TableRow sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                <TableCell sx={{ width: 80, px: 1, fontWeight: 'bold' }}>Sr No</TableCell>
                <TableCell sx={{ width: 150, px: 1, fontWeight: 'bold' }}>Code</TableCell>
                <TableCell sx={{ width: 80, px: 1, fontWeight: 'bold' }}>Category</TableCell>
                <TableCell sx={{ width: 80, px: 1, fontWeight: 'bold' }}>Store</TableCell>
                <TableCell sx={{ width: 80, px: 1, fontWeight: 'bold' }}>Discount Type</TableCell>
                <TableCell sx={{ width: 80, px: 1, fontWeight: 'bold' }}>Discount Value</TableCell>
                <TableCell sx={{ width: 80, px: 1, fontWeight: 'bold' }}>Expiry Date</TableCell>
                <TableCell sx={{ width: 80, px: 1, fontWeight: 'bold' }}>Status</TableCell>
                <TableCell sx={{ width: 80, px: 1, fontWeight: 'bold' }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {coupons.length > 0 && coupons.map((coupon, index) => (
                <TableRow key={index}>
                  <TableCell sx={{ width: 80, px: 0.5 }}>{index + 1}</TableCell>
                  <TableCell sx={{ width: 150, px: 0.5 }}>{coupon.code}</TableCell>
                  <TableCell sx={{ width: 80, px: 0.5 }}>{coupon.categoryName}</TableCell>
                  <TableCell sx={{ width: 80, px: 0.5 }}>{coupon.storeName}</TableCell>
                  <TableCell sx={{ width: 80, px: 0.5 }}>{coupon.discountType}</TableCell>
                  <TableCell sx={{ width: 80, px: 0.5 }}>{coupon.discountValue}</TableCell>
                  <TableCell sx={{ width: 80, px: 0.5 }}>{formatExpiryDate(coupon.expiryDate)}</TableCell>
                  <TableCell sx={{ width: 80, px: 0.5 }}>{coupon.status}</TableCell>
                  <TableCell sx={{ width: 60, px: 0.5 }}>
                    <IconButton aria-label="edit" size="small" onClick={() => handleSelectCouponForEdit(coupon)}>
                      <EditIcon />
                    </IconButton>
                    &nbsp;&nbsp;
                    <IconButton
                      aria-label="delete"
                      size="small"
                      onClick={() => {
                        if (coupon.id !== undefined) {
                          setCouponToDelete(coupon.id);
                          setDialogOpen(true);
                        } else {
                          console.error('Coupon ID is undefined');
                        }
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>

                  </TableCell>
                </TableRow>
              ))}
            </TableBody>

          </Table>
        </Paper>

      </Container>
      <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          Are you sure you want to delete this coupon?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDialogOpen(false)} color="primary">
            Cancel
          </Button>
          <Button
            onClick={() => {
              if (couponToDelete !== undefined) {
                handleDeleteCoupon(couponToDelete);
                setDialogOpen(false);
                setCouponToDelete(undefined);
              }
            }}
            color="primary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Coupons;