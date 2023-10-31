import React, { useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import DogCard from "./DogCard";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  alignItems: "center",
};

const MatchModal = ({ likedDogs }) => {
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const [matchedDog, setMatchedDog] = useState([]);

  const modalClicked = async () => {
    const response = await fetch(
      `https://frontend-take-home-service.fetch.com/dogs/match/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(likedDogs),
      }
    );
    response.json().then(async (data) => {
      const response = await fetch(
        "https://frontend-take-home-service.fetch.com/dogs",
        {
          method: "POST",
          body: JSON.stringify([data.match]),
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        setMatchedDog(data[0]); // Set the data for the current page
      } else {
        console.error(
          "Failed to fetch dog data: ",
          response.status,
          response.statusText
        );
      }
    });
    setOpen(true);
  };

  return (
    <div>
      <Button onClick={modalClicked} variant="outlined">
        Show match
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h2">
            <u>Yay! Congratulations!</u>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 3, mb: 3 }}>
            You have been matched with
          </Typography>
          <DogCard dog={matchedDog} isLiked={true} />
        </Box>
      </Modal>
    </div>
  );
};

export default MatchModal;
