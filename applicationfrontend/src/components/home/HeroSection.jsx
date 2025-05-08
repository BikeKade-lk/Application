import React from "react";
import { Box, Typography, Paper, Divider, Button } from "@mui/material";
import { Person as UserIcon, AdminPanelSettings as AdminIcon } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/images/logo.png";

export default function HeroSection() {
  const navigate = useNavigate();
  
  return (
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
  );
}