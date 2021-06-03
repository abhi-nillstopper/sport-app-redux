import { LOGGED_IN, LOGOUT } from "../actions/types";

const defaultValueHandler = () => {
  const user = localStorage.getItem("user");

  if (user) {
    return true;
  }
  return false;
};

const InitialState = {
  isLoggedIn: defaultValueHandler(),
};

export default function (state = InitialState, action) {
  switch (action.type) {
    case LOGGED_IN:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    case LOGOUT:
      return {
        ...state,
        isLoggedIn: action.payload,
      };
    default:
      return state;
  }
}
