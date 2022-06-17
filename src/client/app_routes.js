import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import TopNavigation from "./component/top_navigation";
import Login from "./pages/login";
import Register from "./pages/register";
import Dashboard from "./pages/dashboard";
import EventPage from "./pages/eventpage";
import MyRequests from "./pages/my_requests";
import MyParticipation from "./pages/my_participation";

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <TopNavigation>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/myrequests" element={<MyRequests />} />
          <Route path="/events" element={<EventPage />} />
          <Route path="/myparticipation" element={<MyParticipation />} />
        </Routes>
      </TopNavigation>
    </BrowserRouter>
  );
}
