import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Paper, Grid, Box, Container, CssBaseline, Link, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface RegistrationFormData {
  email: string;
  password: string;
  confirmPassword: string;
}

const registration = async (formData: RegistrationFormData) => {
  try {
    console.log(process.env.REACT_APP_API_URL);
    const response = await fetch(process.env.REACT_APP_API_URL +'/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const data = await response.json();
      alert(data.message);
    } else {
      alert('Registration failed.');
    }
  } catch (error) {
    console.error(error);
    alert('Registration failed.');
  }
};

export default function Createaccount() {
  const theme = useTheme();
  const navigate = useNavigate();
  const [formData, setFormData] = React.useState<RegistrationFormData>({
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = { email: '', password: '', confirmPassword: '' };

    // Basic email validation
    if (!formData.email) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid.';
      isValid = false;
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
      isValid = false;
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Confirm Password is required.';
      isValid = false;
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async () => {
    if (validateForm()) {
      try {
        await registration(formData);
        navigate('/auth', { replace: true });
      } catch (error) {
        console.error(error);
        alert('Registration failed.');
      }
    }
  };

  return (
    <Container maxWidth="sm" sx={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <CssBaseline />
      <Paper variant="outlined" sx={{ p: 2, backgroundColor: '#F5F5DC' }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <h2>Registration Form</h2>
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={!!errors.email}
              helperText={errors.email}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Password"
              type="password"
              fullWidth
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              error={!!errors.password}
              helperText={errors.password}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              label="Confirm Password"
              type="password"
              fullWidth
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
            />
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" color="primary" fullWidth onClick={handleSubmit}>
              Register
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Grid container justifyContent="center">
              <Grid item>
                <p> Already have an account? <Link href="/auth">Login here!</Link>
                </p>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
}