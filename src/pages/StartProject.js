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
import { firebaseService } from '../services/FirebaseService';

const StartProject = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    First_Name: '',
    Last_Name: '',
    Mobile_Number: '',
    Phone_Number: '',
    Email_Address: '',
    Physical_Address: '',
    PO_Box: '',
    Postal_Code: '',
    Company_Name: '',
    Company_Type: '',
    VAT_Number: '',
    Company_Registration_Number: ''
  });

const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
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

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.Email_Address && !emailRegex.test(formData.Email_Address)) {
      errors.Email_Address = 'Please enter a valid email address';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setLoading(true);
    setError('');

    try {
      await firebaseService.saveClientInfoAsync(formData);
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
          Your Company Information
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box component="form" onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            {/* Personal Information */}
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
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

            {/* Contact Information */}
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="Phone_Number"
                value={formData.Phone_Number}
                onChange={handleChange}
                error={!!formErrors.Phone_Number}
                helperText={formErrors.Phone_Number}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email Address"
                name="Email_Address"
                type="email"
                value={formData.Email_Address}
                onChange={handleChange}
                error={!!formErrors.Email_Address}
                helperText={formErrors.Email_Address}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Physical Address"
                name="Physical_Address"
                value={formData.Physical_Address}
                onChange={handleChange}
                error={!!formErrors.Physical_Address}
                helperText={formErrors.Physical_Address}
                required
              />
            </Grid>

            {/* Address Information */}
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="PO Box"
                name="PO_Box"
                value={formData.PO_Box}
                onChange={handleChange}
                error={!!formErrors.PO_Box}
                helperText={formErrors.PO_Box}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Postal Code"
                name="Postal_Code"
                value={formData.Postal_Code}
                onChange={handleChange}
                error={!!formErrors.Postal_Code}
                helperText={formErrors.Postal_Code}
              />
            </Grid>

            {/* Company Information */}
            <Grid item xs={12} md={6}>
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
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company Type"
                name="Company_Type"
                value={formData.Company_Type}
                onChange={handleChange}
                error={!!formErrors.Company_Type}
                helperText={formErrors.Company_Type}
              />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="VAT Number"
                name="VAT_Number"
                value={formData.VAT_Number}
                onChange={handleChange}
                error={!!formErrors.VAT_Number}
                helperText={formErrors.VAT_Number}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Company Registration Number"
                name="Company_Registration_Number"
                value={formData.Company_Registration_Number}
                onChange={handleChange}
                error={!!formErrors.Company_Registration_Number}
                helperText={formErrors.Company_Registration_Number}
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