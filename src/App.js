import { useEffect, useState, useCallback } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import PrivateRoutes from "./components/common/privateRoutes";
import RegisterForm from "./components/registerForm";
import Customers from "./components/customers";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import NotFound from "./components/notFound";
import NavBar from "./components/navBar";
import Logout from "./components/logout";
import Footer from "./components/footer";
import Genres from "./components/genres";
import WatchLaterSpinner from "./components/hoc/watchLaterSpinner";
import MoviesSpinner from "./components/hoc/moviesSpinner";
import HistorySpinner from "./components/hoc/historySpinner";

import { getWatchLater } from "./services/watchLaterService";
import auth from "./services/authService";

import "react-toastify/dist/ReactToastify.css";
import "./css/App.css";
import "./css/AppResponsiveWidth.css";
import "./css/AppResponsiveHeight.css";

function App() {
  const [movieIds, setMovieIds] = useState([]);
  const [user, setUser] = useState();
  const [selectedQuery, setSelectedQuery] = useState({
    name: "by title",
  });
  const [searchQuery, setSearchQuery] = useState("");
  const queries = [
    { name: "by title", _id: 0 },
    { name: "by rating", _id: 1 },
    { name: "by year", _id: 2 },
  ];
  const { pathname } = useLocation();

  const fetchWatchLaterMovieIds = useCallback(async () => {
    try {
      const { data } = await getWatchLater();
      setMovieIds(data);
    } catch (err) {}
  }, []);

  const handleWatchLaterSize = (movieId) => {
    const movieIdsCopy = [...movieIds];
    movieIdsCopy.push(movieId);
    setMovieIds(movieIdsCopy);
  };

  const handleRemoveWatchLaterSize = () => {
    const movieIdsCopy = [...movieIds];
    movieIdsCopy.pop();
    setMovieIds(movieIdsCopy);
  };

  const handleQuerySelect = (query) => {
    setSelectedQuery(query);
    setSearchQuery("");
  };
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser(user);
    if (user) fetchWatchLaterMovieIds();
  }, [fetchWatchLaterMovieIds]);

  return (
    <>
      <ToastContainer />
      <NavBar
        user={user}
        watchLaterSize={movieIds.length}
        queries={queries}
        selectedQuery={selectedQuery}
        searchQuery={searchQuery}
        onQuerySelect={handleQuerySelect}
        onSearch={handleSearch}
        pathname={pathname}
      />
      <main className="container">
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />}></Route>
          <Route
            path="/movies"
            element={
              <MoviesSpinner
                onAddWatchLater={handleWatchLaterSize}
                selectedQuery={selectedQuery}
                searchQuery={searchQuery}
              />
            }
          ></Route>
          <Route path="/not-found" element={<NotFound />}></Route>
          <Route
            path="/"
            element={<Navigate to={"/movies"} replace={true} />}
          />
          <Route
            path="/:id"
            element={<Navigate to={"/not-found"} replace={true} />}
          />

          <Route element={<PrivateRoutes to={"/login"} />}>
            <Route path="/logout" element={<Logout />} />
            <Route
              path="/watchlater"
              element={
                <WatchLaterSpinner
                  onRemoveWatchLater={handleRemoveWatchLaterSize}
                />
              }
            />
            <Route path="/history" element={<HistorySpinner />} />
          </Route>

          <Route
            element={<PrivateRoutes to={"/not-found"} checkIsAdmin={true} />}
          >
            <Route path="/customers" element={<Customers />} />
            <Route path="/movies/:id" element={<MovieForm />} />
            <Route path="/genres" element={<Genres />} />
          </Route>
        </Routes>
      </main>
      {pathname === "/login" ||
      pathname === "/register" ||
      pathname === "/watchlater" ||
      pathname === "/history" ||
      pathname === "/customers" ||
      pathname === "/not-found" ? null : (
        <Footer />
      )}
    </>
  );
}

export default App;
