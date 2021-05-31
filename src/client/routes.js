import React from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import TopNavigation from "./component/top_navigation";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import EventPage from "./pages/eventpage";
import MyRequests from "./pages/my_requests"
import MyParticipation from "./pages/my_participation"

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <TopNavigation>
          <Route path="/" exact component={Dashboard} />
          <Route path="/login" exact component={Login} />
          <Route path="/register" exact component={Register} />
          <Route path="/myrequests" exact component={MyRequests} />
          <Route path="/events" component={EventPage} />
          <Route path="/myparticipation" component={MyParticipation} />
        </TopNavigation>
      </Switch>
    </BrowserRouter>
  );
}
