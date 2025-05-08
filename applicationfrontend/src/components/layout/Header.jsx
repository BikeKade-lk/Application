import React from "react";
import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import logo from "../../assets/images/logo.png";

export default function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
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
      </Toolbar>
    </AppBar>
  );
}