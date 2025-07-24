// src/pages/Auth/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function Register() {
  const [user, setUser] = useState({ name:"",phone:"",email: "", password: "" });
  const navigate = useNavigate();
  const API = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.post(`${API}/register`, user);
      if (data?.success) {
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "حدث خطأ ما");
    }
  };

  return (
    <div className="h-[90vh] flex items-center justify-center bg-[#f9f7f1]">
      <div className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-red-600">تسجيل الدخول</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
         <input
            type="text"
            name="name"
            placeholder="name"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={user.name}
            onChange={handleChange}
            required
          />
        <input
            type="email"
            name="email"
            placeholder="البريد الإلكتروني"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={user.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="كلمة المرور"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={user.password}
            onChange={handleChange}
            required
          />
           <input
            type="number"
            name="phone"
            placeholder="phone"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500"
            value={user.phone}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="w-full bg-red-600 text-white py-2 rounded-md hover:bg-red-700 transition"
          >
            دخول
          </button>
        </form>
        <p className="text-center mt-4 text-gray-600">
          ليس لديك حساب؟{" "}
          <Link to="/register" className="text-red-600 hover:underline">
            سجل الآن
          </Link>
        </p>
      </div>
    </div>
  );
}
