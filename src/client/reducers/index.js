import { combineReducers } from "redux";
import dashboardReducer from "./dashboard_reducer";
import authenticationReducer from "./authentication_reducer";
import registerReducer from "./register_reducer";
import eventReducer from "./event_reducer";

export default combineReducers({
  dashboard: dashboardReducer,
  authentication: authenticationReducer,
  register: registerReducer,
  event: eventReducer,
});
