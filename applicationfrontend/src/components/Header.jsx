// src/components/Header.js
import React from "react";
import { AppBar, Toolbar, Typography, Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        {/* Left side: Logo and Title */}
        <Box sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}>
          <img
            src={logo}
            alt="BikeKade.lk Logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <Typography variant="h6" component="div">
            BikeKade.lk
          </Typography>
        </Box>

        {/* Right side: Home Button */}
        <Button color="inherit" component={Link} to="/">
          Home
        </Button>
      </Toolbar>
    </AppBar>
  );
}
