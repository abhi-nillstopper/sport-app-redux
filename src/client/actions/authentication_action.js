import { LOGGED_IN, LOGOUT } from "./types";
import api from "../service/api";

export const loginHandler = () => async (dispatch) => {
  dispatch({
    type: LOGGED_IN,
    payload: true,
  });
};

export const logoutHandler = () => async (dispatch) => {
  dispatch({
    type: LOGOUT,
    payload: false,
  });
};