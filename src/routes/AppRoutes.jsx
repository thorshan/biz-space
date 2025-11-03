import React from "react";
import { Routes, Route } from "react-router-dom";

//
import Home from "../pages/Home";
import Login from "../pages/authentications/Login";
import User from "../pages/user/User";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/admin/users" element={<User />} />
    </Routes>
  );
};

export default AppRoutes;
