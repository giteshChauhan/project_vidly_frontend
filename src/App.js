import { useEffect, useState } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import PrivateRoutes from "./components/common/privateRoutes";
import RegisterForm from "./components/registerForm";
import Customers from "./components/customers";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/loginForm";
import NotFound from "./components/notFound";
import Rentals from "./components/rentals";
import NavBar from "./components/navBar";
import Logout from "./components/logout";
import Footer from "./components/footer";
import Genres from "./components/genres";
import Movies from "./components/movies";
import Banner from "./components/banner";

import auth from "./services/authService";

import "react-toastify/dist/ReactToastify.css";
import "./css/App.css";
import "./css/AppResponsiveWidth.css";
import "./css/AppResponsiveHeight.css";

function App() {
  const { pathname } = useLocation();
  const [user, setUser] = useState();

  useEffect(() => {
    const user = auth.getCurrentUser();
    setUser(user);
  }, []);

  return (
    <>
      <ToastContainer />
      <NavBar user={user} />
      {pathname === "/movies" && <Banner />}
      <main className="container">
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/movies" element={<Movies user={user} />}></Route>
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
            <Route path="/rentals" element={<Rentals />} />
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
      <Footer />
    </>
  );
}

export default App;
