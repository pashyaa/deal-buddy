import React, { useState, ChangeEvent } from 'react';
import { Grid, Button, Typography, Container, Box, TextField, FormControl, FormLabel, Select, MenuItem, SelectChangeEvent } from '@mui/material';

interface Coupon {
  code: string;
  description: string;
  discountType: 'Percentage' | 'Flat';
  discountValue: string;
  expiryDate: string;
  status: string;
}

const Coupons = () => {
  const [coupons, setCoupons] = useState<Coupon[]>([]);
  const [couponData, setCouponData] = useState<Omit<Coupon, 'status'>>({
    code: '',
    description: '',
    discountType: 'Percentage',
    discountValue: '',
    expiryDate: ''
  });

 
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCouponData({ ...couponData, [name]: value });
  };


  const handleSelectChange = (e: SelectChangeEvent<string>) => {
    const { name, value } = e.target;
    setCouponData({ ...couponData, [name]: value });
  };

  const handleAddCoupon = () => {
    setCoupons([...coupons, { ...couponData, status: 'Active' }]);
    setCouponData({ code: '', description: '', discountType: 'Percentage', discountValue: '', expiryDate: '' }); 
  };

  return (
    <Box sx={{ width: '100%', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Container
        maxWidth="md"
        sx={{
          position: 'fixed',
          top: 100,
          right: 10,
          left: '18%',
          width: '100%',
          pt: 6,
          pb: 6,
          zIndex: 1,
          boxShadow: 3,
          borderRadius: 4,
          flex: 'full',
          maxHeight: 590
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h4" sx={{ textAlign: 'center', color: '#000000' }}>Coupons</Typography>
        </Box>
        <Typography variant="h6">Add Coupon</Typography>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Code"
              name="code"
              value={couponData.code}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Description"
              name="description"
              value={couponData.description}
              onChange={handleInputChange}
              fullWidth
              InputLabelProps={{ shrink: true }}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl fullWidth required>
              <FormLabel>Discount Type</FormLabel>
              <Select
                name="discountType"
                value={couponData.discountType}
                onChange={handleSelectChange}
              >
                <MenuItem value="Percentage">Percentage</MenuItem>
                <MenuItem value="Flat">Flat</MenuItem>
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={6}>
            <TextField
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
          <Grid item xs={6}>
            <TextField
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
          <Grid item xs={12}>
            <Button variant="contained" color="primary" onClick={handleAddCoupon}>
              Add Coupon
            </Button>
          </Grid>
        </Grid>

        <Typography variant="h6" sx={{ mt: 4 }}>Coupons List</Typography>
        <Container sx={{ maxHeight: 100, overflowY: 'auto', mt: 1, p: 1 }}>
  {coupons.length > 0 ? (
    coupons.map((coupon, index) => (
      <Container key={index} sx={{ border: '1px solid #000', p: 1, mt: 1}}>
        <Typography variant="body1">Code: {coupon.code}</Typography>
        <Typography variant="body1">Description: {coupon.description}</Typography>
        <Typography variant="body1">Discount Type: {coupon.discountType}</Typography>
        <Typography variant="body1">Discount Value: {coupon.discountValue}</Typography>
        <Typography variant="body1">Expiry Date: {coupon.expiryDate}</Typography>
        <Typography variant="body1">Status: {coupon.status}</Typography>
      </Container>
    ))
  ) : (
    <Typography variant="body1">No coupons added yet.</Typography>
  )}
</Container>

      </Container>
    </Box>
  );
};

export default Coupons;
