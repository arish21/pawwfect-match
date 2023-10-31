import React from "react";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import lImg from "../images/landingImg.png";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "center",
          alignContent: "center",
          marginTop: "15vh",
        }}
      >
        <Grid container spacing={3}>
          <Grid
            item
            xs={6}
            md={5}
            sx={{
              height: "100vh",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              component="h1"
              variant="h2"
              sx={{
                display: "flex",
                flexDirection: "column",
                marginLeft: "8rem",
                marginTop: "10rem",
                lineHeight: "4rem",
              }}
            >
              Paws and Explore Your
              <span style={{ fontWeight: "bold", color: "#1976d2" }}>
                Best Friend
              </span>
            </Typography>
            <Typography
              component="h1"
              variant="h5"
              sx={{
                display: "flex",
                marginLeft: "8rem",
                marginTop: "2rem",
              }}
            >
              Welcome to our pet paradise, where dreams of finding your ideal
              furry friend come true. Explore our database of adorable dogs and
              start your joyful journey today!
            </Typography>
            <Typography
              component="h1"
              variant="h4"
              sx={{
                display: "flex",
                marginLeft: "8rem",
                marginTop: "2rem",
              }}
            >
              {" "}
              Login now to Explore!
            </Typography>
            <Link to="/signin">
              <Typography
                component="h1"
                variant="h4"
                sx={{
                  display: "flex",
                  marginLeft: "8rem",
                  marginTop: "1rem",
                }}
              >
                <Button
                  variant="contained"
                  sx={{
                    padding: "0.4rem 2rem 0.4rem 2rem",
                    fontWeight: "bold",
                  }}
                >
                  Log in
                </Button>
              </Typography>
            </Link>
          </Grid>

          <Grid
            item
            xs={false}
            sm={4}
            md={7}
            sx={{
              height: "80vh",
              backgroundImage: `url(${lImg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          ></Grid>
        </Grid>
      </Box>
    </div>
  );
};

export default Home;
