// src/components/Header.js
import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

// MUI Icons
import StorefrontIcon from "@mui/icons-material/Storefront";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import LoginIcon from "@mui/icons-material/Login";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Left side: Logo and Title wrapped in Link */}
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <Link
            to="/"
            style={{
              display: "flex",
              alignItems: "center",
              textDecoration: "none",
              color: "inherit",
            }}
          >
            <img
              src={logo}
              alt="BikeKade.lk Logo"
              style={{ height: "40px", marginRight: "10px" }}
            />
            <Typography variant="h6" component="div">
              BikeKade.lk
            </Typography>
          </Link>
        </Box>

        {/* Right side: Navigation Buttons */}
        <Button
          color="inherit"
          component={Link}
          to="/products"
          startIcon={<StorefrontIcon />}
        >
          Products
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/signup"
          startIcon={<PersonAddAlt1Icon />}
        >
          Sign Up
        </Button>
        <Button
          color="inherit"
          component={Link}
          to="/signin"
          startIcon={<LoginIcon />}
        >
          Sign In
        </Button>
      </Toolbar>
    </AppBar>
  );
}
