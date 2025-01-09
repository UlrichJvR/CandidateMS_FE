// components/Login.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login } from "../store/authStore.ts";
import CustomButton from "../components/CustomButton.tsx";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Please fill in both fields");
      return;
    }

    setLoading(true);

    try {
      await login(username, password);
      navigate("/");
    } catch (error) {
      setError("Login failed. Please try again.");
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-500 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-2xl font-extrabold text-center text-blue-900 mb-6">
          Candidate Management System
        </h1>

        <h2 className="text-2xl font-semibold mb-6 text-center text-gray-500">
          Log In
        </h2>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <CustomButton
              loading={loading}
              onClick={handleLogin}
              text="Login"
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
