import React, { useState } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper,
  Alert 
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';

const ContactUs = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
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
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }
    
    if (!formData.description.trim()) {
      errors.description = 'Description is required';
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
      // For now, we'll simulate email sending
      // You'll need to configure EmailJS or implement a backend email service
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API call
      
      console.log('Email data:', {
        name: formData.name,
        email: formData.email,
        message: `${formData.name} asked about:\n${formData.description}`
      });

      navigate('/email-sent');
    } catch (err) {
      setError('Failed to send email. Please try again.');
      console.error('Error sending email:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* Header Ribbon */}
      <Box sx={{ 
        backgroundColor: '#4CAF50', 
        color: 'white', 
        textAlign: 'center', 
        py: 2 
      }}>
        <Typography variant="h3" component="h1">
          Contact Us
        </Typography>
      </Box>

      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3 }}>
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              error={!!formErrors.name}
              helperText={formErrors.name}
              required
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
              required
              sx={{ mb: 3 }}
            />

            <TextField
              fullWidth
              label="Description"
              name="description"
              multiline
              rows={5}
              value={formData.description}
              onChange={handleChange}
              error={!!formErrors.description}
              helperText={formErrors.description}
              required
              sx={{ mb: 3 }}
            />

            <Box sx={{ textAlign: 'center' }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{ minWidth: 200 }}
              >
                {loading ? 'Sending...' : 'Submit'}
              </Button>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ContactUs;