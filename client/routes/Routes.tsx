/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { Route, RouteComponentProps, Switch } from "react-router-dom";
import { connect, ConnectedProps } from "react-redux";
import { me } from "../redux/reducers/auth";

import Portal from "../interface/Portal";
// import AuthForm from "../views/AuthForm";
// import FourOhFour from "../views/FourOhFour";
// import Home from "../views/Home";
import Authenticate from "../views/Authenticate";
// import AdminDashboard from "../views/AdminDashboard";
// import QuestionForm from "../views/QuestionForm";
// import Privacy from "../views/Privacy";
// import Terms from "../views/Terms";
// import OptOut from "../views/OptOut";
// import Dashboard from "../views/Dashboard";
// import AdminUsersDashboard from "../views/AdminUsersDashboard";
// import RegisterInvite from "../views/RegisterInvite";
// import Account from "../views/Account";
// import RequestForgotPassword from "../views/RequestForgotPassword";
// import ForgotPassword from "../views/ForgotPassword";
// import Signin from "../views/authentication/Signin";
// import MainDashboard from "../views/dashboards/MainDashboard";
import { AppThunkDispatch, RootState } from "../redux/store";
import { ConnectedComponent } from "react-redux";
import { CustomRouteComponentProps, RoutePath } from "../types";
// import RegisterInvite from "../views/pages/RegisterInvite";

const connector = connect(
  (state: RootState) => {
    const { auth, preCheck } = state.auth;
    const isLoggedIn = !!auth.id;
    return {
      isLoggedIn,
      auth,
      preCheck,
    };
  },
  (dispatch: AppThunkDispatch) => {
    return {
      getMe() {
        dispatch(me());
      },
    };
  }
);
interface Props extends ConnectedProps<typeof connector> {}
export default connector(({ getMe, isLoggedIn, preCheck, auth }: Props) => {
  useEffect(() => {
    if (!isLoggedIn) {
      getMe();
    }
  }, [isLoggedIn]);

  const renderer = (
    Component: ConnectedComponent<any, any>,
    props: CustomRouteComponentProps
  ) => <Portal {...{ Component, props, preCheck, auth }} />;

  const applyProps = (props: CustomRouteComponentProps, types: string) => {
    for (const type of types.split(",")) {
      switch (type) {
        case "nav": {
          props.hasNav = true;
          break;
        }
        case "footer": {
          props.hasFooter = true;
          break;
        }
        default:
          break;
      }
    }

    return props;
  };
  return (
    <>
      {isLoggedIn ? (
        <Switch>
          <Route
            exact
            path={RoutePath.AUTH_WILDCARD}
            render={(props) => renderer(Authenticate, props)}
          />
          <Route
            exact
            path={RoutePath.INVITE_WILDCARD}
            render={(props) => renderer(Authenticate, props)}
          />
          {/* <Route
            exact
            path={RoutePath.HOME}
            render={(props) => renderer(Home, applyProps(props, "nav,footer"))}
          /> */}

          {/* <Route
            exact
            path={RoutePath.ACCOUNT}
            render={(props) => renderer(Account, props)}
          />
          <Route
            exact
            path="/admin/dashboard"
            render={(props) => renderer(AdminUsersDashboard, props)}
          />
          <Route
            exact
            path="/admin/dashboard/companies"
            render={(props) => renderer(AdminDashboard, props)}
          /> */}
          {/* <Route
            exact
            path="/dashboard"
            render={(props) => renderer(Dashboard, props)}
          /> */}
          {/* <Route
            path={RoutePath.DASH_MAIN}
            render={(props) => renderer(MainDashboard, props)}
          /> */}

          {/* <Route
            exact
            path="/dashboard/company/:companyId"
            render={(props) => renderer(CompanyDashboard, props)}
          /> */}
          {/* <Route
            exact
            path="/forms/:companyId"
            render={(props) => renderer(QuestionForm, props)}
          />
          <Route
            exact
            path="/termsandconditions"
            render={(props) => renderer(Terms, props)}
          />
          <Route
            exact
            path="/privacypolicy"
            render={(props) => renderer(Privacy, props)}
          />
          <Route
            exact
            path="/opt-out"
            render={(props) => renderer(OptOut, props)}
          /> */}
          {/* <Route
            exact
            path="/:any"
            render={(props) => renderer(FourOhFour, props)}
          /> */}
        </Switch>
      ) : (
        <Switch>
          {/* <Route
            exact
            path="/authenticate/login"
            render={(props) => renderer(AuthForm, props)}
          /> */}
          {/* <Route
            exact
            path="/maindash"
            render={(props) => renderer(MainDashboard, props)}
          /> */}
          {/* <Route
            exact
            path={RoutePath.AUTH_LOGIN}
            render={(props) =>
              renderer(Signin, applyProps(props, "nav,footer"))
            }
          />
          <Route
            exact
            path={RoutePath.INVITE_REGISTER}
            render={(props) =>
              renderer(RegisterInvite, applyProps(props, "footer"))
            }
          /> */}
          {/*
          <Route
            exact
            path="/authenticate/forgot-password"
            component={RequestForgotPassword}
          />
          <Route
            exact
            path="/authenticate/forgot-password/:accessToken"
            component={ForgotPassword}
          />
          <Route
            exact
            path="/termsandconditions"
            render={(props) => renderer(Terms, props)}
          />
          <Route
            exact
            path="/privacypolicy"
            render={(props) => renderer(Privacy, props)}
          />
          <Route
            exact
            path="/opt-out"
            render={(props) => renderer(OptOut, props)}
          />
          <Route
            exact
            path="/forms/:companyId"
            render={(props) => renderer(QuestionForm, props)}
          /> */}
          {/* <Route
            exact
            path={RoutePath.HOME}
            render={(props) => renderer(Home, applyProps(props, "nav,footer"))}
          /> */}
          <Route
            exact
            path={RoutePath.UNAUTHORIZED_WILDCARD}
            render={(props) => renderer(Authenticate, props)}
          />
        </Switch>
      )}
    </>
  );
});
