import * as React from 'react';
import { useState, useEffect } from 'react';
import { Paper, Grid, Container, CssBaseline, TextField, Button, } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface ProfileFormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  country: string;
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

  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem('token');

      if (token) {
        try {
          const response = await fetch(`${process.env.REACT_APP_API_URL}/profile`, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          });

          if (!response.ok) {
            throw new Error('Failed to fetch profile data');
          }

          const data = await response.json();
          const { firstName, lastName, email, mobile, country, id } = data.user;
          setProfileData({ firstName, lastName, email, mobile, country });
          setUserId(id); 
        } catch (error) {
          console.error('Error fetching profile data:', error);
          
          navigate('/login');
        }
      } else {
       
        navigate('/auth');
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
  };

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
        console.log('User updated successfully', data);
       
      } catch (error) {
        console.error('Error updating user:', error);
       
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CssBaseline />
      <Paper variant="outlined" sx={{ p: 2,  width: '100%' }}>
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
    </Container>
  );
}
