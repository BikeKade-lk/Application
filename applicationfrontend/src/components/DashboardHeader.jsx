import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";

const DashboardHeader = ({ user, onAddProduct, onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {user.fullName}'s Dashboard
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Typography variant="subtitle1">{user.username}</Typography>
          <Button color="inherit" onClick={onAddProduct}>
            Add Product
          </Button>
          <Button
            color="inherit"
            onClick={onLogout}
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;