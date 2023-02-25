/* eslint-disable no-unused-vars */
import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { reset } from "../redux/reducers/auth";
import { clearCompany } from "../redux/reducers/company";

const Nav = ({ name, isAdmin, isLoggedIn, logout, resetCompany }) => {
  return (
    <nav
      className="navbar fixed-top navbar-expand-lg"
      style={{ backgroundColor: "#E5EAFA" }}
    >
      <div className="container-fluid" style={{ height: 40 }}>
        <Link className="navbar-brand" to="/" onClick={resetCompany}>
          Kollektor
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="d-flex flex-end"
          id="navbarSupportedContent"
          style={{ paddingLeft: 250 }}
        >
          {isLoggedIn ? (
            <div className="d-flex" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link dropdown-toggle"
                    href="#"
                    id="navbarDropdown"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{ color: "#101418" }}
                  >
                    {`Account`}
                  </a>
                  <ul
                    className="dropdown-menu dropdown-menu-end dropdown-menu-dark"
                    aria-labelledby="navbarDropdown"
                    style={{ marginTop: 8, backgroundColor: "#101418" }}
                  >
                    {/* <li>
                      <Link
                        className="dropdown-item"
                        to="/account"
                        style={{ color: "#E5EAFA" }}
                      >
                        My Account
                      </Link>
                    </li> */}
                    {isAdmin ? (
                      <li>
                        <Link
                          className="dropdown-item"
                          style={{ color: "#E5EAFA" }}
                          to="/admin/dashboard"
                        >
                          Admin Dashboard
                        </Link>
                      </li>
                    ) : (
                      <li>
                        <Link
                          className="dropdown-item"
                          style={{ color: "#E5EAFA" }}
                          to="/dashboard"
                        >
                          My Dashboard
                        </Link>
                      </li>
                    )}
                    <li>
                      <Link
                        className="dropdown-item"
                        style={{ color: "#E5EAFA" }}
                        to="/account"
                      >
                        Account
                      </Link>
                    </li>
                    <li>
                      <hr
                        className="dropdown-divider"
                        style={{ color: "#E5EAFA" }}
                      />
                    </li>
                    <li>
                      <a
                        className="dropdown-item"
                        href="/"
                        onClick={logout}
                        style={{ color: "#E5EAFA" }}
                      >
                        Logout
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </div>
          ) : (
            <div className="d-flex" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item dropdown">
                  <Link className="dropdown-item" to="/authenticate/login">
                    Login
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

const mapState = (state) => {
  const { auth } = state.auth;
  const isAdmin = auth.role === "Admin";
  const isLoggedIn = !!auth.id;
  const firstName = auth.firstName;
  const name = firstName
    ? firstName.substring(0, 1).toUpperCase() + firstName.substring(1)
    : "";
  return {
    isLoggedIn,
    name,
    isAdmin,
  };
};
const mapDispatch = (dispatch) => {
  return {
    resetCompany() {
      dispatch(clearCompany());
    },
    logout() {
      dispatch(reset());
    },
  };
};

export default connect(mapState, mapDispatch)(Nav);
