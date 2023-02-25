import { combineReducers } from "redux";

import auth from "./auth";
import contract from "./contract";

export default combineReducers({
  auth,
  contract,
});
