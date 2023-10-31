import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import dogOwner from "../images/dogOwner.png";
import { useNavigate } from "react-router-dom";
import { useNotification } from "./NotificationContext";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="">
        Arish Dakhani
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function SignInSide({ isLoggedIn, setIsLoggedIn }) {
  const { showNotification } = useNotification();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = data.get("fullName");
    const email = data.get("email");

    // console.log({
    //   email: data.get("email"),
    //   fullName: data.get("fullName"),
    // });
    try {
      const response = await fetch(
        " https://frontend-take-home-service.fetch.com/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ name, email }),
          credentials: "include",
        }
      );

      if (response.ok) {
        setIsLoggedIn(true);
        localStorage.setItem("isLoggedIn", "true");
        showNotification("Login successful!", "success");
        // Redirect to the Dogs page
        navigate("/dogsearch");
      } else {
        // Authentication failed
        console.log("Authentication failed");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid
        container
        component="main"
        sx={{ height: "100vh", marginTop: "7vh" }}
      >
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${dogOwner})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "contain",
            backgroundPosition: "center",
          }}
        >
          <Typography
            component="h1"
            variant="h4"
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "2rem",
              fontWeight: "bold",
              color: "#BEBDBD",
            }}
          >
            Unlock the Door to Your Furry Friend's Dream Home
          </Typography>
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              marginTop: "51rem",
            }}
          >
            <a href="https://storyset.com/home">
              Home illustrations by Storyset
            </a>
          </Typography>
        </Grid>

        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "14rem",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h4">
              Log in
            </Typography>

            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                id="fullName"
                label="Full Name"
                name="fullName"
                autoComplete="fullName"
                autoFocus
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Log In
              </Button>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
