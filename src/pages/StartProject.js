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
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import PersonIcon from '@mui/icons-material/Person';
import BusinessIcon from '@mui/icons-material/Business';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const StartProject = () => {
  const navigate = useNavigate();
  const { user, isCustomer, isAdmin } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  React.useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Redirect based on user role and authentication status
  React.useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (isAdmin()) {
      navigate('/admin');
    }
  }, [user, isAdmin, navigate]);

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

  // Don't render the form if user is not logged in or is an admin
  if (!user) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
        <Paper 
          elevation={0}
          sx={{ 
            p: 4, 
            textAlign: 'center',
            background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f0 100%)',
            borderRadius: 3,
            border: '1px solid rgba(44, 85, 48, 0.08)',
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              mx: 'auto',
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(44, 85, 48, 0.15) 0%, rgba(212, 212, 170, 0.15) 100%)',
              color: '#2c5530',
            }}
          >
            <RocketLaunchIcon sx={{ fontSize: 32 }} />
          </Box>

          <Typography 
            variant="h5" 
            gutterBottom
            sx={{ 
              color: '#2c5530',
              fontWeight: 700,
              mb: 2
            }}
          >
            Authentication Required
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#666',
              mb: 3
            }}
          >
            You need to be logged in to start a project.
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={() => navigate('/login')}
              sx={{
                background: 'linear-gradient(45deg, #8b4513 30%, #a0522d 90%)',
                color: 'white',
                px: 3,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: '0 6px 24px rgba(139, 69, 19, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #a0522d 30%, #8b4513 90%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 28px rgba(139, 69, 19, 0.4)',
                }
              }}
            >
              Login
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/register')}
              sx={{
                borderColor: '#2c5530',
                color: '#2c5530',
                px: 3,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#2c5530',
                  background: 'rgba(44, 85, 48, 0.05)',
                }
              }}
            >
              Create Account
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }

  // Block admin users from accessing this page
  if (isAdmin()) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
        <Paper 
          elevation={0}
          sx={{ 
            p: 4, 
            textAlign: 'center',
            background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f0 100%)',
            borderRadius: 3,
            border: '1px solid rgba(44, 85, 48, 0.08)',
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              mx: 'auto',
              mb: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.15) 0%, rgba(44, 85, 48, 0.15) 100%)',
              color: '#8b4513',
            }}
          >
            <BusinessIcon sx={{ fontSize: 32 }} />
          </Box>

          <Typography 
            variant="h5" 
            gutterBottom
            sx={{ 
              color: '#2c5530',
              fontWeight: 700,
              mb: 2
            }}
          >
            Access Restricted
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#666',
              mb: 3
            }}
          >
            Admin users cannot create projects. You can view existing projects from your dashboard.
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              onClick={() => navigate('/admin')}
              sx={{
                background: 'linear-gradient(45deg, #8b4513 30%, #a0522d 90%)',
                color: 'white',
                px: 3,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                boxShadow: '0 6px 24px rgba(139, 69, 19, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(45deg, #a0522d 30%, #8b4513 90%)',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 8px 28px rgba(139, 69, 19, 0.4)',
                }
              }}
            >
              Go to Admin Dashboard
            </Button>
            <Button
              variant="outlined"
              onClick={() => navigate('/')}
              sx={{
                borderColor: '#2c5530',
                color: '#2c5530',
                px: 3,
                py: 1.5,
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600,
                '&:hover': {
                  borderColor: '#2c5530',
                  background: 'rgba(44, 85, 48, 0.05)',
                }
              }}
            >
              Go Home
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
    
    if (!isCustomer()) {
      setError('Only customer accounts can create projects.');
      return;
    }

    if (!validateForm()) return;

    setLoading(true);
    setError('');

    try {
      await firebaseService.saveClientInfoAsync({
        ...formData,
        userId: user.uid,
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
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '35vh',
          display: 'flex',
          alignItems: 'center',
          background: `
            linear-gradient(
              135deg,
              rgba(44, 85, 48, 0.95) 0%,
              rgba(74, 124, 89, 0.9) 50%,
              rgba(107, 142, 107, 0.85) 100%
            )
          `,
          color: 'white',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: `
              radial-gradient(circle at 20% 80%, rgba(139, 69, 19, 0.15) 0%, transparent 50%),
              radial-gradient(circle at 80% 20%, rgba(212, 212, 170, 0.1) 0%, transparent 50%)
            `,
            pointerEvents: 'none',
            animation: 'float 6s ease-in-out infinite'
          },
          '@keyframes float': {
            '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
            '50%': { transform: 'translateY(-20px) rotate(2deg)' },
          },
        }}
      >
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Box
            sx={{
              textAlign: 'center',
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                mx: 'auto',
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <RocketLaunchIcon sx={{ fontSize: 32, color: '#d4d4aa' }} />
            </Box>

            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                fontWeight: 800,
                mb: 2,
                background: 'linear-gradient(45deg, #ffffff 30%, #d4d4aa 90%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                textShadow: '0 4px 8px rgba(0,0,0,0.3)',
                letterSpacing: '-0.02em',
              }}
            >
              Let's Start Your Project!
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                fontWeight: 400,
                fontSize: { xs: '1rem', md: '1.2rem' },
                lineHeight: 1.5,
              }}
            >
              Fill in the details below and we'll get started
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Form Section */}
      <Box
        sx={{
          py: { xs: 4, md: 6 },
          background: 'linear-gradient(180deg, rgba(245,245,220,0.98) 0%, rgba(250,240,230,0.98) 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Alert 
            severity="success" 
            icon={<CheckCircleIcon />}
            sx={{ 
              mb: 4,
              borderRadius: 2,
              background: 'linear-gradient(145deg, #e8f5e9 0%, #c8e6c9 100%)',
              border: '1px solid rgba(44, 85, 48, 0.2)',
              '& .MuiAlert-icon': {
                color: '#2c5530'
              }
            }}
          >
            <Typography sx={{ fontWeight: 600, color: '#2c5530' }}>
              Welcome back, {user.email}! This project will be saved to your account.
            </Typography>
          </Alert>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 4,
                borderRadius: 2,
                background: 'linear-gradient(145deg, #fff5f5 0%, #ffe0e0 100%)',
              }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            {/* Personal Information Card */}
            <Paper 
              elevation={0}
              sx={{ 
                p: { xs: 3, md: 4 },
                mb: 4,
                background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f0 100%)',
                borderRadius: 3,
                border: '1px solid rgba(44, 85, 48, 0.08)',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, #2c5530, #4a7c59)',
                  borderRadius: '12px 12px 0 0',
                }
              }}
            >
              <Grid container spacing={3}>
                {/* Personal Information Header */}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      mb: 2,
                      pb: 2,
                      borderBottom: '2px solid rgba(44, 85, 48, 0.1)'
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(44, 85, 48, 0.15) 0%, rgba(212, 212, 170, 0.15) 100%)',
                        color: '#2c5530',
                      }}
                    >
                      <PersonIcon sx={{ fontSize: 24 }} />
                    </Box>
                    <Typography 
                      variant="h5" 
                      sx={{
                        fontWeight: 700,
                        color: '#2c5530',
                        fontSize: { xs: '1.3rem', md: '1.5rem' }
                      }}
                    >
                      Personal Information
                    </Typography>
                  </Box>
                </Grid>

                {/* Row 1: First Name, Last Name */}
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#2c5530',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#2c5530',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#2c5530',
                      },
                    }}
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#2c5530',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#2c5530',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#2c5530',
                      },
                    }}
                  />
                </Grid>

                {/* Row 2: Email, Mobile */}
                <Grid item xs={12} md={6}>
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        background: 'rgba(44, 85, 48, 0.02)',
                      },
                    }}
                  />
                </Grid>

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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#2c5530',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#2c5530',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#2c5530',
                      },
                    }}
                  />
                </Grid>

                {/* Row 3: Phone Number */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone Number (Optional)"
                    name="Phone_Number"
                    value={formData.Phone_Number}
                    onChange={handleChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#2c5530',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#2c5530',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#2c5530',
                      },
                    }}
                  />
                </Grid>

                {/* Row 4: Physical Address (full width) */}
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#2c5530',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#2c5530',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#2c5530',
                      },
                    }}
                  />
                </Grid>

                {/* Row 5: PO Box, Postal Code */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="PO Box (Optional)"
                    name="PO_Box"
                    value={formData.PO_Box}
                    onChange={handleChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#2c5530',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#2c5530',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#2c5530',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Postal Code (Optional)"
                    name="Postal_Code"
                    value={formData.Postal_Code}
                    onChange={handleChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#2c5530',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#2c5530',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#2c5530',
                      },
                    }}
                  />
                </Grid>
              </Grid>
            </Paper>

            {/* Company Information Card */}
            <Paper 
              elevation={0}
              sx={{ 
                p: { xs: 3, md: 4 },
                background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f0 100%)',
                borderRadius: 3,
                border: '1px solid rgba(139, 69, 19, 0.08)',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'linear-gradient(90deg, #8b4513, #a0522d)',
                  borderRadius: '12px 12px 0 0',
                }
              }}
            >
              <Grid container spacing={3}>
                {/* Company Information Header */}
                <Grid item xs={12}>
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                      mb: 2,
                      pb: 2,
                      borderBottom: '2px solid rgba(139, 69, 19, 0.1)'
                    }}
                  >
                    <Box
                      sx={{
                        width: 48,
                        height: 48,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(139, 69, 19, 0.15) 0%, rgba(44, 85, 48, 0.15) 100%)',
                        color: '#8b4513',
                      }}
                    >
                      <BusinessIcon sx={{ fontSize: 24 }} />
                    </Box>
                    <Typography 
                      variant="h5" 
                      sx={{
                        fontWeight: 700,
                        color: '#8b4513',
                        fontSize: { xs: '1.3rem', md: '1.5rem' }
                      }}
                    >
                      Company Information
                    </Typography>
                  </Box>
                </Grid>

                {/* Row 1: Company Name */}
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
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#8b4513',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#8b4513',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#8b4513',
                      },
                    }}
                  />
                </Grid>

                {/* Row 2: Company Type, VAT Number */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Company Type (Optional)"
                    name="Company_Type"
                    value={formData.Company_Type}
                    onChange={handleChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#8b4513',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#8b4513',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#8b4513',
                      },
                    }}
                  />
                </Grid>

                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="VAT Number (Optional)"
                    name="VAT_Number"
                    value={formData.VAT_Number}
                    onChange={handleChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#8b4513',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#8b4513',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#8b4513',
                      },
                    }}
                  />
                </Grid>

                {/* Row 3: Company Registration Number */}
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Company Registration Number (Optional)"
                    name="Company_Registration_Number"
                    value={formData.Company_Registration_Number}
                    onChange={handleChange}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: '#8b4513',
                        },
                        '&.Mui-focused fieldset': {
                          borderColor: '#8b4513',
                        },
                      },
                      '& .MuiInputLabel-root.Mui-focused': {
                        color: '#8b4513',
                      },
                    }}
                  />
                </Grid>


              </Grid>
            </Paper>

            {/* Submit Button - Outside cards, positioned at bottom right */}
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                startIcon={!loading && <RocketLaunchIcon />}
                sx={{
                  minWidth: 200,
                  background: 'linear-gradient(45deg, #8b4513 30%, #a0522d 90%)',
                  color: 'white',
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: 600,
                  fontSize: '1.1rem',
                  boxShadow: '0 6px 24px rgba(139, 69, 19, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(45deg, #a0522d 30%, #8b4513 90%)',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 28px rgba(139, 69, 19, 0.4)',
                  },
                  '&:disabled': {
                    background: 'rgba(0, 0, 0, 0.12)',
                    color: 'rgba(0, 0, 0, 0.26)',
                  }
                }}
              >
                {loading ? 'Submitting...' : 'Submit Project'}
              </Button>
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default StartProject;