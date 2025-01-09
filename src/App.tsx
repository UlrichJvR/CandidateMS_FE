import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./Pages/LoginPage.tsx";
import Dashboard from "./Pages/DashboardPage.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} /> {/* Login Route */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />{" "}
        {/* Protected Dashboard Route */}
      </Routes>
    </Router>
  );
};

export default App;
