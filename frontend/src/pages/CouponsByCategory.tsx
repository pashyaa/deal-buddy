import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';

const CouponsByCategory: React.FC = () => {
  const { categoryId } = useParams<{ categoryId: string }>();
  const [categoryName, setCategoryName] = useState<string>(''); // Category name
  const [image, setImage] = useState<string>(''); // Category image URL
  const [coupons, setCoupons] = useState<any[]>([]); // Coupons list
  const [dialogOpen, setDialogOpen] = useState<boolean>(false); // Dialog visibility
  const [selectedCouponCode, setSelectedCouponCode] = useState<string>(''); // Selected coupon code

  useEffect(() => {
    const fetchCategoryAndCoupons = async () => {
      try {
        // Fetch category details to get the name and image
        const categoryResponse = await fetch(`${process.env.REACT_APP_API_URL}/categories/${categoryId}`);
        if (!categoryResponse.ok) throw new Error('Failed to fetch category details');
        const categoryData = await categoryResponse.json();
        setCategoryName(categoryData.name);
        setImage(categoryData.image);

        // Fetch coupons for the category
        const couponsResponse = await fetch(`${process.env.REACT_APP_API_URL}/coupons/category/${categoryId}`);
        if (!couponsResponse.ok) throw new Error('Failed to fetch coupons');
        const couponsData = await couponsResponse.json();
        setCoupons(couponsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchCategoryAndCoupons();
  }, [categoryId]);

  const formatExpiryDate = (date: string) => {
    return new Date(date).toLocaleDateString();
  };

  const handleRedeemClick = (couponCode: string) => {
    setSelectedCouponCode(couponCode);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedCouponCode('');
  };

  return (
    <Container maxWidth="lg" sx={{ minHeight: '82vh', paddingTop: '20px', flexGrow: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
        {image && (
          <CardMedia
            component="img"
            image={image}
            alt={categoryName}
            sx={{
              width: 100,
              height: 100,
              borderRadius: '50%',
              marginRight: '20px',
              objectFit: 'cover',
            }}
          />
        )}
        <Typography variant="h4" gutterBottom>
          Coupons for {categoryName}
        </Typography>
      </Box>
      <Grid container spacing={3}>
        {coupons.map((coupon) => (
          <Grid item xs={12} sm={6} md={4} key={coupon.id}>
            <Card sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
              <CardMedia
                component="div"
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  backgroundColor: '#f7f7f7',
                  height: 100,
                  fontSize: '2rem',
                  fontWeight: 'bold',
                }}
              >
                {coupon.discountValue}{' '}
                {coupon.discountType === 'Percentage' ? '%' : coupon.discountType}
              </CardMedia>
              <CardContent>
                <Typography variant="h6" component="div" gutterBottom>
                  {coupon.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Store: {coupon.Store?.name || 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Category: {coupon.Category?.name || 'N/A'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Expiry Date: {formatExpiryDate(coupon.expiryDate)}
                </Typography>
              </CardContent>
              <Box sx={{ p: 2, mt: 'auto' }}>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  onClick={() => handleRedeemClick(coupon.code)}
                >
                  Redeem Coupon
                </Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Dialog for displaying coupon code */}
      <Dialog open={dialogOpen} onClose={handleCloseDialog}>
        <DialogTitle>Coupon Code</DialogTitle>
        <DialogContent>
          <Typography variant="h6" align="center">
            {selectedCouponCode}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CouponsByCategory;
