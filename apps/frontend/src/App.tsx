import React from "react";
import HeroPage from "./routes/HeroPage.tsx";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/App.module.css";
import { CSVPage } from "./routes/CSVPage.tsx";
import "./index.css";
import AdminMap from "./refactored_map_page/AdminMap.tsx";
import PublicMap from "./refactored_map_page/PublicMap.tsx";
import NewSideNavBar from "./components/NewSideNavBar.tsx";
import Banner from "./components/Banner.tsx";
import Dashboard from "./routes/Dashboard.tsx";
import Credits from "./routes/Credits.tsx";
import About from "./routes/About.tsx";
import Platformer from "./games/Platformer.jsx";
import GameOver from "./game_components/GameOver.tsx";
import StartScreen from "./game_components/StartScreen";
import EmployeePage from "./routes/EmployeePage.tsx";
import Statistics from "./routes/Statistics.tsx";
import CharacterSelect from "./game_components/CharacterSelect";
// import {useAuth0} from "@auth0/auth0-react";

function App() {
  return (
    <Router>
      <ConditionalSideNavBar />
      <ConditionalBanner />
      <Routes>
        <Route path="/" element={<HeroPage />} />
        <Route path="/brigham-breakout" element={<Platformer />} />
        <Route path="/brigham-breakout-start" element={<StartScreen />} />
        <Route path="/public-map" element={<PublicMap />} />
        <Route path="/csv-page" element={<CSVPage />} />
        <Route path="/employee-page" element={<EmployeePage />} />
        <Route path="/admin-map" element={<AdminMap />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/character-select" element={<CharacterSelect />} />
        <Route path="/game-over" element={<GameOver />} />
        <Route path="/about" element={<About />} />
        <Route path="/credits" element={<Credits />} />
      </Routes>
    </Router>
  );
}

function ConditionalSideNavBar() {
  const location = useLocation();

  // Don't render the side navbar on the login route
  if (
    location.pathname === "/" ||
    location.pathname === "/game-over" ||
    location.pathname === "/brigham-breakout-start" ||
    location.pathname === "/brigham-breakout" ||
    location.pathname === "/character-select"
  ) {
    return null;
  }

  return <NewSideNavBar />;
}

function ConditionalBanner() {
  const location = useLocation();
  // const { isAuthenticated, user } = useAuth0();

  // Don't render the side navbar on the login route
  if (
    location.pathname === "/" ||
    location.pathname === "/game-over" ||
    location.pathname === "/brigham-breakout-start" ||
    location.pathname === "/brigham-breakout" ||
    location.pathname === "/character-select"
  ) {
    return null;
  }

  // Don't render the side navbar if the user is not authenticated
  // if (!isAuthenticated) {
  //     return null;
  // }

  // Don't render the side navbar if the user is not an employee
  // const userRoles = user ? user['http://localhost:3000/roles'] : [];
  // const isEmployee = userRoles.some((role: string) => ['admin', 'staff'].includes(role));
  // if (!isEmployee) {
  //     return null;
  // }

  return <Banner />;
}

export default App;
