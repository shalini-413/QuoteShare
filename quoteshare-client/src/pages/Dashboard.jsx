import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { createQuote, getQuotes } from "../services/api";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [quote, setQuote] = useState("");
  const [quotes, setQuotes] = useState([]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createQuote({ text: quote });
      setQuote("");
      fetchQuotes();
    } catch (err) {
      alert("Error creating quote");
    }
  };

  const fetchQuotes = async () => {
    try {
      const data = await getQuotes();
      setQuotes(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchQuotes();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 ">Welcome, {user?.name} 👋</h1>

      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          type="text"
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="Write a quote..."
          className="flex-1 border p-2"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Post
        </button>
      </form>

      <div>
        {quotes.map((q) => (
          <div key={q._id} className="border p-4 mb-3 rounded shadow">
            <p className="text-lg">{q.text}</p>
            <p className="text-sm text-gray-500 mt-1">— {q.user?.name}</p>
          </div>
        ))}
      </div>

      <button
        onClick={logout}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
