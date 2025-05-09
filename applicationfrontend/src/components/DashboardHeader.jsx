import React from "react";
import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";

const DashboardHeader = ({ user, onAddProduct, onLogout }) => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {user.fullName
            .split(" ")
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(" ")}
          's Dashboard
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
            color="inherit"
            onClick={onAddProduct}
            startIcon={<AddRoundedIcon />}
          >
            Add Product
          </Button>
          <Button
            color="inherit"
            onClick={onLogout}
            startIcon={<ExitToAppRoundedIcon />}
          >
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default DashboardHeader;
