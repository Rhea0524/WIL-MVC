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
  Grid
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { database } from '../config/firebase';
import { ref, get } from 'firebase/database';
import DashboardIcon from '@mui/icons-material/Dashboard';
import FolderIcon from '@mui/icons-material/Folder';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import BusinessIcon from '@mui/icons-material/Business';
import VisibilityIcon from '@mui/icons-material/Visibility';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAdmin } = useAuth();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedProject, setSelectedProject] = useState(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [statsVisible, setStatsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100);
    const statsTimer = setTimeout(() => setStatsVisible(true), 500);
    
    return () => {
      clearTimeout(timer);
      clearTimeout(statsTimer);
    };
  }, []);

  // Redirect if not admin
  useEffect(() => {
    if (!user) {
      navigate('/login');
    } else if (!isAdmin()) {
      navigate('/');
    }
  }, [user, isAdmin, navigate]);

  useEffect(() => {
    if (user && isAdmin()) {
      fetchProjects();
    }
  }, [user, isAdmin]);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      const projectsRef = ref(database, 'clientInfo');
      const snapshot = await get(projectsRef);
      
      if (snapshot.exists()) {
        const projectsData = snapshot.val();
        const projectsList = Object.entries(projectsData).map(([id, data]) => ({
          id,
          ...data
        }));
        
        projectsList.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        setProjects(projectsList);
      } else {
        setProjects([]);
      }
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects');
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (project) => {
    setSelectedProject(project);
    setDetailsOpen(true);
  };

  const handleCloseDetails = () => {
    setDetailsOpen(false);
    setSelectedProject(null);
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    return new Date(timestamp).toLocaleString();
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
            border: '1px solid rgba(44, 85, 48, 0.08)',
          }}
        >
          <Typography 
            variant="h5" 
            gutterBottom
            sx={{ 
              color: '#2c5530',
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
      gradient: 'linear-gradient(135deg, rgba(44, 85, 48, 0.15) 0%, rgba(212, 212, 170, 0.15) 100%)',
      color: '#2c5530'
    },
    {
      icon: <TrendingUpIcon sx={{ fontSize: 32 }} />,
      title: "Recent Projects (This Week)",
      value: projects.filter(p => {
        const weekAgo = new Date();
        weekAgo.setDate(weekAgo.getDate() - 7);
        return new Date(p.timestamp) > weekAgo;
      }).length,
      gradient: 'linear-gradient(135deg, rgba(139, 69, 19, 0.15) 0%, rgba(44, 85, 48, 0.15) 100%)',
      color: '#8b4513'
    },
    {
      icon: <BusinessIcon sx={{ fontSize: 32 }} />,
      title: "Unique Companies",
      value: new Set(projects.map(p => p.Company_Name)).size,
      gradient: 'linear-gradient(135deg, rgba(74, 124, 89, 0.15) 0%, rgba(107, 142, 107, 0.15) 100%)',
      color: '#4a7c59'
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          position: 'relative',
          minHeight: '45vh',
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
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              opacity: isVisible ? 1 : 0,
              transition: 'all 1s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <Box
              sx={{
                width: 64,
                height: 64,
                mb: 3,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <DashboardIcon sx={{ fontSize: 32, color: '#d4d4aa' }} />
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
              Admin Dashboard
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
              Manage and monitor project submissions
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* Stats Section */}
      <Box
        sx={{
          py: { xs: 4, md: 5 },
          background: 'linear-gradient(180deg, rgba(245,245,220,0.98) 0%, rgba(250,240,230,0.98) 100%)',
        }}
      >
        <Container maxWidth="lg">
          <Grid 
            container 
            spacing={3}
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
                    border: '1px solid rgba(44, 85, 48, 0.08)',
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
                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        width: 56,
                        height: 56,
                        mb: 2,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: '50%',
                        background: stat.gradient,
                        color: stat.color,
                      }}
                    >
                      {stat.icon}
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
                        fontSize: { xs: '2rem', md: '2.5rem' }
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
            >
              {error}
            </Alert>
          )}

          {/* Projects Table */}
          <Paper 
            elevation={0}
            sx={{ 
              mt: 4,
              background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f0 100%)',
              borderRadius: 3,
              border: '1px solid rgba(44, 85, 48, 0.08)',
              overflow: 'hidden',
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
              }
            }}
          >
            <Box sx={{ p: 3 }}>
              <Typography 
                variant="h5" 
                sx={{
                  fontWeight: 700,
                  color: '#2c5530',
                  mb: 0.5,
                  fontSize: { xs: '1.3rem', md: '1.5rem' }
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
              <Box sx={{ p: 6, textAlign: 'center' }}>
                <Typography sx={{ color: '#666' }}>Loading projects...</Typography>
              </Box>
            ) : projects.length === 0 ? (
              <Box sx={{ p: 6, textAlign: 'center' }}>
                <Typography sx={{ color: '#666' }}>
                  No projects submitted yet.
                </Typography>
              </Box>
            ) : (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow 
                      sx={{
                        background: 'linear-gradient(135deg, rgba(44, 85, 48, 0.05) 0%, rgba(212, 212, 170, 0.05) 100%)',
                      }}
                    >
                      <TableCell sx={{ fontWeight: 600, color: '#2c5530' }}>Name</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#2c5530' }}>Company</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#2c5530' }}>Email</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#2c5530' }}>Submitted</TableCell>
                      <TableCell sx={{ fontWeight: 600, color: '#2c5530' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {projects.map((project) => (
                      <TableRow 
                        key={project.id} 
                        hover
                        sx={{
                          '&:hover': {
                            background: 'linear-gradient(135deg, rgba(44, 85, 48, 0.02) 0%, rgba(212, 212, 170, 0.02) 100%)',
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
                            onClick={() => handleViewDetails(project)}
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
        </Container>
      </Box>

      {/* Project Details Dialog */}
      <Dialog 
        open={detailsOpen} 
        onClose={handleCloseDetails}
        maxWidth="md"
        fullWidth
        PaperProps={{
          sx: {
            borderRadius: 3,
            background: 'linear-gradient(145deg, #ffffff 0%, #f8f8f0 100%)',
          }
        }}
      >
        <DialogTitle
          sx={{
            borderBottom: '1px solid rgba(44, 85, 48, 0.1)',
            background: 'linear-gradient(135deg, rgba(44, 85, 48, 0.05) 0%, rgba(212, 212, 170, 0.05) 100%)',
            fontWeight: 700,
            color: '#2c5530',
            fontSize: '1.3rem'
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
                      background: 'rgba(44, 85, 48, 0.03)',
                      borderRadius: 2,
                      border: '1px solid rgba(44, 85, 48, 0.08)',
                    }}
                  >
                    <Typography 
                      variant="subtitle2" 
                      sx={{ 
                        color: '#2c5530',
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
        <DialogActions sx={{ p: 2.5, borderTop: '1px solid rgba(44, 85, 48, 0.1)' }}>
          <Button 
            onClick={handleCloseDetails}
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
    </Box>
  );
};

export default AdminDashboard;