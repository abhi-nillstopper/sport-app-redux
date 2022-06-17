import React from "react";
// import { useNavigate } from "react-router";

// export const withRouter = (Component) => {
//   const Wrapper = (props) => {
//     const navigate = useNavigate();
//     return <Component navigate={navigate} {...props} />;
//   };
//   return Wrapper;
// };

import {
  useLocation,
  useNavigate,
  useParams
} from "react-router-dom";

export const withRouter = ComponentWithRouter => props => {
  const location = useLocation();
  const match = { params: useParams() };
  const navigate = useNavigate();
  const history = {
    back: () => navigate(-1),
    goBack: () => navigate(-1),
    location,
    push: (url, state) => navigate(url, { state }),
    replace: (url, state) => navigate(url, { replace: true, state }),
  };
  return (
    <ComponentWithRouter
      location={location}
      match={match}
      navigate={navigate}
      history={history}
      {...props}
    />
  );
};

export default withRouter;
