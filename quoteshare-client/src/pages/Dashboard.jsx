import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  createQuote,
  getQuotes,
  likeQuote,
  deleteQuote,
} from "../services/api"; // 👈 added deleteQuote
import { Link } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [quote, setQuote] = useState("");
  const [quotes, setQuotes] = useState([]);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const res = await getQuotes();
      setQuotes(res.data);
    } catch (err) {
      console.error("Error fetching quotes", err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quote) return;
    await createQuote({ text: quote });
    setQuote("");
    fetchQuotes();
  };

  const handleLike = async (id) => {
    try {
      await likeQuote(id);
      fetchQuotes();
    } catch (err) {
      console.error("Like error:", err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteQuote(id);
      fetchQuotes();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Welcome, {user?.name}</h1>
      <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
        <input
          value={quote}
          onChange={(e) => setQuote(e.target.value)}
          placeholder="Write a quote..."
          className="flex-1 border p-2 rounded"
        />
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          Post
        </button>
      </form>

      {quotes.length === 0 ? (
        <p>No quotes yet.</p>
      ) : (
        quotes.map((q) => (
          <div key={q._id} className="border p-4 mb-3 rounded">
            <p className="text-lg">{q.text}</p>
            <p className="text-sm text-gray-500">— {q.user?.name}</p>
            <div className="flex gap-3 mt-2">
              <button
                onClick={() => handleLike(q._id)}
                className="bg-orange-500 text-white px-3 py-1 rounded"
              >
                ❤️ {q.likes.length}
              </button>

              {(q.user === user._id || q.user?._id === user._id) && (
                <button
                  onClick={() => handleDelete(q._id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              )}
            </div>
          </div>
        ))
      )}

      <Link to="/profile" className="text-blue-600 underline mt-4 block">
        Go to Profile
      </Link>
      <button
        onClick={logout}
        className="mt-6 bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div>
  );
}
