import { CREATE_EVENT, SUCCESS } from "./types";
import api from "../service/api";

export const createEvents = (eventData) => async (dispatch) => {
  try {
    await api.post("/express/event", eventData);

    dispatch({
      type: CREATE_EVENT,
      payload: true,
    });
  } catch (error) {
    console.log(error);
    dispatch({
      type: CREATE_EVENT,
      payload: false,
    });
  }
};

export const changeSuccess = (data) => async (dispatch) => {
  dispatch({
    type: SUCCESS,
    payload: data,
  });
};