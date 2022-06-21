import {
  DASHBOARD_GET_EVENTS,
} from "../actions/types";

const InitialState = {
  events: [],
  eventsLoaded: false,
};

export default function (state = InitialState, action) {
  switch (action.type) {
    case DASHBOARD_GET_EVENTS:
      return {
        ...state,
        events: action.payload,
        eventsLoaded: true,
      };
    default:
      return state;
  }
}
