import React, { useState } from "react";
import { loginUser } from "../services/api";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const [token, setToken] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(formData);
      setMessage("✅ " + res.data.message);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token); // Save token for future use
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Login failed"));
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="p-2 border rounded"
          onChange={handleChange}
          value={formData.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="p-2 border rounded"
          onChange={handleChange}
          value={formData.password}
        />
        <button className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
          Login
        </button>
      </form>
      {message && (
        <p className="mt-4 text-sm text-center text-green-600">{message}</p>
      )}
      {token && (
        <div className="mt-2 text-xs break-words text-gray-500 text-center">
          Token saved to localStorage
        </div>
      )}
    </div>
  );
}
