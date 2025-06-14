import React, { useState } from "react";
import { registerUser } from "../services/api";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await registerUser(formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response.data.message || "Registration failed");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          name="name"
          onChange={handleChange}
          placeholder="Name"
          className="p-2 border"
        />
        <input
          name="email"
          onChange={handleChange}
          placeholder="Email"
          className="p-2 border"
        />
        <input
          name="password"
          type="password"
          onChange={handleChange}
          placeholder="Password"
          className="p-2 border"
        />
        <button className="bg-blue-600 text-white py-2 rounded">
          Register
        </button>
      </form>
      <p className="mt-4 text-green-600">{message}</p>
    </div>
  );
}
