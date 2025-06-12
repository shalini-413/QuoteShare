import { useState } from "react";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Register form submitted");
    // TODO: Connect to backend
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto">
      <h2 className="text-xl font-bold">Register</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        className="w-full border p-2"
        value={form.name}
        onChange={handleChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        className="w-full border p-2"
        value={form.email}
        onChange={handleChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        className="w-full border p-2"
        value={form.password}
        onChange={handleChange}
        required
      />
      <button type="submit" className="bg-green-600 text-white px-4 py-2">
        Register
      </button>
    </form>
  );
}
