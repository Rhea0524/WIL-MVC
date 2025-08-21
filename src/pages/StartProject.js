import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Grid, 
  Paper, 
  Box,
  Alert
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { firebaseService } from '../services/FirebaseService';

const StartProject = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Redirect to login if user is not authenticated
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const [formData, setFormData] = useState({
    First_Name: '',
    Last_Name: '',
    Mobile_Number: '',
    Phone_Number: '',
    Email_Address: user?.email || '',
    Physical_Address: '',
    PO_Box: '',
    Postal_Code: '',
    Company_Name: '',
    Company_Type: '',
    VAT_Number: '',
    Company_Registration_Number: ''
  });

  const [formErrors, setFormErrors] = useState({});

  // Don't render the form if user is not logged in
  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            Authentication Required
          </Typography>
          <Typography variant="body1" color="text.secondary" paragraph>
            You need to be logged in to start a project.
          </Typography>
          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              onClick={() => navigate('/login')}
              sx={{ mr: 2 }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/register')}
            >
              Create Account
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const requiredFields = [
      'First_Name', 'Last_Name', 'Mobile_Number', 'Email_Address', 
      'Physical_Address', 'Company_Name'
    ];

    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        errors[field] = 'This field is required';
      }
    });

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.Email_Address && !emailRegex.test(formData.Email_Address)) {
      errors.Email_Address = 'Please enter a valid email address';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      await firebaseService.saveClientInfoAsync({
        ...formData,
        userId: user.uid, // Associate project with logged-in user
        userEmail: user.email,
        timestamp: new Date().toISOString(),
        submittedAt: Date.now()
      });
      
      navigate('/completed');
    } catch (err) {
      setError('Failed to submit form. Please try again.');
      console.error('Error submitting form:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Let's start your project!
        </Typography>

        <Alert severity="success" sx={{ mb: 3 }}>
          Welcome back, {user.email}! This project will be saved to your account.
        </Alert>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Personal Information */}
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                name="First_Name"
                value={formData.First_Name}
                onChange={handleChange}
                error={!!formErrors.First_Name}
                helperText={formErrors.First_Name}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                name="Last_Name"
                value={formData.Last_Name}
                onChange={handleChange}
                error={!!formErrors.Last_Name}
                helperText={formErrors.Last_Name}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Mobile Number"
                name="Mobile_Number"
                value={formData.Mobile_Number}
                onChange={handleChange}
                error={!!formErrors.Mobile_Number}
                helperText={formErrors.Mobile_Number}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="Phone_Number"
                value={formData.Phone_Number}
                onChange={handleChange}
              />
            </Grid>

          <TextField
  fullWidth
  label="Email Address"
  name="Email_Address"
  type="email"
  value={formData.Email_Address}
  onChange={handleChange}
  required
  disabled={true}
  helperText="Email address from your account"
/>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Physical Address"
                name="Physical_Address"
                multiline
                rows={3}
                value={formData.Physical_Address}
                onChange={handleChange}
                error={!!formErrors.Physical_Address}
                helperText={formErrors.Physical_Address}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="PO Box"
                name="PO_Box"
                value={formData.PO_Box}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Postal Code"
                name="Postal_Code"
                value={formData.Postal_Code}
                onChange={handleChange}
              />
            </Grid>

            {/* Company Information */}
            <Grid item xs={12}>
              <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>
                Company Information
              </Typography>
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Name"
                name="Company_Name"
                value={formData.Company_Name}
                onChange={handleChange}
                error={!!formErrors.Company_Name}
                helperText={formErrors.Company_Name}
                required
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Company Type"
                name="Company_Type"
                value={formData.Company_Type}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="VAT Number"
                name="VAT_Number"
                value={formData.VAT_Number}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Registration Number"
                name="Company_Registration_Number"
                value={formData.Company_Registration_Number}
                onChange={handleChange}
              />
            </Grid>

            {/* Submit Button */}
            <Grid item xs={12}>
              <Box sx={{ textAlign: 'center', mt: 3 }}>
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  disabled={loading}
                  sx={{ minWidth: 200 }}
                >
                  {loading ? 'Submitting...' : 'Submit'}
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Paper>
    </Container>
  );
};

export default StartProject;