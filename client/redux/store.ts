import { AnyAction } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { createLogger } from "redux-logger";
import thunkMiddleware, { ThunkDispatch } from "redux-thunk";
import rootReducer from "./reducers";
import { Environment } from "../../server/types";

const middleware: any[] = [thunkMiddleware];
if (process.env.NODE_ENV === Environment.DEVELOPMENT) {
  middleware.push(createLogger({ collapsed: true }));
}
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(...middleware),
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>;

export default store;
