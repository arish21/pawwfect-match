import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Pagination from "@mui/material/Pagination";
import DogCard from "./DogCard";
import { useSearchParams } from "react-router-dom";
import { CircularProgress } from "@mui/material";
import BreedList from "./BreedsList";
import MatchModal from "./MatchModal";
import SearchIcon from "@mui/icons-material/Search";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MoodIcon from "@mui/icons-material/Mood";

const DogsDatabase = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const [isLoading, setIsLoading] = useState([]);
  const [dogData, setDogData] = useState([]);

  const [currentPage, setCurrentPage] = useState(
    parseInt(searchParams.get("page")) || 1
  );

  const [likedDogs, setLikedDogs] = useState([]);
  const [sortOrder, setSortOrder] = useState(searchParams.get("sort") || "asc");
  const [totalDogs, setTotalDogs] = useState(0);
  const [breeds, setBreeds] = useState([]);
  const dogsPerPage = 10; // Display 100 dogs per page

  const handleLikeClick = (dogId) => {
    // Create a copy of the current likedDogs state
    const updatedLikedDogs = [...likedDogs];

    // Check if the dog is already liked
    const dogIndex = updatedLikedDogs.indexOf(dogId);
    if (dogIndex !== -1) {
      // Dog is already liked, so unlike it
      updatedLikedDogs.splice(dogIndex, 1);
    } else {
      // Dog is not liked, so like it
      updatedLikedDogs.push(dogId);
    }
    // Update the likedDogs state with the new data
    setLikedDogs(updatedLikedDogs);
  };

  // Use likedDogs state to determine if the "Favorite" button should be red
  const isLiked = (dogId) => likedDogs.includes(dogId);

  const fetchDogsPerBreed = (breedsFilterVals) => {
    // console.log(breedsFilterVals, "filtering based on these breeds ");
    setBreeds(breedsFilterVals);
    fetchDogData(sortOrder, (currentPage - 1) * dogsPerPage, breedsFilterVals);
  };
  const fetchDogData = async (sort, from, breedsList = breeds) => {
    // console.log(breeds, "at time of fetch");
    setSearchParams("sort", sort.toString());
    setIsLoading(true);
    setSortOrder(sort);
    const queryParams = new URLSearchParams();
    queryParams.append("sort", `breed:${sort}`);
    queryParams.append("from", from.toString());
    queryParams.append("size", dogsPerPage.toString());
    breedsList.forEach((breed) => {
      queryParams.append("breeds[]", breed);
    });

    const response = await fetch(
      `https://frontend-take-home-service.fetch.com/dogs/search/?${queryParams}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (response.ok) {
      const data = await response.json();
      setTotalDogs(data.total);
      // Fetch details for this chunk of dog IDs
      fetchDogDetails(data.resultIds);
    } else {
      console.error(
        "Failed to fetch dog data: ",
        response.status,
        response.statusText
      );
    }
  };

  const fetchDogDetails = async (dogIds) => {
    if (dogIds.length === 0) return;

    const response = await fetch(
      "https://frontend-take-home-service.fetch.com/dogs",
      {
        method: "POST",
        body: JSON.stringify(dogIds),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );

    if (response.ok) {
      const data = await response.json();
      setDogData(data); // Set the data for the current page
      setIsLoading(false);
    } else {
      console.error(
        "Failed to fetch dog data: ",
        response.status,
        response.statusText
      );
    }
  };

  useEffect(() => {
    fetchDogData(sortOrder, (currentPage - 1) * dogsPerPage);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePageChange = (event, page) => {
    // Calculate the "from" value for the next page
    const from = (page - 1) * dogsPerPage;
    fetchDogData(sortOrder, from);
    setCurrentPage(page);
  };

  return (
    <>
      <Box
        sx={{
          marginTop: "13vh",
          display: "flex",
          justifyContent: " center",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography
          component="h1"
          variant="h2"
          sx={{ fontWeight: "medium" }}
          gutterBottom
        >
          Meet Your Future Canine Companion
        </Typography>
        <Typography variant="h5" paragraph>
          Browse through our collection of lovely dogs available for adoption.
          Your new best friend might just be a click away!
        </Typography>
        <Typography variant="h4" paragraph>
          [Search. Like. Show Match]
        </Typography>
        <Typography variant="h4" paragraph sx={{ color: "#1976d2" }}>
          [<SearchIcon />. <FavoriteIcon />. <MoodIcon />]
        </Typography>
      </Box>
      <Box
        sx={{
          width: "80%",
          marginLeft: "12.5rem",
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: "5rem",
        }}
      >
        <Box sx={{ width: "50%" }}>
          <BreedList fetchDogs={fetchDogsPerBreed} />
        </Box>
        <Box
          sx={{
            width: "33%",
            height: "20%",
            display: "flex",
            justifyContent: "center",

            gap: "1rem",
            marginTop: "2rem",
            textAlign: "center",
          }}
        >
          <Typography variant="h5">Sort Breeds:</Typography>
          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setSortOrder("asc");
              fetchDogData("asc", (currentPage - 1) * dogsPerPage, breeds);
            }}
          >
            ASC
          </Button>

          <Button
            size="small"
            variant="outlined"
            onClick={() => {
              setSortOrder("desc");
              fetchDogData("desc", (currentPage - 1) * dogsPerPage, breeds);
            }}
          >
            DESC
          </Button>
          {likedDogs.length > 0 && <MatchModal likedDogs={likedDogs} />}
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        {isLoading ? (
          <CircularProgress
            sx={{ marginLeft: "50%" }}
            size="10rem"
            thickness={4}
          />
        ) : (
          <>
            <Box
              sx={{
                width: "80vw",
                marginBottom: "3rem",
                marginLeft: "13vw",
                marginTop: "3rem",
                display: "flex",
                flexDirection: "row",
                backgroundColor: "#fff",
                gap: "7rem",
                flexWrap: "wrap",
              }}
            >
              {dogData?.map((dog) => (
                <DogCard
                  key={dog.id}
                  dog={dog}
                  onLikeClick={handleLikeClick}
                  isLiked={isLiked(dog.id)}
                />
              ))}
            </Box>
            <Pagination
              count={Math.ceil(totalDogs / dogsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
              sx={{
                display: "flex",
                justifyContent: "center",
                alignContent: "center",
                marginBottom: "5rem",
              }}
            />
          </>
        )}
      </Box>
    </>
  );
};

export default DogsDatabase;
