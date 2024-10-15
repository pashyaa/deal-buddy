import React, { useState } from 'react';
import { AuthProvider, AppProvider, SignInPage, SupportedAuthProvider } from '@toolpad/core';
import { useTheme } from '@mui/material/styles';
import { Paper, Grid, Box, Container, CssBaseline } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const providers: AuthProvider[] = [
  {
    id: 'credentials' as SupportedAuthProvider,
    name: 'Email and password',
  },
];

// Define AuthResponse type here
type AuthResponse = {
  type: 'CredentialsSignin';
  token?: string;
  error?: string;
};

const signIn: (
  provider: AuthProvider,
  formData?: FormData,
  navigate?: ReturnType<typeof useNavigate>
) => Promise<AuthResponse | void> = async (provider, formData, navigate) => {
  const email = formData?.get('email');
  const password = formData?.get('password');

  try {
    console.log('Checking localStorage for token before login:', localStorage.getItem('token'));

    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
      return {
        type: 'CredentialsSignin',
        error: 'Another user is currently logged in. Please try again later.',
      };
    }

    // Send the login request
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
    } else if (data.error === 'Someone is already logged in. Please log out first.') {
      localStorage.removeItem('token');
      return {
        type: 'CredentialsSignin',
        error: 'Another user is currently logged in. Please try again later.',
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
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async (provider: AuthProvider, formData: FormData): Promise<AuthResponse> => {
    const result = await signIn(provider, formData, navigate); // result can be AuthResponse or void

    if (!result) {
      return {
        type: 'CredentialsSignin',
        error: 'Unexpected error occurred.',
      };
    }

    if (result.error) {
      setError(result.error);  
    }

    return result;  
  };
  

  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CssBaseline />
      <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#F5F5DC' }}>
        <AppProvider theme={theme}>
          {error && <Box sx={{ color: 'red', mb: 2 }}>{error}</Box>}
          <SignInPage signIn={handleSignIn} providers={providers} />
          <Grid container justifyContent="center">
            <Grid item>
              <p>Don't have an account? <Link to="/register">Register now!</Link></p>
            </Grid>
          </Grid>
        </AppProvider>
      </Paper>
    </Container>
  );
}