import React from 'react';
import { 
  Box, 
  Button, 
  Typography, 
  Container, 
  Paper, 
  Divider,
  AppBar,
  Toolbar,
  IconButton
} from '@mui/material';
import { 
  DirectionsBike as BikeIcon,
  AdminPanelSettings as AdminIcon,
  Person as UserIcon,
  Menu as MenuIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

export default function HomePage() {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {/* App Bar */}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <BikeIcon sx={{ mr: 1 }} /> BikeKade.lk
          </Typography>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'center', 
          alignItems: 'center',
          py: 4
        }}
      >
        {/* Hero Section */}
        <Paper 
          elevation={3} 
          sx={{ 
            p: 4, 
            mb: 4, 
            textAlign: 'center',
            backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("https://via.placeholder.com/1200x400?text=Motorcycle+Background")', 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            width: '100%',
            maxWidth: 800
          }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            sx={{ 
              fontWeight: 'bold',
              mb: 2,
              color: 'primary.main'
            }}
          >
            Welcome to BikeKade.lk
          </Typography>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Your one-stop shop for motorcycle accessories and spare parts
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body1" sx={{ mb: 3 }}>
            Find the perfect parts for your ride or manage your product inventory.
          </Typography>
          
          {/* Dashboard Navigation Buttons */}
          <Box 
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              gap: 4,
              flexWrap: 'wrap' 
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<UserIcon />}
              onClick={() => navigate('/user')}
              sx={{ 
                py: 1.5,
                px: 3,
                borderRadius: 2,
                fontSize: '1.1rem'
              }}
            >
              Shop Products
            </Button>
            
            <Button
              variant="outlined"
              size="large"
              startIcon={<AdminIcon />}
              onClick={() => navigate('/admin')}
              sx={{ 
                py: 1.5,
                px: 3,
                borderRadius: 2,
                fontSize: '1.1rem'
              }}
            >
              Admin Dashboard
            </Button>
          </Box>
        </Paper>
        
        {/* Features Section */}
        <Box sx={{ mt: 4, display: 'flex', flexWrap: 'wrap', gap: 3, justifyContent: 'center' }}>
          <Paper elevation={2} sx={{ p: 3, width: 240 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Wide Selection</Typography>
            <Typography variant="body2">
              Browse our extensive catalog of motorcycle parts and accessories for all major brands.
            </Typography>
          </Paper>
          
          <Paper elevation={2} sx={{ p: 3, width: 240 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Quality Products</Typography>
            <Typography variant="body2">
              We source only the best parts to ensure performance, durability, and safety.
            </Typography>
          </Paper>
          
          <Paper elevation={2} sx={{ p: 3, width: 240 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>Expert Support</Typography>
            <Typography variant="body2">
              Our team of motorcycle enthusiasts is here to help you find the right parts.
            </Typography>
          </Paper>
        </Box>
      </Container>

      {/* Footer */}
      <Box 
        component="footer"
        sx={{ 
          py: 3, 
          px: 2, 
          mt: 'auto',
          backgroundColor: 'primary.main',
          color: 'white'
        }}
      >
        <Container maxWidth="sm">
          <Typography variant="body1" align="center">
            © {new Date().getFullYear()} BikeKade.lk - All Rights Reserved
          </Typography>
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            The ultimate destination for motorcycle enthusiasts
          </Typography>
        </Container>
      </Box>
    </Box>
  );
}