import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Box,
  Alert,
  Link
} from '@mui/material';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import LockPersonIcon from '@mui/icons-material/LockPerson';
import PersonIcon from '@mui/icons-material/Person';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear errors when user starts typing
    if (formErrors[name]) {
      setFormErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (error) setError('');
  };

  const validateForm = () => {
    const errors = {};

    // Email validation
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        errors.email = 'Please enter a valid email address';
      }
    }

    // Password validation
    if (!formData.password) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
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
      await login(formData.email, formData.password);
      navigate('/'); // Redirect to home page after successful login
    } catch (err) {
      console.error('Login error:', err);
      
      // Handle different Firebase auth errors
      switch (err.code) {
        case 'auth/user-not-found':
          setError('No account found with this email address.');
          break;
        case 'auth/wrong-password':
          setError('Incorrect password.');
          break;
        case 'auth/invalid-email':
          setError('Invalid email address.');
          break;
        case 'auth/user-disabled':
          setError('This account has been disabled.');
          break;
        case 'auth/too-many-requests':
          setError('Too many failed attempts. Please try again later.');
          break;
        default:
          setError('Login failed. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box>
      {/* Hero Background */}
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: `
            linear-gradient(
              135deg,
              rgba(137, 207, 240, 0.95) 0%,
              rgba(167, 216, 240, 0.9) 50%,
              rgba(186, 225, 245, 0.85) 100%
            )
          `,
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
      />

      {/* Main Content */}
      <Container 
        maxWidth="sm" 
        sx={{ 
          position: 'relative', 
          zIndex: 1,
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          py: 4
        }}
      >
        <Paper 
          elevation={0}
          sx={{ 
            p: { xs: 3, sm: 4 },
            width: '100%',
            background: 'linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(248,248,240,0.98) 100%)',
            borderRadius: 4,
            border: '1px solid rgba(137, 207, 240, 0.08)',
            position: 'relative',
            transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
            opacity: isVisible ? 1 : 0,
            transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)',
            backdropFilter: 'blur(10px)',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #8b4513, #a0522d, #4A9FD5)',
              borderRadius: '16px 16px 0 0',
            }
          }}
        >
          {/* Header with Icon */}
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Box
              sx={{
                width: 72,
                height: 72,
                mx: 'auto',
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, rgba(137, 207, 240, 0.15) 0%, rgba(167, 216, 240, 0.15) 100%)',
              }}
            >
              <LockPersonIcon sx={{ fontSize: 36, color: '#4A9FD5' }} />
            </Box>

            <Typography 
              variant="h3" 
              component="h1" 
              sx={{
                fontSize: { xs: '1.8rem', md: '2.2rem' },
                fontWeight: 700,
                color: '#4A9FD5',
                mb: 1,
                letterSpacing: '-0.01em'
              }}
            >
              Welcome Back
            </Typography>
            
            <Typography 
              variant="h6" 
              sx={{ 
                color: '#666',
                fontSize: { xs: '0.95rem', md: '1rem' },
                lineHeight: 1.5,
                fontWeight: 400
              }}
            >
              Please sign in to your Xamu account
            </Typography>
          </Box>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mb: 3,
                background: 'linear-gradient(145deg, rgba(244, 67, 54, 0.05) 0%, rgba(244, 67, 54, 0.02) 100%)',
                border: '1px solid rgba(244, 67, 54, 0.2)',
                borderRadius: 2,
                '& .MuiAlert-icon': {
                  color: '#d32f2f'
                }
              }}
            >
              {error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Email Address"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              error={!!formErrors.email}
              helperText={formErrors.email}
              margin="normal"
              required
              autoComplete="email"
              autoFocus
              sx={{
                mb: 2,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f0 100%)',
                  '& fieldset': {
                    borderColor: 'rgba(137, 207, 240, 0.15)',
                    transition: 'all 0.3s ease',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(137, 207, 240, 0.3)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4A9FD5',
                    borderWidth: 2,
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#666',
                  '&.Mui-focused': {
                    color: '#4A9FD5',
                  },
                },
                '& .MuiFormHelperText-root.Mui-error': {
                  color: '#d32f2f',
                  fontSize: '0.85rem',
                }
              }}
            />

            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              error={!!formErrors.password}
              helperText={formErrors.password}
              margin="normal"
              required
              autoComplete="current-password"
              sx={{
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  borderRadius: 3,
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f0 100%)',
                  '& fieldset': {
                    borderColor: 'rgba(137, 207, 240, 0.15)',
                    transition: 'all 0.3s ease',
                  },
                  '&:hover fieldset': {
                    borderColor: 'rgba(137, 207, 240, 0.3)',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#4A9FD5',
                    borderWidth: 2,
                  },
                },
                '& .MuiInputLabel-root': {
                  color: '#666',
                  '&.Mui-focused': {
                    color: '#4A9FD5',
                  },
                },
                '& .MuiFormHelperText-root.Mui-error': {
                  color: '#d32f2f',
                  fontSize: '0.85rem',
                }
              }}
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              size="large"
              disabled={loading}
              sx={{
                mt: 1,
                mb: 3,
                py: 1.5,
                borderRadius: 3,
                fontSize: '1rem',
                fontWeight: 600,
                background: 'linear-gradient(135deg, #4A9FD5 0%, #89CFF0 100%)',
                boxShadow: '0 6px 24px rgba(74, 159, 213, 0.4)',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: '0 10px 32px rgba(74, 159, 213, 0.5)',
                  background: 'linear-gradient(135deg, #4A9FD5 0%, #89CFF0 100%)',
                },
                '&:disabled': {
                  background: 'linear-gradient(135deg, rgba(74, 159, 213, 0.4) 0%, rgba(137, 207, 240, 0.4) 100%)',
                  color: 'rgba(255,255,255,0.7)',
                  transform: 'none',
                  boxShadow: '0 3px 12px rgba(74, 159, 213, 0.2)',
                }
              }}
            >
              {loading ? 'Signing In...' : 'Sign In'}
            </Button>

            <Paper
              elevation={0}
              sx={{
                p: 2.5,
                background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f0 100%)',
                borderRadius: 3,
                border: '1px solid rgba(137, 207, 240, 0.08)',
                textAlign: 'center',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '2px',
                  background: 'linear-gradient(90deg, rgba(139, 69, 19, 0.3), rgba(160, 82, 45, 0.3), rgba(74, 159, 213, 0.3))',
                  borderRadius: '12px 12px 0 0',
                }
              }}
            >
              <PersonIcon sx={{ fontSize: 20, color: '#8b4513', mb: 1 }} />
              <Typography 
                variant="body2"
                sx={{ 
                  color: '#666',
                  fontSize: '0.9rem',
                  lineHeight: 1.5
                }}
              >
                Don't have an account?{' '}
                <Link 
                  component={RouterLink} 
                  to="/register" 
                  sx={{
                    color: '#8b4513',
                    fontWeight: 600,
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: '#4A9FD5',
                      textDecoration: 'underline',
                    }
                  }}
                >
                  Sign up here
                </Link>
              </Typography>
            </Paper>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login