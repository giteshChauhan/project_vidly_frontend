import { Route, Routes, Navigate } from "react-router-dom";
import NavBar from "./components/navBar";
import Movies from "./components/movies";
import Customers from "./components/customers";
import Rentals from "./components/rentals";
import NotFound from "./components/notFound";
import MovieForm from "./components/movieForm";
import LoginForm from "./components/common/loginForm";
import RegisterForm from "./components/registerForm";
import "./App.css";

function App() {
  return (
    <>
      <NavBar />
      <main className="container">
        <Routes>
          <Route path="/register" element={<RegisterForm />} />
          <Route path="/login" element={<LoginForm />}></Route>
          <Route path="/movies/:id" element={<MovieForm />}></Route>
          <Route path="/movies" element={<Movies />}></Route>
          <Route path="/customers" element={<Customers />}></Route>
          <Route path="/rentals" element={<Rentals />}></Route>
          <Route path="/not-found" element={<NotFound />}></Route>
          <Route
            path="/"
            element={<Navigate to={"/movies"} replace={true} />}
          />
          <Route
            path="/:id"
            element={<Navigate to={"/not-found"} replace={true} />}
          />
        </Routes>
      </main>
    </>
  );
}

export default App;
