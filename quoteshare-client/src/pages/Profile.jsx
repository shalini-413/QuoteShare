import React, { useEffect, useState } from "react";
import { getQuotes, deleteQuote } from "../services/api";

export default function Profile() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [myQuotes, setMyQuotes] = useState([]);

  // Fetch and filter user's own quotes
  const fetchMyQuotes = async () => {
    const res = await getQuotes();
    const userId = JSON.parse(localStorage.getItem("user"))?._id;

    const filtered = res.data.filter(
      (q) => q.user === userId || q.user?._id === userId
    );

    setMyQuotes(filtered);
  };

  const handleDelete = async (id) => {
    try {
      await deleteQuote(id); // Axios interceptor adds token
      fetchMyQuotes();       // Refresh after delete
    } catch (err) {
      console.error("Error deleting quote:", err.response?.data || err.message);
    }
  };

  useEffect(() => {
    fetchMyQuotes();
  }, []);

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Your Quotes</h2>
      {myQuotes.length === 0 ? (
        <p>You haven't posted any quotes yet.</p>
      ) : (
        myQuotes.map((q) => (
          <div key={q._id} className="border p-4 mb-3 rounded shadow">
            <p className="text-lg">{q.text}</p>
            <p className="text-sm text-gray-500">❤️ {q.likes.length} Likes</p>
        
            {q.user === user._id || q.user?._id === user._id ? (
              <button
                onClick={() => handleDelete(q._id)}
                className="mt-2 px-2 py-1 text-red-600 border border-red-600 rounded text-sm"
              >
                Delete
              </button>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
}
