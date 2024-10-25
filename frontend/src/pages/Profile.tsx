import * as React from 'react';
import { useState, useEffect } from 'react';
import { Paper, Grid, Container, CssBaseline, TextField, Button, Snackbar, Alert } from '@mui/material';
import { useNavigate, Navigate } from 'react-router-dom';


interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  country: string;
}
interface UserResponse {
  user: ProfileFormData & { id: number }; 
}
export default function Profile() {
  const [profileData, setProfileData] = useState<ProfileFormData>({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    country: ''
  });

  const [userId, setUserId] = useState<number | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    const storedUserId = localStorage.getItem('userId'); 
    if (token) {
      setIsLoggedIn(true);
      if (storedUserId) {
        setUserId(Number(storedUserId)); 
      }
    }
    setIsLoading(false);  
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');
      console.log('Token:', token);
      console.log('User  ID:', userId); 
      if (token && userId) { 
        try {
          const endpoint = `${process.env.REACT_APP_API_URL}/users/${userId}`;
          console.log(`Fetching from: ${endpoint}`);
          const response = await fetch(endpoint, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error('Fetch failed with status:', response.status, 'Response:', errorText);
            throw new Error('Failed to fetch profile data');
          }

          const data = await response.json();
          console.log('Fetched data:', data); 

         
          const { firstName, lastName, email, mobile, country } = data; 
          setProfileData({ firstName, lastName, email, mobile, country });
        } catch (error) {
          console.error('Error fetching profile data:', error);
        }
      } else {
        console.error('No valid token or userId not set');
      }
    };
  
    if (isLoggedIn) {
      fetchProfile();
    }
  }, [navigate, isLoggedIn, userId]);

  const handleSave = async () => {
    const token = localStorage.getItem('token');
    if (token && userId !== null) {
      try {
        const response = await fetch(`${process.env.REACT_APP_API_URL}/users/${userId}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(profileData),
        });

        if (!response.ok) {
          throw new Error('Failed to update user');
        }

        const data = await response.json();
        console.log('User  updated successfully', data);
        setOpenSnackbar(true);
      } catch (error) {
        console.error('Error updating user:', error);
      }
    }
  };

  const handleCloseSnackbar = (event: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return <Navigate to="/auth" replace />;
  }


  return (
    <Container maxWidth="sm" sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: '75px',marginBottom:'75px'}}>
      <CssBaseline />
      <Paper variant="outlined" sx={{ p: 2, width: '100%' }}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <h2 style={{ marginBottom: '10px' }}>Personal Details</h2> 
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="firstName"
              label="First Name"
              value={profileData.firstName}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 1 }} 
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              name="lastName"
              label="Last Name"
              value={profileData.lastName}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 1 }} 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="email"
              label="Email"
              value={profileData.email}
              onChange={handleChange}
              fullWidth
              disabled 
              sx={{ marginBottom: 1 }} 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="mobile"
              label="Mobile"
              value={profileData.mobile}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 1}} 
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              name="country"
              label="Country"
              value={profileData.country}
              onChange={handleChange}
              fullWidth
              sx={{ marginBottom: 1 }} 
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth onClick={handleSave}>
              Save
            </Button>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={(event) => handleCloseSnackbar(event, 'clickaway')} severity="success" sx={{ width: '100%' }}>
          User updated successfully!
        </Alert>
      </Snackbar>
    </Container>
  );
}