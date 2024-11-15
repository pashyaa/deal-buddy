import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Box, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography } from '@mui/material';

const CouponsByStore: React.FC = () => {
    const { storeId } = useParams<{ storeId: string }>();
    const [storeName, setStoreName] = useState<string>('');
    const [coupons, setCoupons] = useState<any[]>([]);

    useEffect(() => {
        const fetchStoreAndCoupons = async () => {
            try {
                // Fetch store details to get the name
                const storeResponse = await fetch(`${process.env.REACT_APP_API_URL}/stores/${storeId}`);
                const storeData = await storeResponse.json();
                setStoreName(storeData.name);

                // Fetch coupons for the store
                const couponsResponse = await fetch(`${process.env.REACT_APP_API_URL}/coupons/store/${storeId}`);
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

    return (
        <Container maxWidth="lg" sx={{ minHeight: '82vh', paddingTop: '20px', flexGrow: 1 }}>
            <Typography variant="h4" gutterBottom>
                Coupons for {storeName}
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
                <Paper sx={{ mt: 2, width: '100%' }}>
                    <Table size="small">
                        <TableHead>
                            <TableRow sx={{ position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>
                                <TableCell sx={{ width: 80, px: 1, fontWeight: 'bold' }}>Sr No</TableCell>
                                <TableCell sx={{ width: 150, px: 1, fontWeight: 'bold' }}>Code</TableCell>
                                <TableCell sx={{ width: 80, px: 1, fontWeight: 'bold' }}>Category</TableCell>
                                <TableCell sx={{ width: 80, px: 1, fontWeight: 'bold' }}>Store</TableCell>
                                <TableCell sx={{ width: 80, px: 1, fontWeight: 'bold' }}>Discount Type</TableCell>
                                <TableCell sx={{ width: 80, px: 1, fontWeight: 'bold' }}>Discount Value</TableCell>
                                <TableCell sx={{ width: 150, px: 1, fontWeight: 'bold' }}>Description</TableCell>
                                <TableCell sx={{ width: 80, px: 1, fontWeight: 'bold' }}>Expiry Date</TableCell>
                                <TableCell sx={{ width: 80, px: 1, fontWeight: 'bold' }}>Status</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {coupons.map((coupon, index) => (
                                <TableRow key={coupon.id}>
                                    <TableCell>{index + 1}</TableCell>
                                    <TableCell>{coupon.code}</TableCell>
                                    <TableCell>{coupon.Category?.name || 'N/A'}</TableCell>
                                    <TableCell>{coupon.Store?.name || 'N/A'}</TableCell>
                                    <TableCell>{coupon.discountType}</TableCell>
                                    <TableCell>{coupon.discountValue}</TableCell>
                                    <TableCell>{coupon.description}</TableCell>
                                    <TableCell>{formatExpiryDate(coupon.expiryDate)}</TableCell>
                                    <TableCell>{coupon.status}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </Paper>
            </Box>
        </Container>
    );
};

export default CouponsByStore;
