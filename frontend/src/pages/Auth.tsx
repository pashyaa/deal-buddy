import * as React from 'react';
import { useState, useEffect } from 'react';
import { AuthProvider, AuthResponse, AppProvider, SignInPage, SupportedAuthProvider } from '@toolpad/core';
import { useTheme } from '@mui/material/styles';
import { Paper, Grid, Box, Container, CssBaseline } from '@mui/material';
import { useNavigate, Navigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';


const providers: AuthProvider[] = [
  {
    id: 'credentials' as SupportedAuthProvider,
    name: 'Email and password',
  },
];


const signIn: (
  provider: AuthProvider,
  formData?: FormData,
  navigate?: ReturnType<typeof useNavigate>
  ) => Promise<AuthResponse> | void = async (provider, formData, navigate) => {
  const email = formData?.get('email');
  const password = formData?.get('password');

  try {
   
    const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (response.ok) {
      
      localStorage.setItem('token', data.token);

      
      if (navigate) {
        navigate('/dashboard');
      }

      return {
        type: 'CredentialsSignin',
        token: data.token,
      };
    } else {
      return {
        type: 'CredentialsSignin',
        error: 'Invalid credentials.',
      };
    }
  } catch (error) {
    console.error(error);
    return {
      type: 'CredentialsSignin',
      error: 'Failed to login.',
    };
  }
};

export default function NotificationsSignInPageError() {
  const theme = useTheme();
  const navigate = useNavigate(); 

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true); 
    }
    setIsLoading(false); 
  }, []);


  if (isLoading) {
    return <div>Loading...</div>;
  }


  if (isLoggedIn) {
    return <Navigate to="/dashboard" replace />;
  }
  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CssBaseline />
      <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#F5F5DC' }}>
        <AppProvider theme={theme}>
        <SignInPage signIn={(provider, formData) => signIn(provider, formData, navigate)} providers={providers} />
          <Grid container justifyContent="center">
            <Grid item>
              <p>{`Don't have an account? `}<Link to="/register">Register now!</Link></p>
            </Grid>
          </Grid>
        </AppProvider>
      </Paper>
    </Container>
  );
}