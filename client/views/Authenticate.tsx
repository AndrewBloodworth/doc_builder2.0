/* eslint-disable no-unused-vars */
import React from "react";
import { ConnectedProps } from "react-redux";
import { connect } from "react-redux";
import { Redirect } from "react-router";
import { UserRole } from "../../server/types";
import { AppThunkDispatch, RootState } from "../redux/store";
import { AuthObject, RoutePath } from "../types";

const connector = connect(
  (state: RootState) => ({}),
  (dispatch: AppThunkDispatch) => ({})
);
interface Props extends ConnectedProps<typeof connector> {
  auth: AuthObject | null;
}
export default connector(({ auth }: Props) => {
  return (
    <Redirect
      to={
        !!!auth
          ? RoutePath.AUTH_LOGIN
          : auth.role === UserRole.ADMIN
          ? RoutePath.DASH_ADMIN
          : auth.role === UserRole.USER
          ? RoutePath.DASH_MAIN
          : RoutePath.HOME
      }
    />
  );
});
