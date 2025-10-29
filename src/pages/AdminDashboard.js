// src/pages/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Alert,
  Card,
  CardContent,
  Grid,
  Tabs,
  Tab,
  Chip,
  IconButton,
  useMediaQuery,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { firebaseService } from '../services/FirebaseService';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmailIcon from '@mui/icons-material/Email';
import VisibilityIcon from '@mui/icons-material/Visibility';
import MarkEmailReadIcon from '@mui/icons-material/MarkEmailRead';
import DeleteIcon from '@mui/icons-material/Delete';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [projects, setProjects] = useState([]);
  const [contactMessages, setContactMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [messageDetailsOpen, setMessageDetailsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);
  const [tabValue, setTabValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    const statsTimer = setTimeout(() => setStatsVisible(true), 500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(statsTimer);
    };
  }, []);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (!isAdmin()) {
      navigate('/');
    }
  }, [user, isAdmin, navigate]);

  useEffect(() => {
    if (user && isAdmin()) {
      fetchData();
    }
  }, [user, isAdmin]);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const projectsData = await firebaseService.getProjects();
      projectsData.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
      setProjects(projectsData);
      
      const messagesData = await firebaseService.getContactForms();
      messagesData.sort((a, b) => b.submittedAt - a.submittedAt);
      setContactMessages(messagesData);
      
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const handleViewProjectDetails = (project) => {
    setSelectedProject(project);
    setDetailsOpen(true);
  };

  const handleCloseProjectDetails = () => {
    setDetailsOpen(false);
    setSelectedProject(null);
  };

  const handleViewMessage = (message) => {
    setSelectedMessage(message);
    setMessageDetailsOpen(true);
  };

  const handleCloseMessageDetails = () => {
    setMessageDetailsOpen(false);
    setSelectedMessage(null);
  };

  const handleMarkAsRead = async (messageId) => {
    try {
      await firebaseService.updateContactFormStatus(messageId, 'read');
      setContactMessages(prev =>
        prev.map(msg =>
          msg.id === messageId ? { ...msg, status: 'read' } : msg
        )
      );
    } catch (err) {
      console.error('Error marking message as read:', err);
      setError('Failed to update message status.');
    }
  };

  const handleDeleteMessage = async (messageId) => {
    if (!window.confirm('Are you sure you want to delete this message?')) {
      return;
    }

    try {
      await firebaseService.deleteContactForm(messageId);
      setContactMessages(prev => prev.filter(msg => msg.id !== messageId));
      if (selectedMessage?.id === messageId) {
        handleCloseMessageDetails();
      }
    } catch (err) {
      console.error('Error deleting message:', err);
      setError('Failed to delete message.');
    }
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString('en-ZA', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUnreadCount = () => {
    return contactMessages.filter(msg => msg.status === 'unread').length;
  };

  if (!user || !isAdmin()) {
    return (
      <Container maxWidth="sm" sx={{ mt: 8, mb: 4 }}>
        <Paper 
          elevation={0}
          sx={{ 
            p: 4, 
            textAlign: 'center',
            background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f0 100%)',
            borderRadius: 3,
            border: '1px solid rgba(137, 207, 240, 0.08)',
          }}
        >
          <Typography 
            variant="h5" 
            gutterBottom
            sx={{ 
              color: '#4A9FD5',
              fontWeight: 700,
              mb: 2
            }}
          >
            Access Denied
          </Typography>
          <Typography 
            variant="body1" 
            sx={{ 
              color: '#666',
              mb: 3
            }}
          >
            You don't have permission to access this page.
          </Typography>
          <Button
            variant="contained"
            onClick={() => navigate('/')}
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
            Go Home
          </Button>
        </Paper>
      </Container>
    );
  }

  const stats = [
    {
      icon: <FolderIcon sx={{ fontSize: 32 }} />,
      title: "Total Projects",
      value: projects.length,
      gradient: 'linear-gradient(135deg, rgba(137, 207, 240, 0.15) 0%, rgba(167, 216, 240, 0.15) 100%)',
      color: '#4A9FD5'
    },
    {
      icon: <EmailIcon sx={{ fontSize: 32 }} />,
      title: "Contact Messages",
      value: contactMessages.length,
      badge: getUnreadCount() > 0 ? getUnreadCount() : null,
      gradient: 'linear-gradient(135deg, rgba(139, 69, 19, 0.15) 0%, rgba(137, 207, 240, 0.15) 100%)',
      color: '#8b4513'
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 32 }} />,
      title: "Recent Projects",
      value: projects.filter(p => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return new Date(p.timestamp) > weekAgo;
      }).length,
      gradient: 'linear-gradient(135deg, rgba(74, 159, 213, 0.15) 0%, rgba(137, 207, 240, 0.15) 100%)',
      color: '#5AAFDE'
    }
  ];

  // Mobile Card Component for Projects
  const ProjectCard = ({ project }) => (
    <Card
      elevation={0}
      sx={{
        mb: 2,
        background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f0 100%)',
        borderRadius: 2,
        border: '1px solid rgba(137, 207, 240, 0.08)',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(137, 207, 240, 0.15)',
        }
      }}
    >
      <CardContent>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600, color: '#4A9FD5', mb: 1 }}>
            {project.First_Name} {project.Last_Name}
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
            <strong>Company:</strong> {project.Company_Name}
          </Typography>
          <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
            <strong>Email:</strong> {project.Email_Address}
          </Typography>
          <Typography variant="caption" sx={{ color: '#999' }}>
            {formatDate(project.timestamp)}
          </Typography>
        </Box>
        <Button
          fullWidth
          size="small"
          onClick={() => handleViewProjectDetails(project)}
          startIcon={<VisibilityIcon />}
          sx={{
            background: 'linear-gradient(45deg, #8b4513 30%, #a0522d 90%)',
            color: 'white',
            py: 1,
            borderRadius: 1.5,
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': {
              background: 'linear-gradient(45deg, #a0522d 30%, #8b4513 90%)',
            }
          }}
        >
          View Details
        </Button>
      </CardContent>
    </Card>
  );

  // Mobile Card Component for Messages
  const MessageCard = ({ message }) => (
    <Card
      elevation={0}
      sx={{
        mb: 2,
        background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f0 100%)',
        borderRadius: 2,
        border: '1px solid rgba(137, 207, 240, 0.08)',
        '&:hover': {
          boxShadow: '0 4px 12px rgba(137, 207, 240, 0.15)',
        }
      }}
    >
      <CardContent>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6" sx={{ fontWeight: 600, color: '#4A9FD5', mb: 0.5 }}>
              {message.name}
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', mb: 0.5 }}>
              {message.email}
            </Typography>
            <Typography variant="caption" sx={{ color: '#999' }}>
              {formatDate(message.timestamp || message.submittedAt)}
            </Typography>
          </Box>
          <Chip
            label={message.status === 'unread' ? 'Unread' : 'Read'}
            size="small"
            sx={{
              background: message.status === 'unread'
                ? 'linear-gradient(135deg, #f44336 0%, #e53935 100%)'
                : 'linear-gradient(135deg, #4caf50 0%, #43a047 100%)',
              color: 'white',
              fontWeight: 600,
            }}
          />
        </Box>
        <Typography
          variant="body2"
          sx={{
            color: '#666',
            mb: 2,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {message.message}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Button
            fullWidth
            size="small"
            onClick={() => handleViewMessage(message)}
            startIcon={<VisibilityIcon />}
            sx={{
              background: 'linear-gradient(45deg, #8b4513 30%, #a0522d 90%)',
              color: 'white',
              py: 1,
              borderRadius: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': {
                background: 'linear-gradient(45deg, #a0522d 30%, #8b4513 90%)',
              }
            }}
          >
            View
          </Button>
          {message.status === 'unread' && (
            <IconButton
              size="small"
              onClick={() => handleMarkAsRead(message.id)}
              sx={{ 
                color: 'white',
                background: 'linear-gradient(135deg, #4caf50 0%, #43a047 100%)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #43a047 0%, #388e3c 100%)',
                }
              }}
            >
              <MarkEmailReadIcon />
            </IconButton>
          )}
          <IconButton
            size="small"
            onClick={() => handleDeleteMessage(message.id)}
            sx={{ 
              color: 'white',
              background: 'linear-gradient(135deg, #f44336 0%, #e53935 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #e53935 0%, #d32f2f 100%)',
              }
            }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: { xs: '35vh', md: '45vh' },
          display: 'flex',
          alignItems: 'center',
          background: `
            linear-gradient(
              135deg,
              rgba(137, 207, 240, 0.95) 0%,
              rgba(167, 216, 240, 0.9) 50%,
              rgba(186, 225, 245, 0.85) 100%
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
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <Box
              sx={{
                width: { xs: 48, md: 64 },
                height: { xs: 48, md: 64 },
                mb: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <DashboardIcon sx={{ fontSize: { xs: 24, md: 32 }, color: '#d4d4aa' }} />
            </Box>

            <Typography
              variant="h1"
              component="h1"
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3.5rem' },
                fontWeight: 800,
                mb: 1,
                color: '#ffffff',
                textShadow: '0 2px 20px rgba(0,0,0,0.3), 0 4px 6px rgba(45,95,141,0.4)',
                letterSpacing: '-0.02em',
              }}
            >
              Admin Dashboard
            </Typography>

            <Typography
              variant="h5"
              sx={{
                color: '#ffffff',
                fontWeight: 500,
                fontSize: { xs: '0.9rem', md: '1.2rem' },
                lineHeight: 1.5,
                textShadow: '0 2px 10px rgba(0,0,0,0.25)',
              }}
            >
              Manage projects and customer communications
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box
        sx={{
          py: { xs: 3, md: 5 },
          background: 'linear-gradient(180deg, rgba(245,245,220,0.98) 0%, rgba(250,240,230,0.98) 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Grid 
            container 
            spacing={2}
            sx={{
              opacity: statsVisible ? 1 : 0,
              transform: statsVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            {stats.map((stat, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    height: '100%',
                    background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f0 100%)',
                    borderRadius: 3,
                    border: '1px solid rgba(137, 207, 240, 0.08)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      height: '3px',
                      background: 'linear-gradient(90deg, #8b4513, #a0522d, #4A9FD5)',
                      borderRadius: '12px 12px 0 0',
                      transform: 'scaleX(0)',
                      transformOrigin: 'left',
                      transition: 'transform 0.5s ease-out',
                    },
                    '&:hover': {
                      transform: 'translateY(-5px)',
                      boxShadow: '0 15px 35px rgba(137, 207, 240, 0.12)',
                      '&::before': {
                        transform: 'scaleX(1)',
                      },
                    }
                  }}
                >
                  <CardContent sx={{ p: { xs: 2, md: 3 } }}>
                    <Box
                      sx={{
                        width: { xs: 48, md: 56 },
                        height: { xs: 48, md: 56 },
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        background: stat.gradient,
                        color: stat.color,
                        position: 'relative'
                      }}
                    >
                      {stat.icon}
                      {stat.badge && (
                        <Box
                          sx={{
                            position: 'absolute',
                            top: -4,
                            right: -4,
                            background: 'linear-gradient(135deg, #f44336 0%, #e53935 100%)',
                            color: 'white',
                            borderRadius: '50%',
                            width: 24,
                            height: 24,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.7rem',
                            fontWeight: 700,
                            boxShadow: '0 2px 8px rgba(244, 67, 54, 0.4)'
                          }}
                        >
                          {stat.badge}
                        </Box>
                      )}
                    </Box>

                    <Typography 
                      variant="body2" 
                      sx={{ 
                        color: '#666',
                        mb: 1,
                        fontSize: '0.9rem',
                        fontWeight: 500
                      }}
                    >
                      {stat.title}
                    </Typography>
                    
                    <Typography 
                      variant="h3"
                      sx={{
                        fontWeight: 700,
                        color: stat.color,
                        fontSize: { xs: '1.8rem', md: '2.5rem' }
                      }}
                    >
                      {stat.value}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>

          {error && (
            <Alert 
              severity="error" 
              sx={{ 
                mt: 3,
                borderRadius: 2,
                background: 'linear-gradient(145deg, #fff5f5 0%, #ffe0e0 100%)',
              }}
              onClose={() => setError('')}
            >
              {error}
            </Alert>
          )}

          {/* Tabs */}
          <Box sx={{ mt: 4 }}>
            <Tabs
              value={tabValue}
              onChange={(e, newValue) => setTabValue(newValue)}
              variant={isMobile ? "fullWidth" : "standard"}
              sx={{
                mb: 3,
                '& .MuiTab-root': {
                  fontWeight: 600,
                  textTransform: 'none',
                  fontSize: { xs: '0.85rem', md: '1rem' },
                  minHeight: 48,
                },
                '& .Mui-selected': {
                  color: '#4A9FD5',
                },
                '& .MuiTabs-indicator': {
                  backgroundColor: '#4A9FD5',
                  height: 3,
                }
              }}
            >
              <Tab label={`Projects (${projects.length})`} />
              <Tab 
                label={
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    Messages ({contactMessages.length})
                    {getUnreadCount() > 0 && (
                      <Chip
                        label={getUnreadCount()}
                        size="small"
                        sx={{
                          height: 20,
                          background: 'linear-gradient(135deg, #f44336 0%, #e53935 100%)',
                          color: 'white',
                          fontWeight: 700,
                          fontSize: '0.7rem'
                        }}
                      />
                    )}
                  </Box>
                }
              />
            </Tabs>

            {/* Projects - Mobile Cards or Desktop Table */}
            {tabValue === 0 && (
              <Paper 
                elevation={0}
                sx={{ 
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f0 100%)',
                  borderRadius: 3,
                  border: '1px solid rgba(137, 207, 240, 0.08)',
                  overflow: 'hidden',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, #8b4513, #a0522d, #4A9FD5)',
                    borderRadius: '12px 12px 0 0',
                  }
                }}
              >
                <Box sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography 
                    variant="h5" 
                    sx={{
                      fontWeight: 700,
                      color: '#4A9FD5',
                      mb: 0.5,
                      fontSize: { xs: '1.1rem', md: '1.5rem' }
                    }}
                  >
                    Project Submissions
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#666',
                      fontSize: '0.9rem'
                    }}
                  >
                    All client project submissions in chronological order
                  </Typography>
                </Box>

                {loading ? (
                  <Box sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
                    <Typography sx={{ color: '#666' }}>Loading projects...</Typography>
                  </Box>
                ) : projects.length === 0 ? (
                  <Box sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
                    <Typography sx={{ color: '#666' }}>
                      No projects submitted yet.
                    </Typography>
                  </Box>
                ) : isMobile ? (
                  <Box sx={{ p: 2 }}>
                    {projects.map((project) => (
                      <ProjectCard key={project.id} project={project} />
                    ))}
                  </Box>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow 
                          sx={{
                            background: 'linear-gradient(135deg, rgba(137, 207, 240, 0.05) 0%, rgba(167, 216, 240, 0.05) 100%)',
                          }}
                        >
                          <TableCell sx={{ fontWeight: 600, color: '#4A9FD5' }}>Name</TableCell>
                          <TableCell sx={{ fontWeight: 600, color: '#4A9FD5' }}>Company</TableCell>
                          <TableCell sx={{ fontWeight: 600, color: '#4A9FD5' }}>Email</TableCell>
                          <TableCell sx={{ fontWeight: 600, color: '#4A9FD5' }}>Submitted</TableCell>
                          <TableCell sx={{ fontWeight: 600, color: '#4A9FD5' }}>Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {projects.map((project) => (
                          <TableRow 
                            key={project.id} 
                            hover
                            sx={{
                              '&:hover': {
                                background: 'linear-gradient(135deg, rgba(137, 207, 240, 0.02) 0%, rgba(167, 216, 240, 0.02) 100%)',
                              }
                            }}
                          >
                            <TableCell sx={{ color: '#333' }}>
                              {project.First_Name} {project.Last_Name}
                            </TableCell>
                            <TableCell sx={{ color: '#333' }}>{project.Company_Name}</TableCell>
                            <TableCell sx={{ color: '#666', fontSize: '0.9rem' }}>{project.Email_Address}</TableCell>
                            <TableCell sx={{ color: '#666', fontSize: '0.9rem' }}>
                              {formatDate(project.timestamp)}
                            </TableCell>
                            <TableCell>
                              <Button
                                size="small"
                                onClick={() => handleViewProjectDetails(project)}
                                startIcon={<VisibilityIcon />}
                                sx={{
                                  background: 'linear-gradient(45deg, #8b4513 30%, #a0522d 90%)',
                                  color: 'white',
                                  px: 2,
                                  py: 0.75,
                                  borderRadius: 1.5,
                                  textTransform: 'none',
                                  fontWeight: 600,
                                  fontSize: '0.85rem',
                                  boxShadow: '0 4px 12px rgba(139, 69, 19, 0.2)',
                                  '&:hover': {
                                    background: 'linear-gradient(45deg, #a0522d 30%, #8b4513 90%)',
                                    transform: 'translateY(-1px)',
                                    boxShadow: '0 6px 16px rgba(139, 69, 19, 0.3)',
                                  }
                                }}
                              >
                                View Details
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Paper>
            )}

            {/* Contact Messages - Mobile Cards or Desktop Table */}
            {tabValue === 1 && (
              <Paper 
                elevation={0}
                sx={{ 
                  background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f0 100%)',
                  borderRadius: 3,
                  border: '1px solid rgba(137, 207, 240, 0.08)',
                  overflow: 'hidden',
                  position: 'relative',
                  '&::before': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: '3px',
                    background: 'linear-gradient(90deg, #8b4513, #a0522d, #4A9FD5)',
                    borderRadius: '12px 12px 0 0',
                  }
                }}
              >
                <Box sx={{ p: { xs: 2, md: 3 } }}>
                  <Typography 
                    variant="h5" 
                    sx={{
                      fontWeight: 700,
                      color: '#4A9FD5',
                      mb: 0.5,
                      fontSize: { xs: '1.1rem', md: '1.5rem' }
                    }}
                  >
                    Contact Messages
                  </Typography>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      color: '#666',
                      fontSize: '0.9rem'
                    }}
                  >
                    Customer inquiries and messages
                  </Typography>
                </Box>

                {loading ? (
                  <Box sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
                    <Typography sx={{ color: '#666' }}>Loading messages...</Typography>
                  </Box>
                ) : contactMessages.length === 0 ? (
                  <Box sx={{ p: { xs: 4, md: 6 }, textAlign: 'center' }}>
                    <EmailIcon sx={{ fontSize: 60, color: '#ccc', mb: 2 }} />
                    <Typography sx={{ color: '#666' }}>
                      No messages yet
                    </Typography>
                  </Box>
                ) : isMobile ? (
                  <Box sx={{ p: 2 }}>
                    {contactMessages.map((message) => (
                      <MessageCard key={message.id} message={message} />
                    ))}
                  </Box>
                ) : (
                  <TableContainer>
                    <Table>
                      <TableHead>
                        <TableRow 
                          sx={{
                            background: 'linear-gradient(135deg, rgba(137, 207, 240, 0.05) 0%, rgba(167, 216, 240, 0.05) 100%)',
                          }}
                        >
                          <TableCell sx={{ fontWeight: 600, color: '#4A9FD5' }}>Status</TableCell>
                          <TableCell sx={{ fontWeight: 600, color: '#4A9FD5' }}>Name</TableCell>
                          <TableCell sx={{ fontWeight: 600, color: '#4A9FD5' }}>Email</TableCell>
                          <TableCell sx={{ fontWeight: 600, color: '#4A9FD5' }}>Message Preview</TableCell>
                          <TableCell sx={{ fontWeight: 600, color: '#4A9FD5' }}>Date</TableCell>
                          <TableCell sx={{ fontWeight: 600, color: '#4A9FD5' }} align="center">Actions</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {contactMessages.map((message) => (
                          <TableRow
                            key={message.id}
                            sx={{
                              '&:hover': { background: 'rgba(137, 207, 240, 0.02)' },
                              transition: 'background 0.2s ease',
                            }}
                          >
                            <TableCell>
                              <Chip
                                label={message.status === 'unread' ? 'Unread' : 'Read'}
                                size="small"
                                sx={{
                                  background: message.status === 'unread'
                                    ? 'linear-gradient(135deg, #f44336 0%, #e53935 100%)'
                                    : 'linear-gradient(135deg, #4caf50 0%, #43a047 100%)',
                                  color: 'white',
                                  fontWeight: 600,
                                }}
                              />
                            </TableCell>
                            <TableCell sx={{ fontWeight: 500 }}>{message.name}</TableCell>
                            <TableCell sx={{ fontSize: '0.9rem' }}>{message.email}</TableCell>
                            <TableCell>
                              <Typography
                                variant="body2"
                                sx={{
                                  maxWidth: 250,
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                  whiteSpace: 'nowrap',
                                  color: '#666'
                                }}
                              >
                                {message.message}
                              </Typography>
                            </TableCell>
                            <TableCell sx={{ fontSize: '0.9rem' }}>
                              {formatDate(message.timestamp || message.submittedAt)}
                            </TableCell>
                            <TableCell align="center">
                              <IconButton
                                size="small"
                                onClick={() => handleViewMessage(message)}
                                sx={{ color: '#4A9FD5', mr: 0.5 }}
                              >
                                <VisibilityIcon />
                              </IconButton>
                              {message.status === 'unread' && (
                                <IconButton
                                  size="small"
                                  onClick={() => handleMarkAsRead(message.id)}
                                  sx={{ color: '#4caf50', mr: 0.5 }}
                                >
                                  <MarkEmailReadIcon />
                                </IconButton>
                              )}
                              <IconButton
                                size="small"
                                onClick={() => handleDeleteMessage(message.id)}
                                sx={{ color: '#f44336' }}
                              >
                                <DeleteIcon />
                              </IconButton>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </TableContainer>
                )}
              </Paper>
            )}
          </Box>
        </Container>
      </Box>

      {/* Project Details Dialog */}
      <Dialog 
        open={detailsOpen} 
        onClose={handleCloseProjectDetails}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : 3,
            background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f0 100%)',
          }
        }}
      >
        <DialogTitle
          sx={{
            borderBottom: '1px solid rgba(137, 207, 240, 0.1)',
            background: 'linear-gradient(135deg, rgba(137, 207, 240, 0.05) 0%, rgba(167, 216, 240, 0.05) 100%)',
            fontWeight: 700,
            color: '#4A9FD5',
            fontSize: { xs: '1.1rem', md: '1.3rem' }
          }}
        >
          Project Details
        </DialogTitle>
        <DialogContent sx={{ mt: 2 }}>
          {selectedProject && (
            <Box>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      background: 'rgba(137, 207, 240, 0.03)',
                      borderRadius: 2,
                      border: '1px solid rgba(137, 207, 240, 0.08)',
                    }}
                  >
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        color: '#4A9FD5',
                        fontWeight: 700,
                        mb: 2,
                        fontSize: '1rem'
                      }}
                    >
                      Personal Information
                    </Typography>
                    <Box sx={{ '& > *': { mb: 1.5 } }}>
                      <Typography sx={{ color: '#333', fontSize: '0.9rem' }}>
                        <strong style={{ color: '#666' }}>Name:</strong> {selectedProject.First_Name} {selectedProject.Last_Name}
                      </Typography>
                      <Typography sx={{ color: '#333', fontSize: '0.9rem' }}>
                        <strong style={{ color: '#666' }}>Email:</strong> {selectedProject.Email_Address}
                      </Typography>
                      <Typography sx={{ color: '#333', fontSize: '0.9rem' }}>
                        <strong style={{ color: '#666' }}>Mobile:</strong> {selectedProject.Mobile_Number}
                      </Typography>
                      {selectedProject.Phone_Number && (
                        <Typography sx={{ color: '#333', fontSize: '0.9rem' }}>
                          <strong style={{ color: '#666' }}>Phone:</strong> {selectedProject.Phone_Number}
                        </Typography>
                      )}
                      <Typography sx={{ color: '#333', fontSize: '0.9rem' }}>
                        <strong style={{ color: '#666' }}>Address:</strong> {selectedProject.Physical_Address}
                      </Typography>
                      {selectedProject.PO_Box && (
                        <Typography sx={{ color: '#333', fontSize: '0.9rem' }}>
                          <strong style={{ color: '#666' }}>PO Box:</strong> {selectedProject.PO_Box}
                        </Typography>
                      )}
                      {selectedProject.Postal_Code && (
                        <Typography sx={{ color: '#333', fontSize: '0.9rem' }}>
                          <strong style={{ color: '#666' }}>Postal Code:</strong> {selectedProject.Postal_Code}
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                </Grid>
                
                <Grid item xs={12} sm={6}>
                  <Paper
                    elevation={0}
                    sx={{
                      p: 2.5,
                      background: 'rgba(139, 69, 19, 0.03)',
                      borderRadius: 2,
                      border: '1px solid rgba(139, 69, 19, 0.08)',
                    }}
                  >
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        color: '#8b4513',
                        fontWeight: 700,
                        mb: 2,
                        fontSize: '1rem'
                      }}
                    >
                      Company Information
                    </Typography>
                    <Box sx={{ '& > *': { mb: 1.5 } }}>
                      <Typography sx={{ color: '#333', fontSize: '0.9rem' }}>
                        <strong style={{ color: '#666' }}>Company Name:</strong> {selectedProject.Company_Name}
                      </Typography>
                      {selectedProject.Company_Type && (
                        <Typography sx={{ color: '#333', fontSize: '0.9rem' }}>
                          <strong style={{ color: '#666' }}>Company Type:</strong> {selectedProject.Company_Type}
                        </Typography>
                      )}
                      {selectedProject.VAT_Number && (
                        <Typography sx={{ color: '#333', fontSize: '0.9rem' }}>
                          <strong style={{ color: '#666' }}>VAT Number:</strong> {selectedProject.VAT_Number}
                        </Typography>
                      )}
                      {selectedProject.Company_Registration_Number && (
                        <Typography sx={{ color: '#333', fontSize: '0.9rem' }}>
                          <strong style={{ color: '#666' }}>Registration Number:</strong> {selectedProject.Company_Registration_Number}
                        </Typography>
                      )}
                    </Box>

                    <Box sx={{ mt: 3, pt: 2, borderTop: '1px solid rgba(139, 69, 19, 0.1)' }}>
                      <Typography 
                        variant="subtitle2" 
                        sx={{ 
                          color: '#8b4513',
                          fontWeight: 700,
                          mb: 1.5,
                          fontSize: '1rem'
                        }}
                      >
                        Submission Details
                      </Typography>
                      <Typography sx={{ color: '#333', fontSize: '0.9rem', mb: 1 }}>
                        <strong style={{ color: '#666' }}>Submitted:</strong> {formatDate(selectedProject.timestamp)}
                      </Typography>
                      {selectedProject.userEmail && (
                        <Typography sx={{ color: '#333', fontSize: '0.9rem' }}>
                          <strong style={{ color: '#666' }}>User Account:</strong> {selectedProject.userEmail}
                        </Typography>
                      )}
                    </Box>
                  </Paper>
                </Grid>
              </Grid>
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 2.5, borderTop: '1px solid rgba(137, 207, 240, 0.1)' }}>
          <Button 
            onClick={handleCloseProjectDetails}
            fullWidth={isMobile}
            sx={{
              background: 'linear-gradient(45deg, #8b4513 30%, #a0522d 90%)',
              color: 'white',
              px: 3,
              py: 1,
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              boxShadow: '0 4px 12px rgba(139, 69, 19, 0.2)',
              '&:hover': {
                background: 'linear-gradient(45deg, #a0522d 30%, #8b4513 90%)',
                transform: 'translateY(-1px)',
                boxShadow: '0 6px 16px rgba(139, 69, 19, 0.3)',
              }
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Message Details Dialog */}
      <Dialog
        open={messageDetailsOpen}
        onClose={handleCloseMessageDetails}
        maxWidth="md"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : 3,
            background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f0 100%)',
          }
        }}
      >
        {selectedMessage && (
          <>
            <DialogTitle
              sx={{
                background: 'linear-gradient(135deg, #4A9FD5 0%, #89CFF0 100%)',
                color: 'white',
                fontWeight: 700,
                fontSize: { xs: '1.1rem', md: '1.25rem' }
              }}
            >
              Message Details
            </DialogTitle>
            <DialogContent sx={{ mt: 3 }}>
              <Box sx={{ mb: 3 }}>
                <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 0.5 }}>
                  From
                </Typography>
                <Typography variant="h6" sx={{ fontWeight: 600, color: '#4A9FD5' }}>
                  {selectedMessage.name}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 0.5 }}>
                  Email
                </Typography>
                <Typography variant="body1" sx={{ color: '#333', wordBreak: 'break-word' }}>
                  {selectedMessage.email}
                </Typography>
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 0.5 }}>
                  Date Received
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  {formatDate(selectedMessage.timestamp || selectedMessage.submittedAt)}
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Typography variant="caption" sx={{ color: '#666', display: 'block', mb: 0.5 }}>
                  Message
                </Typography>
                <Paper
                  elevation={0}
                  sx={{
                    p: 2,
                    background: 'rgba(137, 207, 240, 0.02)',
                    border: '1px solid rgba(137, 207, 240, 0.1)',
                    borderRadius: 2,
                  }}
                >
                  <Typography
                    variant="body1"
                    sx={{
                      whiteSpace: 'pre-wrap',
                      color: '#333',
                      lineHeight: 1.6,
                      wordBreak: 'break-word'
                    }}
                  >
                    {selectedMessage.message}
                  </Typography>
                </Paper>
              </Box>

              <Box>
                <Chip
                  label={selectedMessage.status === 'unread' ? 'Unread' : 'Read'}
                  sx={{
                    background: selectedMessage.status === 'unread'
                      ? 'linear-gradient(135deg, #f44336 0%, #e53935 100%)'
                      : 'linear-gradient(135deg, #4caf50 0%, #43a047 100%)',
                    color: 'white',
                    fontWeight: 600,
                  }}
                />
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2, gap: 1, flexDirection: isMobile ? 'column' : 'row' }}>
              {selectedMessage.status === 'unread' && (
                <Button
                  fullWidth={isMobile}
                  onClick={() => {
                    handleMarkAsRead(selectedMessage.id);
                    handleCloseMessageDetails();
                  }}
                  startIcon={<MarkEmailReadIcon />}
                  sx={{
                    background: 'linear-gradient(135deg, #4caf50 0%, #43a047 100%)',
                    color: 'white',
                    textTransform: 'none',
                    fontWeight: 600,
                    '&:hover': {
                      background: 'linear-gradient(135deg, #43a047 0%, #388e3c 100%)',
                    }
                  }}
                >
                  Mark as Read
                </Button>
              )}
              <Button
                fullWidth={isMobile}
                onClick={() => {
                  handleDeleteMessage(selectedMessage.id);
                }}
                startIcon={<DeleteIcon />}
                sx={{
                  background: 'linear-gradient(135deg, #f44336 0%, #e53935 100%)',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    background: 'linear-gradient(135deg, #e53935 0%, #d32f2f 100%)',
                  }
                }}
              >
                Delete
              </Button>
              <Button
                fullWidth={isMobile}
                onClick={handleCloseMessageDetails}
                variant="outlined"
                sx={{
                  borderColor: '#4A9FD5',
                  color: '#4A9FD5',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    borderColor: '#4A9FD5',
                    background: 'rgba(137, 207, 240, 0.05)',
                  }
                }}
              >
                Close
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
};

export default AdminDashboard;