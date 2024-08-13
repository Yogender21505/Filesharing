import React from "react";
import { useRoutes, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "../context/authContext"; // Import Auth Context
import DashBoard from "../pages/dashboard/DashBoard";
import LoginPage from "../pages/LoginPage/LoginPage";
import PrivateRoute from "./PrivateRoute"; // Import PrivateRoute

export const DEFAULT_PATH = "/dashboard"; // Adjust as necessary

export default function Router() {
  const { currentUser } = useAuth();

  return useRoutes([
    {
      path: "/",
      element: currentUser ? <Navigate to="/dashboard" replace /> : <LoginPage />,
    },
    {
      path: "/dashboard",
      element: (
        <PrivateRoute>
          <DashBoard />
        </PrivateRoute>
      ),
    },
    { path: "*", element: <Navigate to="/" replace /> }, // Fallback route for undefined paths
  ]);
}
