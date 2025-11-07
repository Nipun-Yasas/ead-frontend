import React from "react";
import {
  Box,
  Container,
  Typography,
  Link,
  Stack,
} from "@mui/material";
import { styled } from "@mui/material/styles";

const CopyrightSection = styled(Box)(() => ({
  backgroundColor: "rgba(214,5,7,0.77)",
  paddingTop: "12px",
  paddingBottom: "12px",
}));

const StyledLink = styled(Link)(() => ({
  color: "#D4D4D8",
  textDecoration: "none",
  fontSize: "0.875rem",
  "&:hover": {
    color: "#FFFFFF",
    textDecoration: "none",
  },
}));

const Footer: React.FC = () => {
  return (
    <Box component="footer" id="contact" className="fixed-footer" sx={{ backgroundColor: "#171717", color: "#FFFFFF" }}>
      {/* Main Footer Content */}
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, gap: 4 }}>
          {/* About AutoCare Pro */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6" 
              component="h3"
              gutterBottom
              sx={{ color: "#FFFFFF", fontWeight: 600 }}
            >
              About AutoCare Pro
            </Typography>
            <Typography
              variant="body2"
              sx={{ 
                color: "#D4D4D8", 
                lineHeight: 1.6,
                fontSize: "0.875rem"
              }}
            >
              Leading automobile service management platform providing
              excellence in vehicle care since 2020.
            </Typography>
          </Box>

          {/* Services */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              sx={{ color: "#FFFFFF", fontWeight: 600 }}
            >
              Services
            </Typography>
            <Stack spacing={1}>
              <StyledLink href="/services/maintenance">
                Regular Maintenance
              </StyledLink>
              <StyledLink href="/services/repairs">
                Repairs & Diagnostics
              </StyledLink>
              <StyledLink href="/services/modifications">
                Custom Modifications
              </StyledLink>
              <StyledLink href="/services/emergency">
                Emergency Service
              </StyledLink>
            </Stack>
          </Box>

          {/* Quick Links */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              sx={{ color: "#FFFFFF", fontWeight: 600 }}
            >
              Quick Links
            </Typography>
            <Stack spacing={1}>
              <StyledLink href="/book-service">
                Book Service
              </StyledLink>
              <StyledLink href="/login">
                Customer Login
              </StyledLink>
              <StyledLink href="/signup">
                Sign Up
              </StyledLink>
              <StyledLink href="/about">
                About Us
              </StyledLink>
            </Stack>
          </Box>

          {/* Contact */}
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h6"
              component="h3"
              gutterBottom
              sx={{ color: "#FFFFFF", fontWeight: 600 }}
            >
              Contact
            </Typography>
            <Stack spacing={1}>
              <Typography variant="body2" sx={{ color: "#D4D4D8", fontSize: "0.875rem" }}>
                <Box component="span" sx={{ fontWeight: 500 }}>Email:</Box>{" "}
                <StyledLink href="mailto:info@autocarepro.com">
                  info@autocarepro.com
                </StyledLink>
              </Typography>
              <Typography variant="body2" sx={{ color: "#D4D4D8", fontSize: "0.875rem" }}>
                <Box component="span" sx={{ fontWeight: 500 }}>Phone:</Box>{" "}
                <StyledLink href="tel:+15551234567">
                  (555) 123-4567
                </StyledLink>
              </Typography>
              <Typography variant="body2" sx={{ color: "#D4D4D8", fontSize: "0.875rem" }}>
                <Box component="span" sx={{ fontWeight: 500 }}>Address:</Box> 123 Auto Lane
              </Typography>
              <Typography variant="body2" sx={{ color: "#D4D4D8", fontSize: "0.875rem" }}>
                <Box component="span" sx={{ fontWeight: 500 }}>Hours:</Box> Mon-Sat 8AM-6PM
              </Typography>
            </Stack>
          </Box>
        </Box>
      </Container>

      {/* Copyright Section */}
      <CopyrightSection className="copyright-strip">
        <Container maxWidth="lg">
          <Typography 
            variant="body2" 
            align="center" 
            sx={{ color: "#FFFFFF", fontSize: "0.875rem" }}
          >
            © 2025 AutoCare Pro. All rights reserved.
          </Typography>
        </Container>
      </CopyrightSection>
    </Box>
  );
};

export default Footer;
