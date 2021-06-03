import { CREATE_EVENT, SUCCESS } from "../actions/types";

const InitialState = {
  success: false,
};

export default function (state = InitialState, action) {
  switch (action.type) {
    case CREATE_EVENT:
      return {
        success: action.payload,
      };
    case SUCCESS:
      return {
        success: action.payload,
      };
    default:
      return state;
  }
}
