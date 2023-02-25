/* eslint-disable no-unused-vars */
import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { AppThunkDispatch, RootState } from "../redux/store";

const connector = connect(
  (state: RootState) => ({}),
  (dispatch: AppThunkDispatch) => ({})
);
interface Props extends ConnectedProps<typeof connector> {}
export default connector(({}: Props) => {
  return (
    <div
      className="container-fluid"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
      }}
    >
      <div className="spinner-grow text-dark" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
});
