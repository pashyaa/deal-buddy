import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, Box, Typography, Grid, Card, CardContent, 
  CardMedia, Button, Dialog, DialogTitle, DialogContent, DialogActions 
} from '@mui/material';

const CouponsByStore: React.FC = () => {
  const { storeId } = useParams<{ storeId: string }>();
  const [storeName, setStoreName] = useState<string>(''); // Store name
  const [image, setImage] = useState<string>(''); // Store image as Base64
  const [coupons, setCoupons] = useState<any[]>([]); 
  const [dialogOpen, setDialogOpen] = useState<boolean>(false); 
  const [selectedCouponCode, setSelectedCouponCode] = useState<string>(''); 

  const uint8ArrayToBase64 = (uint8Array: Uint8Array): string => {
    let binary = '';
    const chunkSize = 8192; 
    for (let i = 0; i < uint8Array.length; i += chunkSize) {
      binary += String.fromCharCode.apply(
        null,
        Array.from(uint8Array.slice(i, i + chunkSize))
      );
    }
    return btoa(binary);
  };

  useEffect(() => {
    const fetchStoreAndCoupons = async () => {
      try {
        // Fetch store details to get the name and image
        const storeResponse = await fetch(`${process.env.REACT_APP_API_URL}/stores/${storeId}`);
        if (!storeResponse.ok) throw new Error('Failed to fetch store details');
        const storeData = await storeResponse.json();
        setStoreName(storeData.name);

        if (storeData.image?.data) {
          const uint8Array = new Uint8Array(storeData.image.data);
          const base64Image = `data:image/jpeg;base64,${uint8ArrayToBase64(uint8Array)}`;
          setImage(base64Image);
        }

        // Fetch coupons for the store
        const couponsResponse = await fetch(`${process.env.REACT_APP_API_URL}/coupons/store/${storeId}`);
        if (!couponsResponse.ok) throw new Error('Failed to fetch coupons');
        const couponsData = await couponsResponse.json();
        setCoupons(couponsData);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchStoreAndCoupons();
  }, [storeId]);

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
            alt={storeName}
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
          Coupons for {storeName}
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

export default CouponsByStore;
