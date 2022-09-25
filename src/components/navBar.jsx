import { Link } from "react-router-dom";

import profileLogo from "../icons/profile.png";
import title from "../icons/PV_title.png";
import logo from "../icons/PV.png";

function Navbar({ user, watchLaterSize }) {
  const handleUser = () => {
    if (user)
      return [
        { path: "/profile", title: user.name },
        { path: "/logout", title: "Logout" },
      ];
    else
      return [
        { path: "/register", title: "Register" },
        { path: "/login", title: "Login" },
      ];
  };

  return (
    <>
      <header
        className="navbar navbar-expand-lg navbar-dark bd-navbar sticky-top mb-5"
        style={{ backgroundColor: "#6e00ff" }}
      >
        <nav
          className="container-xxl bd-gutter flex-wrap flex-lg-nowrap"
          aria-label="Main navigation"
        >
          <button
            className="navbar-toggler p-2"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#bdNavbar"
            aria-controls="bdNavbar"
            aria-label="Toggle navigation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              className="bi"
              fill="currentColor"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 11.5A.5.5 0 0 1 3 11h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 7h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4A.5.5 0 0 1 3 3h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              ></path>
            </svg>
            {user && watchLaterSize !== 0 ? (
              <span
                className="position-absolute top-0 p-1 bg-danger border border-light rounded-circle"
                style={{ transform: "translate(-9px,18px)" }}
              />
            ) : (
              <></>
            )}
          </button>

          <Link
            className="navbar-brand p-0 me-0 me-lg-2"
            to={"/"}
            aria-label="Vidly"
          >
            <img height="32" className="d-block my-1" src={logo} alt="VIDLY" />
          </Link>

          <div
            className="offcanvas-lg offcanvas-start flex-grow-1"
            tabIndex="-1"
            id="bdNavbar"
            aria-labelledby="bdNavbarOffcanvasLabel"
            data-bs-scroll="true"
          >
            <div
              className="offcanvas-header px-4 pb-0"
              style={{ backgroundColor: "#6e00ff" }}
            >
              <img
                className="offcanvas-title text-white"
                id="bdNavbarOffcanvasLabel"
                alt="VIDLY"
                height="32px"
                src={title}
              />
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="offcanvas"
                aria-label="Close"
                data-bs-target="#bdNavbar"
              ></button>
            </div>

            <div
              className="offcanvas-body p-4 pt-0 p-lg-0"
              style={{ backgroundColor: "#6e00ff" }}
            >
              <hr
                className="d-lg-none text-white-50"
                style={{ height: "2px", backgroundColor: "white" }}
              />
              <div className="navbar-nav flex-row flex-wrap bd-navbar-nav">
                <div className="nav-item col-6 col-lg-auto">
                  <Link to={"/"} className="nav-link">
                    Movies
                  </Link>
                </div>
              </div>

              {user && user.isAdmin && (
                <>
                  <hr
                    className="d-lg-none text-white-50"
                    style={{ height: "1px", backgroundColor: "white" }}
                  />

                  <div className="navbar-nav flex-row flex-wrap bd-navbar-nav">
                    <div className="nav-item col-6 col-lg-auto">
                      <Link to={"/customers"} className="nav-link">
                        Customers
                      </Link>
                    </div>
                  </div>
                </>
              )}

              <hr
                className="d-lg-none text-white-50"
                style={{ height: "1px", backgroundColor: "white" }}
              />

              <div className="navbar-nav flex-row flex-wrap bd-navbar-nav">
                <div className="nav-item col-6 col-lg-auto">
                  <Link
                    to={"/watchlater"}
                    className="nav-link position-absolute"
                  >
                    WatchLater
                    {user && (
                      <span
                        className="position-absolute top-0 start-100 badge rounded-pill"
                        id="watchlater-badge"
                      >
                        {watchLaterSize}
                      </span>
                    )}
                  </Link>
                </div>
              </div>

              <hr
                className="d-lg-none text-white-50"
                style={{
                  height: "1px",
                  backgroundColor: "white",
                  marginTop: "55px",
                }}
              />

              <div className="navbar-nav flex-row flex-wrap bd-navbar-nav">
                <div className="nav-item col-6 col-lg-auto">
                  <Link
                    to={"/history"}
                    className="nav-link"
                    id="history-nav-link"
                  >
                    History
                  </Link>
                </div>
              </div>

              <hr className="d-lg-none text-white-50" />
            </div>
          </div>

          <ul
            className="navbar-nav flex-row flex-wrap ms-md-auto"
            id="bdSidebar"
          >
            <li className="nav-item col-6 col-lg-auto">
              <Link
                className="nav-link py-2 px-0 px-lg-2 myBtn"
                to={handleUser()[0].path}
                rel="noopener noreferrer"
              >
                {handleUser()[0].title}
              </Link>
            </li>
            <li className="nav-item py-1 col-12 col-lg-auto">
              <div
                className="vr d-none d-lg-flex h-100 mx-lg-2 text-white"
                style={{ width: "2px" }}
              ></div>
              <hr className="d-lg-none text-white" />
            </li>
            <li className="nav-item col-6 col-lg-auto">
              <Link
                className="nav-link py-2 px-0 px-lg-2 myBtn"
                to={handleUser()[1].path}
                rel="noopener noreferrer"
              >
                {handleUser()[1].title}
              </Link>
            </li>
          </ul>

          <div className="dropdown" id="dropdownProfile">
            <img
              src={profileLogo}
              height="32px"
              type="button"
              data-bs-toggle="dropdown"
              alt="Me"
            />
            <ul className="dropdown-menu myModal">
              <li>
                <Link
                  className="dropdown-item"
                  to={handleUser()[0].path}
                  style={{ color: "white" }}
                >
                  {handleUser()[0].title}
                </Link>
              </li>
              <li>
                <hr
                  className="dropdown-divider text-white-50"
                  style={{ backgroundColor: "#6e00ff" }}
                />
              </li>
              <li>
                <Link
                  className="dropdown-item"
                  to={handleUser()[1].path}
                  style={{ color: "white" }}
                >
                  {handleUser()[1].title}
                </Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>
    </>
  );
}

export default Navbar;
