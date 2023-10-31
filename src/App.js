import "./App.css";
import DogsDatabase from "./components/DogsDatabase";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SignInSide from "./components/SignInSide";
import { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { NotificationProvider } from "./components/NotificationContext";
import BreedsList from "./components/BreedsList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  return (
    <NotificationProvider>
      <Router>
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route
            exact
            path="https://arish21.github.io/pawwfect-match"
            element={<Home />}
          />
          <Route
            exact
            path="/pawwfect-match/signin"
            element={
              <SignInSide
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route
            exact
            path="/pawwfect-match/dogsearch"
            element={<DogsDatabase />}
          />
          {/* <Route exact path="/pawwfect-match/breedslist" element={<BreedsList />} /> */}
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;
