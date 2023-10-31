import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const BreedsList = (props) => {
  const [breeds, setBreeds] = useState([]);
  useEffect(() => {
    const fetchBreeds = async () => {
      try {
        const response = await fetch(
          "https://frontend-take-home-service.fetch.com/dogs/breeds",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              // Include the auth token
            },
            credentials: "include", // Include cookies in the request
          }
        );

        if (response.ok) {
          const data = await response.json();
          setBreeds(data);
        } else {
          console.error(
            "Failed to fetch breeds data: ",
            response.status,
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error fetching breeds:", error);
      }
    };

    fetchBreeds();
  }, []);
  return (
    <Box
      sx={{
        width: "100%",
        marginBottom: "5rem",
      }}
    >
      <Typography
        component="h1"
        variant="h4"
        sx={{ fontWeight: "medium" }}
        gutterBottom
      >
        Available Breeds
      </Typography>
      <Box>
        {breeds && (
          <Autocomplete
            multiple
            id="tags-standard"
            options={breeds}
            // defaultValue={[breeds[1]]}
            onChange={(event, val) => {
              props.fetchDogs(val);
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="standard"
                label="Select Breed"
                placeholder="Breeds"
              />
            )}
          />
        )}
      </Box>
    </Box>
  );
};

export default BreedsList;
