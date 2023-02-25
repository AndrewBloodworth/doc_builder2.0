import React from "react";
import { ConnectedProps } from "react-redux";
import { connect } from "react-redux";
import { Link, RouteComponentProps } from "react-router-dom";
import { AppThunkDispatch, RootState } from "../redux/store";
import { MatchParams, RoutePath } from "../types";
const connector = connect(
  (state: RootState) => {
    const { auth } = state.auth;
    const isLoggedIn = !!auth.id;
    return {
      isLoggedIn,
    };
  },
  (dispatch: AppThunkDispatch) => ({})
);
interface Props
  extends RouteComponentProps<MatchParams>,
    ConnectedProps<typeof connector> {}
export default connector(({ isLoggedIn, location }: Props) => {
  return (
    <nav className="navbar navbar-expand-lg position-absolute top-0 z-index-3 w-100 shadow-none my-3  navbar-transparent mt-4">
      <div className="container">
        <Link
          className="navbar-brand font-weight-bolder ms-lg-0 ms-3 text-white"
          to={RoutePath.HOME}
        >
          Kollektor
        </Link>
        <button
          className="navbar-toggler shadow-none ms-2"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navigation"
          aria-controls="navigation"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon mt-2">
            <span className="navbar-toggler-bar bar1"></span>
            <span className="navbar-toggler-bar bar2"></span>
            <span className="navbar-toggler-bar bar3"></span>
          </span>
        </button>
        <div
          className="collapse navbar-collapse w-100 pt-3 pb-2 py-lg-0"
          id="navigation"
        >
          <ul className="navbar-nav navbar-nav-hover mx-auto">
            <li className="nav-item dropdown dropdown-hover mx-2">
              {location.pathname !== RoutePath.AUTH_LOGIN && (
                <Link
                  className="nav-link ps-2 d-flex justify-content-between cursor-pointer align-items-center "
                  to="/authenticate/login"
                >
                  {isLoggedIn ? "Dashboard" : "Login"}
                </Link>
              )}
            </li>
          </ul>
          <ul className="navbar-nav d-lg-block d-none">
            <li className="nav-item">
              {location.pathname !== RoutePath.AUTH_LOGIN && (
                <Link
                  className="btn btn-sm  bg-gradient-primary  btn-round mb-0 me-1"
                  to="/authenticate/login"
                >
                  {isLoggedIn ? "Dashboard" : "Login"}
                </Link>
              )}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
});
