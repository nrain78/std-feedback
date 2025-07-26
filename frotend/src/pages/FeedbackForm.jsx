import React from "react";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function FeedbackForm() {
  const [form, setForm] = useState({ name: "", email: "", course: "", rating: "", comments: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8000/api/feedback", form);
    navigate("/thankyou");
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto mt-10 space-y-4">
      {["name", "email", "course", "rating", "comments"].map((f) => (
        <input key={f} required type="text" name={f}
          placeholder={f.charAt(0).toUpperCase() + f.slice(1)}
          value={form[f]} onChange={(e) => setForm({ ...form, [f]: e.target.value })}
          className="w-full p-2 border rounded"
        />
      ))}
      <button className="bg-blue-600 text-white px-4 py-2 rounded" type="submit">Submit</button>
    </form>
  );
}
