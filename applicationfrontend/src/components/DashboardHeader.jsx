import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  useTheme,
  useMediaQuery
} from "@mui/material";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import ExitToAppRoundedIcon from "@mui/icons-material/ExitToAppRounded";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DashboardIcon from "@mui/icons-material/Dashboard";

const DashboardHeader = ({ user, onAddProduct, onLogout }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Format user's name with proper capitalization
  const formattedName = user.fullName
    ? user.fullName
        .split(" ")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ")
    : "User";

  // Get user's initials for the avatar
  const userInitials = user.fullName
    ? user.fullName
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "U";

  return (
    <AppBar 
      position="sticky" 
      elevation={0}
      sx={{ 
        bgcolor: "background.paper", 
        borderBottom: `1px solid ${theme.palette.divider}`,
        boxShadow: '0 4px 6px rgba(0,0,0,0.04)'
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ height: 70 }}>
          {/* Dashboard Title */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <DashboardIcon sx={{ mr: 1, color: theme.palette.primary.main }} />
            <Typography
              variant="h6"
              component="div"
              sx={{
                fontWeight: 700,
                color: theme.palette.primary.main,
              }}
            >
              Dashboard
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1 }} />

          {/* Action Buttons */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
            {!isMobile && (
              <Typography 
                variant="body1" 
                sx={{ 
                  fontWeight: 500,
                  mr: 2,
                  color: theme.palette.text.secondary 
                }}
              >
                Welcome, {formattedName}
              </Typography>
            )}
            
            <Button
              variant="outlined"
              color="primary"
              onClick={onAddProduct}
              startIcon={<AddRoundedIcon />}
              sx={{
                borderRadius: "20px",
                px: 2,
                fontWeight: 500,
                borderWidth: "2px",
                "&:hover": {
                  borderWidth: "2px",
                },
                display: { xs: "none", sm: "flex" }
              }}
            >
              Add Product
            </Button>
            
            <Button
              variant="contained"
              color="primary"
              onClick={onLogout}
              startIcon={<ExitToAppRoundedIcon />}
              sx={{
                borderRadius: "20px",
                px: 2,
                fontWeight: 500,
                boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                "&:hover": {
                  boxShadow: "0 6px 10px rgba(0,0,0,0.15)",
                },
                display: { xs: "none", sm: "flex" }
              }}
            >
              Logout
            </Button>

            {/* Mobile buttons */}
            {isMobile && (
              <>
                <IconButton
                  color="primary"
                  onClick={onAddProduct}
                  size="small"
                >
                  <AddRoundedIcon />
                </IconButton>
                
                <IconButton
                  color="primary"
                  onClick={onLogout}
                  size="small"
                >
                  <ExitToAppRoundedIcon />
                </IconButton>
              </>
            )}
            
            {/* User Profile */}
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{ ml: 1 }}
            >
              <Avatar 
                sx={{ 
                  width: 35, 
                  height: 35,
                  bgcolor: theme.palette.secondary.main,
                  color: theme.palette.secondary.contrastText
                }}
              >
                {userInitials}
              </Avatar>
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
              <MenuItem onClick={handleMenuClose}>Account Settings</MenuItem>
              <Divider />
              <MenuItem onClick={onLogout}>Sign Out</MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default DashboardHeader;