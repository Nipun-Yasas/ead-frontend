import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Link from "@mui/material/Link";

const Navbar = () => {
  return (
    <AppBar position="static" sx={{ backgroundColor: "#000000", boxShadow: "none" }}>
      <Toolbar sx={{ justifyContent: "space-between", px: 4 }}>
        {/* Logo */}
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Auto
          <Box component="span" sx={{ color: "#D60507" }}>
            Care
          </Box>{" "}
          Pro
        </Typography>

        {/* Navigation Links */}
        <Box sx={{ display: "flex", gap: 4 }}>
          {["Home", "Book Service", "Services", "About", "Contact"].map((item) => (
            <Link
              key={item}
              href="#"
              underline="none"
              sx={{
                color: "white",
                fontSize: "0.95rem",
                "&:hover": { color: "#D60507" },
                transition: "0.2s",
              }}
            >
              {item}
            </Link>
          ))}
        </Box>

        {/* Auth Buttons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Button
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar