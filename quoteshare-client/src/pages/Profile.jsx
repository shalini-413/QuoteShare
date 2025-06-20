import React, { useEffect, useState } from "react";
import { getQuotes } from "../services/api";

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
          <div key={q._id} className="border p-4 mb-3 rounded">
            <p>{q.text}</p>
            <p className="text-sm text-gray-500">❤️ {q.likes.length} Likes</p>
          </div>
        ))
      )}
    </div>
  );
}
