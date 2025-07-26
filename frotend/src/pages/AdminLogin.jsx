import React from "react";

import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [form, setForm] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const login = async (e) => {
    e.preventDefault();
    const res = await axios.post("http://localhost:8000/api/admin/login", form);
    localStorage.setItem("token", res.data.token);
    navigate("/admin/dashboard");
  };

  return (
    <>
    
    <form onSubmit={login} className="max-w-sm mx-auto mt-20 space-y-4">
        <h2 className="text-2xl font-bold text-center mb-4">Admin Login</h2>
      <input required type="text" placeholder="Username"
        onChange={(e) => setForm({ ...form, username: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <input required type="password" placeholder="Password"
        onChange={(e) => setForm({ ...form, password: e.target.value })}
        className="w-full p-2 border rounded"
      />
      <button className="bg-green-600 text-white px-4 py-2 rounded">Login</button>
    </form>
    </>
  );
}
