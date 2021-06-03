import {
  DASHBOARD_GET_EVENTS,
} from "../actions/types";

const InitialState = {
  events: [],
};

export default function (state = InitialState, action) {
  switch (action.type) {
    case DASHBOARD_GET_EVENTS:
      return {
        events: action.payload,
      };
    default:
      return state;
  }
}
