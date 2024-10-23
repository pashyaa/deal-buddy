import * as React from 'react';
import { useTheme } from '@mui/material/styles';
import { Paper, Grid, Container, CssBaseline, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

interface RegistrationFormData {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  country: string;
  password: string;
  confirmPassword: string;
}

const registration = async (formData: RegistrationFormData) => {
  try {
    console.log(process.env.REACT_APP_API_URL);
    const response = await fetch(process.env.REACT_APP_API_URL + '/users', {
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
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    country: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = React.useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    country: '',
    password: '',
    confirmPassword: '',
  });

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      country: '',
      password: '',
      confirmPassword: '',
    };

    if (!formData.firstName) {
      newErrors.firstName = 'First Name is required.';
      isValid = false;
    }

    if (!formData.lastName) {
      newErrors.lastName = 'Last Name is required.';
      isValid = false;
    }

    if (!formData.email) {
      newErrors.email = 'Email is required.';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is not valid.';
      isValid = false;
    }

    if (!formData.mobile) {
      newErrors.mobile = 'Mobile number is required.';
      isValid = false;
    }

    if (!formData.country) {
      newErrors.country = 'Country is required.';
      isValid = false;
    }

    if (!formData.password) {
      newErrors.password = 'Password is required.';
      isValid = false;
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters long.';
      isValid = false;
    }

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
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <h2 style={{ marginBottom: '10px' }}>Registration Form</h2> 
        </Grid>
        <Grid item xs={12} container spacing={1}>
          <Grid item xs={6}>
            <TextField
              label="First Name"
              fullWidth
              value={formData.firstName}
              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
              error={!!errors.firstName}
              helperText={errors.firstName}
              sx={{ marginBottom: 0.5 }} 
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Last Name"
              fullWidth
              value={formData.lastName}
              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
              error={!!errors.lastName}
              helperText={errors.lastName}
              sx={{ marginBottom: 0.5 }} 
            />
          </Grid>
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
            sx={{ marginBottom: 0.5 }} 
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Mobile Number"
            type='number' 
            fullWidth
            value={formData.mobile}
            onChange={(e) => {
              const mobile = e.target.value.slice(0, 10);  
              setFormData({ ...formData, mobile });
            }}
            error={!!errors.mobile}
            helperText={errors.mobile}
            sx={{ marginBottom: 0.5 }} 
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            label="Country"
            fullWidth
            value={formData.country}
            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
            error={!!errors.country}
            helperText={errors.country}
            sx={{ marginBottom: 0.5 }} 
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
            sx={{ marginBottom: 0.5 }} 
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
            sx={{ marginBottom: 0.5 }} 
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
              <p>Already have an account? <Link to="/auth">Login here!</Link></p>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Paper>
  </Container>
  
  );
}
