/* eslint-disable no-unused-vars */
import React, { useEffect } from "react";
import { connect, ConnectedComponent } from "react-redux";
import Loading from "../views/Loading";
import NavBar from "./Navbar";
import Footer from "./Footer";
import { AppThunkDispatch, RootState } from "../redux/store";
import { ConnectedProps } from "react-redux";
import { AuthObject, CustomRouteComponentProps } from "../types";

const connector = connect(
  (state: RootState) => ({}),
  (dispatch: AppThunkDispatch) => ({})
);
interface Props extends ConnectedProps<typeof connector> {
  Component: ConnectedComponent<any, any>;
  props: CustomRouteComponentProps;
  auth: AuthObject;
  preCheck: boolean;
}
export default connector(({ Component, props, auth, preCheck }: Props) => {
  return (
    <>
      {props.hasNav && <NavBar {...props} />}
      <main>
        {!preCheck ? (
          <Loading />
        ) : !auth.id ? (
          <Component auth={null} {...props} />
        ) : (
          <Component auth={auth} {...props} />
        )}
      </main>
      {props.hasFooter && <Footer />}
    </>
  );
});
