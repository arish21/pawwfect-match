import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useNotification } from "./NotificationContext";

function Navbar({ isLoggedIn, setIsLoggedIn }) {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      // Send a request to log the user out
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/auth/logout",
        {
          method: "POST",
          credentials: "include", // Include cookies in the request
        }
      );

      if (response.ok) {
        setIsLoggedIn(false);
        localStorage.removeItem("isLoggedIn");
        navigate("/signin"); // Redirect to the login page
        showNotification("Logout successful!", "success");
      } else {
        // Handle logout failure, e.g., display an error message
        console.error("Logout failed");
      }
    } catch (error) {
      // Handle network or other errors
      console.error("Error:", error);
    }
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Link to="/" sx={{ textDecoration: "none" }}>
            <Typography
              variant="h6"
              noWrap
              component="span"
              sx={{
                mr: 3,
                display: { xs: "none", md: "flex" },
                fontFamily: "Helvetica",
                fontWeight: 900,
                letterSpacing: ".1rem",
                color: "#fff",
                textDecoration: "none",
              }}
            >
              PawwfectMatch
            </Typography>
          </Link>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {isLoggedIn && ( // Check if the user is logged in
                <MenuItem onClick={handleCloseNavMenu}>
                  <Link to="/dogsearch">
                    <Typography textAlign="center">Available Dogs</Typography>
                  </Link>
                </MenuItem>
              )}
            </Menu>
          </Box>
          <Button sx={{ display: { xs: "flex", md: "none" }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 900,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            PawwfectMatch
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {isLoggedIn && ( // Check if the user is logged in
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to="/dogsearch">
                  <Typography textAlign="center" sx={{ color: "#fff" }}>
                    Available Dogs
                  </Typography>
                </Link>
              </MenuItem>
            )}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            {isLoggedIn ? (
              <Button
                variant="outlined"
                sx={{ color: "#fff" }}
                onClick={handleLogout}
              >
                Log out
              </Button>
            ) : (
              <Link to="/signin">
                <Button variant="outlined" sx={{ color: "#fff" }}>
                  Log in
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Navbar;
