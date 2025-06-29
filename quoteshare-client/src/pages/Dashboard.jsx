import React, { useEffect, useState } from "react";
import toast from "react-hot-toast"; // <-- import toast
import { useNavigate, Link } from "react-router-dom";
import {
  createQuote,
  getQuotes,
  likeQuote,
  deleteQuote,
} from "../services/api";

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
      toast.error("Failed to fetch quotes");
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!quote) {
      toast.error("Please write a quote before posting!");
      return;
    }
    try {
      await createQuote({ text: quote });
      setQuote("");
      fetchQuotes();
      toast.success("Quote posted successfully!");
    } catch (err) {
      toast.error("Failed to post quote. Try again.");
      console.error(err);
    }
  };

  const handleLike = async (id) => {
    try {
      await likeQuote(id);
      fetchQuotes();
    } catch (err) {
      toast.error("Could not like the quote. Please try again.");
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteQuote(id);
      fetchQuotes();
      toast.success("Quote deleted 🗑️");
    } catch (err) {
      toast.error("Failed to delete quote.");
      console.error(err);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-100 via-purple-100 to-blue-100 px-4 py-10 transition-all duration-300">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-extrabold text-purple-800">
            🌸 Welcome, {user?.name}
          </h1>
          <button
            onClick={logout}
            className="bg-red-400 hover:bg-red-500 text-white px-5 py-2 rounded-full shadow-md transition-all hover:scale-105 text-sm"
          >
            🚪 Logout
          </button>
        </div>

        {/* Post a Quote */}
        <form
          onSubmit={handleSubmit}
          className="mb-10 bg-white shadow-lg border border-gray-300 rounded-3xl p-6 hover:shadow-xl transition"
        >
          <textarea
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            placeholder="💭 Share a beautiful thought with the world..."
            rows={4}
            className="w-full p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-400 bg-gray-50 text-gray-800 placeholder-gray-500 resize-none mb-4"
          />
          <button
            type="submit"
            className="bg-gradient-to-r from-pink-400 to-purple-500 text-white px-6 py-3 rounded-full shadow hover:scale-105 transition-transform font-semibold text-sm"
          >
            ✨ Post Quote
          </button>
        </form>

        {/* Quote Feed in Styled Cards */}
        {quotes.length === 0 ? (
          <p className="text-center text-gray-600 text-lg">No quotes yet.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {quotes.map((q, index) => {
              const themes = [
                "from-pink-100 via-pink-50 to-white",
                "from-purple-100 via-violet-50 to-white",
                "from-yellow-100 via-amber-50 to-white",
                "from-sky-100 via-cyan-50 to-white",
              ];
              const bgClass = themes[index % themes.length];

              return (
                <div
                  key={q._id}
                  className={`rounded-2xl p-6 shadow-lg transform hover:scale-[1.03] hover:shadow-2xl transition-all duration-300 bg-gradient-to-br ${bgClass} border border-gray-200`}
                >
                  <div className="relative pl-4 text-gray-700 font-medium italic text-lg leading-relaxed">
                    <span className="text-4xl font-serif text-purple-400 absolute -left-4 top-0">“</span>
                    {q.text}
                  </div>

                  <div className="mt-6 flex items-center justify-between">
                    <p className="text-sm text-right text-gray-500 italic">
                      — {q.user?.name}
                    </p>

                    <div className="flex items-center gap-3">
                      <button
                        onClick={() => handleLike(q._id)}
                        className="px-3 py-1 text-pink-600 border border-pink-300 rounded-full hover:bg-pink-100 hover:scale-105 transition flex items-center gap-1 text-sm"
                      >
                        ❤️ {q.likes.length}
                      </button>

                      {(q.user === user._id || q.user?._id === user._id) && (
                        <button
                          onClick={() => handleDelete(q._id)}
                          className="px-3 py-1 border border-red-400 text-red-500 rounded-full hover:bg-red-100 hover:scale-105 transition text-sm"
                        >
                          🗑️
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Profile Link */}
        <Link
          to="/profile"
          className="block text-center mt-10 text-purple-700 underline hover:text-purple-900 font-medium"
        >
          🧾 View Your Profile →
        </Link>
      </div>
    </div>
  ); 

  
}
