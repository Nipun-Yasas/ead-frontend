import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import MuiLink from "@mui/material/Link";
import IconButton from "@mui/material/IconButton";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonIcon from "@mui/icons-material/Person";
import { Link as RouterLink } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { getDashboardRouteByRole } from "../utils/getNavigationByRole";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const navItems = [
    { label: "Home", id: "home" },
    { label: "Services", id: "services" },
    { label: "Why choose us", id: "whychooseus" },
    { label: "About", id: "about" },
    { label: "Contact", id: "contact" },
  ];

  const handleScrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: "#000000", boxShadow: "none" }}>
        <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, md: 4 } }}>
          {/* Logo */}
          <Typography 
            variant="h6" 
            sx={{ fontWeight: 600, cursor: "pointer" }}
            onClick={() => handleScrollToSection("home")}
          >
            Auto
            <Box component="span" sx={{ color: "#D60507" }}>
              Care
            </Box>{" "}
            Pro
          </Typography>

          {/* Desktop Navigation Links */}
          <Box sx={{ display: { xs: "none", md: "flex" }, gap: 4 }}>
            {navItems.map((item) => (
              <MuiLink
                key={item.label}
                href={`#${item.id}`}
                underline="none"
                onClick={(e) => {
                  e.preventDefault();
                  handleScrollToSection(item.id);
                }}
                sx={{
                  color: "white",
                  fontSize: "0.95rem",
                  cursor: "pointer",
                  "&:hover": { color: "#D60507" },
                  transition: "0.2s",
                }}
              >
                {item.label}
              </MuiLink>
            ))}
          </Box>

          {/* Desktop Auth Buttons */}
          <Box sx={{ display: { xs: "none", md: "flex" }, alignItems: "center", gap: 2 }}>
            {isAuthenticated ? (
              <>
                {/* My Appointments Button */}
                <Button
                  component={RouterLink as any}
                  to="/my-appointment"
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontSize: "0.9rem",
                    "&:hover": { color: "#D60507" },
                  }}
                >
                  My Appointments
                </Button>
                
                {/* Dashboard Button */}
                <Button
                  component={RouterLink as any}
                  to="/dashboard"
                  startIcon={<DashboardIcon />}
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontSize: "0.9rem",
                    "&:hover": { color: "#D60507" },
                  }}
                >
                  Dashboard
                </Button>
                
                {/* Logout Button */}
                <Button
                  onClick={logout}
                  startIcon={<LogoutIcon />}
                  variant="outlined"
                  sx={{
                    color: "white",
                    borderColor: "white",
                    textTransform: "none",
                    fontSize: "0.9rem",
                    "&:hover": { 
                      backgroundColor: "#D60507", 
                      borderColor: "#D60507",
                      color: "white" 
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={RouterLink as any}
                  to="/login"
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontSize: "0.9rem",
                    "&:hover": { color: "#D60507" },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={RouterLink as any}
                  to="/signup"
                  variant="contained"
                  sx={{
                    backgroundColor: "white",
                    color: "black",
                    textTransform: "none",
                    fontWeight: 500,
                    px: 2.5,
                    "&:hover": { backgroundColor: "#D60507", color: "white" },
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>

          {/* Mobile Hamburger Menu */}
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            sx={{ display: { xs: "block", md: "none" } }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer(false)}
        sx={{
          display: { xs: "block", md: "none" },
          "& .MuiDrawer-paper": {
            width: 280,
            backgroundColor: "#000000",
            color: "white",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          {/* Close Button */}
          <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Auto
              <Box component="span" sx={{ color: "#D60507" }}>
                Care
              </Box>{" "}
              Pro
            </Typography>
            <IconButton onClick={toggleDrawer(false)} sx={{ color: "white" }}>
              <CloseIcon />
            </IconButton>
          </Box>

          <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)", mb: 2 }} />

          {/* Navigation Items */}
          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  onClick={() => {
                    handleScrollToSection(item.id);
                    toggleDrawer(false)();
                  }}
                  sx={{
                    "&:hover": { backgroundColor: "rgba(214, 5, 7, 0.1)" },
                  }}
                >
                  <ListItemText
                    primary={item.label}
                    sx={{
                      "& .MuiTypography-root": {
                        fontSize: "1rem",
                        color: "white",
                      },
                    }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Divider sx={{ backgroundColor: "rgba(255,255,255,0.1)", my: 2 }} />

          {/* Auth Buttons */}
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, px: 2 }}>
            {isAuthenticated ? (
              <>
                {/* My Appointments Button */}
                <Button
                  component={RouterLink as any}
                  to="/my-appointment"
                  fullWidth
                  onClick={toggleDrawer(false)}
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontSize: "0.9rem",
                    border: "1px solid rgba(214, 5, 7, 0.5)",
                    justifyContent: "flex-start",
                    "&:hover": { 
                      backgroundColor: "rgba(214, 5, 7, 0.1)",
                      borderColor: "#D60507" 
                    },
                  }}
                >
                  My Appointments
                </Button>

                {/* Dashboard Button */}
                <Button
                  component={RouterLink as any}
                  to={getDashboardRouteByRole(user?.role || '')}
                  fullWidth
                  onClick={toggleDrawer(false)}
                  startIcon={<DashboardIcon />}
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontSize: "0.9rem",
                    border: "1px solid white",
                    justifyContent: "flex-start",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  Dashboard
                </Button>

                {/* Logout Button */}
                <Button
                  fullWidth
                  onClick={() => {
                    logout();
                    toggleDrawer(false)();
                  }}
                  startIcon={<LogoutIcon />}
                  variant="contained"
                  sx={{
                    backgroundColor: "#D60507",
                    color: "white",
                    textTransform: "none",
                    fontWeight: 500,
                    justifyContent: "flex-start",
                    "&:hover": { backgroundColor: "#b00406" },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={RouterLink as any}
                  to="/login"
                  fullWidth
                  onClick={toggleDrawer(false)}
                  sx={{
                    color: "white",
                    textTransform: "none",
                    fontSize: "0.9rem",
                    border: "1px solid white",
                    "&:hover": { backgroundColor: "rgba(255,255,255,0.1)" },
                  }}
                >
                  Login
                </Button>
                <Button
                  component={RouterLink as any}
                  to="/signup"
                  fullWidth
                  variant="contained"
                  onClick={toggleDrawer(false)}
                  sx={{
                    backgroundColor: "#D60507",
                    color: "white",
                    textTransform: "none",
                    fontWeight: 500,
                    "&:hover": { backgroundColor: "#b00406" },
                  }}
                >
                  Sign Up
                </Button>
              </>
            )}
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Navbar;