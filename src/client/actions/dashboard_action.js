import { DASHBOARD_DELETE_EVENTS, DASHBOARD_GET_EVENTS } from "./types";
import api from "../service/api";

export const fetchEvents = (filter) => async (dispatch) => {
  try {
    const url = filter
      ? filter === "myevents"
        ? `/express/user/events`
        : `/express/dashboard/${filter}`
      : "/express/dashboard";
    const response = await api.get(url);
    dispatch({
      type: DASHBOARD_GET_EVENTS,
      payload: response.data.events,
    });
  } catch (error) {
    console.log(error);
  }
};