// src/components/products/AppHeader.jsx
import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { DirectionsBike as BikeIcon } from "@mui/icons-material";

function AppHeader() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component="div"
          sx={{ flexGrow: 1, display: "flex", alignItems: "center" }}
        >
          <BikeIcon sx={{ mr: 1 }} /> BikeKade.lk
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;
