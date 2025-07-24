// src/pages/Auth/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUserRedux } from "../../Redux/user.js";

export default function Login() {
  const [user, setUser] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const API = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API}/login`, user);
      if (res.data?.success) {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user.id);
        const dataUser = res.data.user;
        dispatch(setUserRedux(dataUser));
        localStorage.setItem("user", JSON.stringify(dataUser));
        navigate("/");
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
