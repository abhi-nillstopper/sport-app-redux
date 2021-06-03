import { REGISTER_USER } from "./types";
import api from "../service/api";

export const registerUser = (data) => async (dispatch) => {
  try {
    const response = await api.post("/express/user/register", data);
    dispatch({
      type: REGISTER_USER,
      payload: response,
    });
  } catch (error) {
      console.log(error)
  }
};