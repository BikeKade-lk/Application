import React from "react";
import {
  Box,
  Button,
  Typography,
  Container,
  Paper,
  Divider,
} from "@mui/material";
import {
  AdminPanelSettings as AdminIcon,
  Person as UserIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home() {
  const navigate = useNavigate();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      <Container
        component="main"
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          py: 4,
        }}
      >
        {/* Hero Section */}
        <Paper
          elevation={3}
          sx={{
            p: 4,
            mb: 4,
            textAlign: "center",
            backgroundImage:
              'linear-gradient(rgba(255, 255, 255, 0.9), rgba(255, 255, 255, 0.9)), url("/bike-background.jpg")',
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            maxWidth: 800,
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              mb: 2,
            }}
          >
            <img
              src={logo}
              alt="BikeKade.lk Logo"
              style={{ height: "120px", marginBottom: "16px" }}
            />
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: "bold",
                color: "primary.main",
              }}
            >
              Welcome to BikeKade.lk
            </Typography>
          </Box>
          <Typography variant="h6" sx={{ mb: 3 }}>
            Your one-stop shop for motorcycle accessories and spare parts
          </Typography>
          <Divider sx={{ mb: 3 }} />
          <Typography variant="body1" sx={{ mb: 3 }}>
            Find the perfect parts for your ride or manage your product
            inventory.
          </Typography>

          {/* Dashboard Navigation Buttons */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              gap: 4,
              flexWrap: "wrap",
            }}
          >
            <Button
              variant="contained"
              size="large"
              startIcon={<UserIcon />}
              onClick={() => navigate("/products")}
              sx={{
                py: 1.5,
                px: 3,
                borderRadius: 2,
                fontSize: "1.1rem",
              }}
            >
              Shop Products
            </Button>

            <Button
              variant="outlined"
              size="large"
              startIcon={<AdminIcon />}
              onClick={() => navigate("/signup")}
              sx={{
                py: 1.5,
                px: 3,
                borderRadius: 2,
                fontSize: "1.1rem",
              }}
            >
              Admin Dashboard
            </Button>
          </Box>
        </Paper>

        {/* Features Section */}
        <Box
          sx={{
            mt: 4,
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "center",
          }}
        >
          <Paper elevation={2} sx={{ p: 3, width: 240 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Wide Selection
            </Typography>
            <Typography variant="body2">
              Browse our extensive catalog of motorcycle parts and accessories
              for all major brands.
            </Typography>
          </Paper>

          <Paper elevation={2} sx={{ p: 3, width: 240 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Quality Products
            </Typography>
            <Typography variant="body2">
              We source only the best parts to ensure performance, durability,
              and safety.
            </Typography>
          </Paper>

          <Paper elevation={2} sx={{ p: 3, width: 240 }}>
            <Typography variant="h6" sx={{ mb: 1 }}>
              Expert Support
            </Typography>
            <Typography variant="body2">
              Our team of motorcycle enthusiasts is here to help you find the
              right parts.
            </Typography>
          </Paper>
        </Box>
      </Container>
      <Footer />
    </Box>
  );
}
