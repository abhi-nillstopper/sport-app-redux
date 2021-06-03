import { REGISTER_USER } from "../actions/types";

const InitialState = {
  response: {},
};

export default function (state = InitialState, action) {
  switch (action.type) {
    case REGISTER_USER:
      return {
        ...state,
        response: action.payload,
      };
    default:
      return state;
  }
}
