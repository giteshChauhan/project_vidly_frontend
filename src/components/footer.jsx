import { Link } from "react-router-dom";
import logo from "../icons/PVBW150.png";

const Footer = () => {
  return (
    <footer className="bd-footer py-4 py-md-5 mt-5 bg-light">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 mb-3">
            <Link
              className="d-inline-flex align-items-center mb-2 link-dark text-decoration-none"
              to={"/"}
            >
              <img src={logo} alt="VIDLY" />
            </Link>
            <ul className="list-unstyled small text-muted">
              <li className="mb-3">
                Currently <i>Beta</i> Version
              </li>
              <li className="mb-2">
                &copy;{" "}
                <a
                  href="https://www.linkedin.com/in/giteshchauhan20/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="a-design myFont"
                >
                  giteshChauhan
                </a>{" "}
                2022
              </li>
            </ul>
          </div>
          <div className="col-6 col-lg-2 offset-lg-1 mb-3">
            <h5>Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to={"/"} className="a-design">
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <a href="/" className="a-design">
                  About
                </a>
              </li>
              <li className="mb-2">
                <Link to="/movies" className="a-design">
                  Movies
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-6 col-lg-2 mb-3">
            <h5>Guides</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <a href="/" className="a-design">
                  Getting started
                </a>
              </li>
              <li className="mb-2">
                <a href="/" className="a-design">
                  Admin Tour
                </a>
              </li>
            </ul>
          </div>
          <div className="col-6 col-lg-2 mb-3">
            <h5>Projects</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <span className="a-design">Coming soon...</span>
              </li>
            </ul>
          </div>
          <div className="col-6 col-lg-2 mb-3">
            <h5>Community</h5>
            <ul className="list-unstyled">
              <li className="nav-item col-6 col-lg-auto">
                <a
                  className="nav-link py-2 px-0 px-lg-2 a-design"
                  href="https://github.com/giteshChauhan/project_vidly"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="navbar-nav-svg"
                    viewBox="0 0 512 499.36"
                    role="img"
                  >
                    <title>project_vidly</title>
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z"
                    ></path>
                  </svg>
                  BackEnd
                </a>
              </li>
              <li className="nav-item col-6 col-lg-auto">
                <a
                  className="nav-link py-2 px-0 px-lg-2 a-design"
                  href="https://github.com/giteshChauhan/project_vidly_frontend"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    className="navbar-nav-svg"
                    viewBox="0 0 512 499.36"
                    role="img"
                  >
                    <title>project_vidly_frontend</title>
                    <path
                      fill="currentColor"
                      fillRule="evenodd"
                      d="M256 0C114.64 0 0 114.61 0 256c0 113.09 73.34 209 175.08 242.9 12.8 2.35 17.47-5.56 17.47-12.34 0-6.08-.22-22.18-.35-43.54-71.2 15.49-86.2-34.34-86.2-34.34-11.64-29.57-28.42-37.45-28.42-37.45-23.27-15.84 1.73-15.55 1.73-15.55 25.69 1.81 39.21 26.38 39.21 26.38 22.84 39.12 59.92 27.82 74.5 21.27 2.33-16.54 8.94-27.82 16.25-34.22-56.84-6.43-116.6-28.43-116.6-126.49 0-27.95 10-50.8 26.35-68.69-2.63-6.48-11.42-32.5 2.51-67.75 0 0 21.49-6.88 70.4 26.24a242.65 242.65 0 0 1 128.18 0c48.87-33.13 70.33-26.24 70.33-26.24 14 35.25 5.18 61.27 2.55 67.75 16.41 17.9 26.31 40.75 26.31 68.69 0 98.35-59.85 120-116.88 126.32 9.19 7.9 17.38 23.53 17.38 47.41 0 34.22-.31 61.83-.31 70.23 0 6.85 4.61 14.81 17.6 12.31C438.72 464.97 512 369.08 512 256.02 512 114.62 397.37 0 256 0z"
                    ></path>
                  </svg>
                  FrontEnd
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
