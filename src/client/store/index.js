import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import All_Reducer from "../reducers";

const InitialState = {};

const middleware = [thunk];

console.log("NODE_ENV",process.env.NODE_ENV)

const store = createStore(
  All_Reducer,
  InitialState,
  compose(
    applyMiddleware(...middleware),
    process.env.NODE_ENV === "development" &&
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
      window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);
export default store;
