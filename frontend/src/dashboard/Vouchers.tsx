// Dashboard.tsx
import React from 'react';
import { Grid, Container, Typography, Button } from '@mui/material';

interface Coupon {
  id: number;
  code: string;
  discount: number;
  expirationDate: string;
}

interface Voucher {
  id: number;
  code: string;
  discount: number;
  expirationDate: string;
}

const coupons: Coupon[] = [
  { id: 1, code: 'COUPON1', discount: 10, expirationDate: '2024-10-31' },
  { id: 2, code: 'COUPON2', discount: 20, expirationDate: '2024-11-30' },
  { id: 3, code: 'COUPON3', discount: 30, expirationDate: '2024-12-31' },
];

const vouchers: Voucher[] = [
  { id: 1, code: 'VOUCHER1', discount: 10, expirationDate: '2024-10-31' },
  { id: 2, code: 'VOUCHER2', discount: 20, expirationDate: '2024-11-30' },
  { id: 3, code: 'VOUCHER3', discount: 30, expirationDate: '2024-12-31' },
];

const Dashboard: React.FC = () => {
  return (
    <Container maxWidth="lg">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h4">Discount Coupons</Typography>
          <ul>
            {coupons.map((coupon) => (
              <li key={coupon.id}>
                <Typography variant="body1">
                  {coupon.code} - {coupon.discount}% off (expires {coupon.expirationDate})
                </Typography>
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Vouchers</Typography>
          <ul>
            {vouchers.map((voucher) => (
              <li key={voucher.id}>
                <Typography variant="body1">
                  {voucher.code} - {voucher.discount}% off (expires {voucher.expirationDate})
                </Typography>
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={12}>
          <Button variant="contained" color="primary">
            Redeem Coupon/Voucher
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;