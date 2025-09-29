import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import DraftPage from "../pages/DraftPage";
import FilmPage from "../pages/FilmPage";
import HomePage from "../pages/HomePage";
import { LoginPage } from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import SeriesPage from "../pages/SeriesPage";
import ProfilePage from "../pages/ProfilePage";
import WatchPage from "../pages/WatchPage";
import PremiumPage from "../pages/PremiumPage";

function AppRoutes() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<RegisterPage />} />
          <Route path="/homepage" element={<HomePage />} />
          <Route path="/homepage/draft" element={<DraftPage />} />
          <Route path="/homepage/movie" element={<FilmPage />} />
          <Route path="/homepage/tv" element={<SeriesPage />} />
          <Route path="/homepage/profile" element={<ProfilePage />} />
          <Route path="/homepage/premium" element={<PremiumPage />} />
          <Route path="/homepage/:mediaType/:id" element={<WatchPage />} />
        </Routes>
      </Router>

    </>
  );
}

export default AppRoutes;
