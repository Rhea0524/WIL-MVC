import React, { useState, useEffect } from 'react';
import { 
  Container, 
  Typography, 
  TextField, 
  Button, 
  Box, 
  Paper,
  Alert,
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';

const ContactUs = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [sectionVisible, setSectionVisible] = useState([false, false]);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    description: ''
  });

  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    
    // Animate sections
    const sectionTimers = [
      setTimeout(() => setSectionVisible(prev => [true, prev[1]]), 400),
      setTimeout(() => setSectionVisible(prev => [prev[0], true]), 600),
    ];

    return () => {
      clearTimeout(timer);
      sectionTimers.forEach(clearTimeout);
    };
  }, []);

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
    if (error) setError('');
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

  const contactInfo = [
    {
      icon: <LocationOnIcon sx={{ fontSize: 28 }} />,
      title: "Our Location",
      content: "Durban, KwaZulu-Natal, South Africa"
    },
    {
      icon: <PhoneIcon sx={{ fontSize: 28 }} />,
      title: "Phone",
      content: "Contact us for direct communication"
    },
    {
      icon: <EmailIcon sx={{ fontSize: 28 }} />,
      title: "Email",
      content: "Get in touch via email below"
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '50vh',
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
                width: 80,
                height: 80,
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
              <ContactMailIcon sx={{ fontSize: 40, color: '#d4d4aa' }} />
            </Box>

            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2.5rem', sm: '3rem', md: '3.5rem' },
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
              Get In Touch
            </Typography>

            <Typography
              variant="h4"
              component="h2"
              sx={{
                fontSize: { xs: '1.1rem', sm: '1.3rem', md: '1.5rem' },
                fontWeight: 300,
                color: '#d4d4aa',
                mb: 2,
                maxWidth: '700px',
                mx: 'auto',
                lineHeight: 1.4,
              }}
            >
              We'd Love to Hear From You
            </Typography>

            <Typography
              variant="h6"
              sx={{
                color: 'rgba(255,255,255,0.9)',
                maxWidth: '500px',
                mx: 'auto',
                fontWeight: 400,
                fontSize: { xs: '0.95rem', md: '1.1rem' },
                lineHeight: 1.5,
              }}
            >
              Have questions about our surveying services? Ready to start your project? Let's connect.
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Contact Info Section */}
      <Box
        sx={{
          py: { xs: 4, md: 5 },
          background: 'linear-gradient(180deg, rgba(245,245,220,0.98) 0%, rgba(250,240,230,0.98) 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              opacity: sectionVisible[0] ? 1 : 0,
              transform: sectionVisible[0] ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <Grid container spacing={4}>
              {contactInfo.map((info, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      height: '100%',
                      background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f0 100%)',
                      borderRadius: 3,
                      border: '1px solid rgba(44, 85, 48, 0.08)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      position: 'relative',
                      '&::before': {
                        content: '""',
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        right: 0,
                        height: '3px',
                        background: 'linear-gradient(90deg, #8b4513, #a0522d, #2c5530)',
                        borderRadius: '12px 12px 0 0',
                        transform: 'scaleX(0)',
                        transformOrigin: 'left',
                        transition: 'transform 0.5s ease-out',
                      },
                      '&:hover': {
                        transform: 'translateY(-5px)',
                        boxShadow: '0 15px 35px rgba(44, 85, 48, 0.12)',
                        '&::before': {
                          transform: 'scaleX(1)',
                        },
                      }
                    }}
                  >
                    <Box
                      sx={{
                        width: 60,
                        height: 60,
                        mx: 'auto',
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, rgba(44, 85, 48, 0.1) 0%, rgba(212, 212, 170, 0.1) 100%)',
                        color: '#2c5530',
                      }}
                    >
                      {info.icon}
                    </Box>
                    
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{
                        fontWeight: 600,
                        color: '#2c5530',
                        mb: 1.5,
                        fontSize: { xs: '1.1rem', md: '1.2rem' }
                      }}
                    >
                      {info.title}
                    </Typography>
                    
                    <Typography
                      variant="body2"
                      sx={{
                        color: '#666',
                        lineHeight: 1.5,
                        fontSize: '0.9rem'
                      }}
                    >
                      {info.content}
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>

      {/* Contact Form Section */}
      <Box
        sx={{
          py: { xs: 5, md: 6 },
          background: 'linear-gradient(180deg, rgba(250,240,230,0.98) 0%, rgba(245,245,220,0.98) 100%)',
        }}
      >
        <Container maxWidth="md">
          <Box
            sx={{
              opacity: sectionVisible[1] ? 1 : 0,
              transform: sectionVisible[1] ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <Paper 
              elevation={0}
              sx={{ 
                p: { xs: 3, sm: 4 },
                background: 'linear-gradient(145deg, rgba(255,255,255,0.98) 0%, rgba(248,248,240,0.98) 100%)',
                borderRadius: 4,
                border: '1px solid rgba(44, 85, 48, 0.08)',
                position: 'relative',
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '4px',
                  background: 'linear-gradient(90deg, #8b4513, #a0522d, #2c5530)',
                  borderRadius: '16px 16px 0 0',
                }
              }}
            >
              <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Typography
                  variant="h3"
                  component="h2"
                  sx={{
                    fontSize: { xs: '1.8rem', md: '2.2rem' },
                    fontWeight: 700,
                    color: '#2c5530',
                    mb: 2,
                    letterSpacing: '-0.01em'
                  }}
                >
                  Send Us a Message
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: '#666',
                    maxWidth: '400px',
                    mx: 'auto',
                    lineHeight: 1.5,
                    fontSize: { xs: '0.95rem', md: '1rem' }
                  }}
                >
                  Fill out the form below and we'll get back to you soon
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
                  label="Your Name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  error={!!formErrors.name}
                  helperText={formErrors.name}
                  required
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f0 100%)',
                      '& fieldset': {
                        borderColor: 'rgba(44, 85, 48, 0.15)',
                        transition: 'all 0.3s ease',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(44, 85, 48, 0.3)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#2c5530',
                        borderWidth: 2,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#666',
                      '&.Mui-focused': {
                        color: '#2c5530',
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
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                  required
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f0 100%)',
                      '& fieldset': {
                        borderColor: 'rgba(44, 85, 48, 0.15)',
                        transition: 'all 0.3s ease',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(44, 85, 48, 0.3)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#2c5530',
                        borderWidth: 2,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#666',
                      '&.Mui-focused': {
                        color: '#2c5530',
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
                  label="Message"
                  name="description"
                  multiline
                  rows={6}
                  value={formData.description}
                  onChange={handleChange}
                  error={!!formErrors.description}
                  helperText={formErrors.description}
                  required
                  sx={{
                    mb: 4,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 3,
                      background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f0 100%)',
                      '& fieldset': {
                        borderColor: 'rgba(44, 85, 48, 0.15)',
                        transition: 'all 0.3s ease',
                      },
                      '&:hover fieldset': {
                        borderColor: 'rgba(44, 85, 48, 0.3)',
                      },
                      '&.Mui-focused fieldset': {
                        borderColor: '#2c5530',
                        borderWidth: 2,
                      },
                    },
                    '& .MuiInputLabel-root': {
                      color: '#666',
                      '&.Mui-focused': {
                        color: '#2c5530',
                      },
                    },
                    '& .MuiFormHelperText-root.Mui-error': {
                      color: '#d32f2f',
                      fontSize: '0.85rem',
                    }
                  }}
                />

                <Box sx={{ textAlign: 'center' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    disabled={loading}
                    startIcon={<SendIcon />}
                    sx={{
                      py: 1.5,
                      px: 4,
                      borderRadius: 3,
                      fontSize: '1rem',
                      fontWeight: 600,
                      minWidth: 200,
                      background: 'linear-gradient(135deg, #2c5530 0%, #4a7c59 100%)',
                      boxShadow: '0 6px 24px rgba(44, 85, 48, 0.4)',
                      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 10px 32px rgba(44, 85, 48, 0.5)',
                        background: 'linear-gradient(135deg, #2c5530 0%, #4a7c59 100%)',
                      },
                      '&:disabled': {
                        background: 'linear-gradient(135deg, rgba(44, 85, 48, 0.4) 0%, rgba(74, 124, 89, 0.4) 100%)',
                        color: 'rgba(255,255,255,0.7)',
                        transform: 'none',
                        boxShadow: '0 3px 12px rgba(44, 85, 48, 0.2)',
                      }
                    }}
                  >
                    {loading ? 'Sending...' : 'Send Message'}
                  </Button>
                </Box>
              </Box>
            </Paper>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default ContactUs;