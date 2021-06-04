import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import All_Reducer from "../reducers";

const InitialState = {};

const middleware = [thunk];

console.log("NODE_ENV", process.env.NODE_ENV);

const store = createStore(
  All_Reducer,
  InitialState,
  compose(
    applyMiddleware(...middleware),
    typeof window.__REDUX_DEVTOOLS_EXTENSION__ === "undefined"
      ? (a) => a
      : window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
