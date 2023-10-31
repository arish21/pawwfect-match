import "./App.css";
import DogsDatabase from "./components/DogsDatabase";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import SignInSide from "./components/SignInSide";
import { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import { NotificationProvider } from "./components/NotificationContext";
import BreedsList from "./components/BreedsList";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  return (
    <NotificationProvider>
      <Router basename="/pawwfect-match">
        <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
        <Routes>
          <Route exact path="/pawwfect-match" element={<Home />} />
          <Route
            path="/signin"
            element={
              <SignInSide
                isLoggedIn={isLoggedIn}
                setIsLoggedIn={setIsLoggedIn}
              />
            }
          />
          <Route path="/dogsearch" element={<DogsDatabase />} />
          <Route path="/breedslist" element={<BreedsList />} />
        </Routes>
      </Router>
    </NotificationProvider>
  );
}

export default App;
