import React from "react";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import FavoriteIcon from "@mui/icons-material/Favorite";
import IconButton from "@mui/material/IconButton";

const DogCard = ({ dog, onLikeClick, isLiked }) => {
  return (
    <Card
      key={dog.id}
      sx={{
        width: 400,
        borderRadius: 3,
        boxShadow: "15px 18px 24px 0px rgba(0,0,0,0.15)",
      }}
    >
      <CardMedia component="img" alt={dog.name} height="370" image={dog.img} />
      <CardContent sx={{ textAlign: "center" }}>
        <Typography gutterBottom variant="h3">
          {dog.name}
        </Typography>
      </CardContent>
      <CardContent
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          marginLeft: "1rem",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Age: {dog.age}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Zipcode: {dog.zip_code}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Breed: {dog.breed}
        </Typography>
      </CardContent>
      <CardActions sx={{ marginLeft: "1rem" }}>
        <IconButton
          aria-label="add to favorites"
          onClick={() => onLikeClick(dog.id)}
          style={{
            color: isLiked ? "red" : "",
          }}
        >
          <FavoriteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default DogCard;
