import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminDashboard() {
  const [feedbacks, setFeedbacks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/admin/login");
      return;
    }

    const fetchFeedbacks = async () => {
      try {
        const res = await axios.get("https://std-feedback.vercel.app/api/feedback", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setFeedbacks(res.data);
      } catch (err) {
        console.error("Error fetching feedbacks:", err);
        navigate("/admin/login");
      }
    };

    fetchFeedbacks();
  }, [navigate]);

  const logoutHandler = () => {
    localStorage.removeItem("token");
    navigate("/admin/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">Admin Dashboard</h1>
        <button
          onClick={logoutHandler}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded shadow"
        >
          Logout
        </button>
      </div>

      <div className="bg-white shadow-lg rounded-lg p-4 overflow-x-auto">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Student Feedbacks</h2>

        <table className="w-full text-sm text-left text-gray-600">
          <thead className="text-xs uppercase bg-gray-200 text-gray-700">
            <tr>
              <th className="px-4 py-2">Name</th>
              <th className="px-4 py-2">Email</th>
              <th className="px-4 py-2">Course</th>
              <th className="px-4 py-2">Rating</th>
              <th className="px-4 py-2">Comments</th>
              <th className="px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {feedbacks.map((fb, i) => (
              <tr key={i} className="hover:bg-gray-50 border-b">
                <td className="px-4 py-2">{fb.name}</td>
                <td className="px-4 py-2">{fb.email}</td>
                <td className="px-4 py-2">{fb.course}</td>
                <td className="px-4 py-2">{fb.rating}</td>
                <td className="px-4 py-2">{fb.comments}</td>
                <td className="px-4 py-2">{new Date(fb.createdAt).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {feedbacks.length === 0 && (
          <div className="text-center py-10 text-gray-500">No feedbacks submitted yet.</div>
        )}
      </div>
    </div>
  );
}
