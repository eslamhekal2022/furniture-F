import React, { useEffect, useState } from 'react';
import { useUser } from '../../context/userContext.jsx';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function UpdateRole() {
  const { id } = useParams();
  const { getAllUser, setRefresh } = useUser();
  const [user, setUser] = useState({});
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getUser();
  }, []);

  async function getUser() {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/userDet/${id}`);
      const data = await res.json();
      if (data.success) {
        setUser(data.user);
        setRole(data.user.role);
      } else {
        toast.error('فشل في جلب بيانات المستخدم');
      }
    } catch (err) {
      toast.error('خطأ في الاتصال بالسيرفر');
    }
  }

async function handleUpdateRole(e) {
  e.preventDefault();
  try {
    const { data } = await axios.put(
      `${import.meta.env.VITE_API_URL}/update-role/${id}`,
      { role }, 
      {
        headers: { 'Content-Type': 'application/json' },
      }
    );

    if (data.success) {
      toast.success('تم تحديث الدور بنجاح');

      // لو المستخدم الحالي هو اللي بيتعدل
      const storedUser = localStorage.getItem('user');
      const currentUser = storedUser ? JSON.parse(storedUser) : null;
      if (currentUser?._id === id) {
        const updatedUser = await axios.get(`${import.meta.env.VITE_API_URL}/getuser/${id}`);
        localStorage.setItem('user', JSON.stringify(updatedUser.data.data));
      }

      setRefresh((prev) => !prev);
      getAllUser();
      navigate('/allusers');
    } else {
      toast.error('فشل تحديث الدور');
    }
  } catch (err) {
    toast.error('حدث خطأ أثناء التحديث');
  }
}


  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleUpdateRole}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">تحديث الدور</h2>

        <div className="mb-3">
          <label className="block font-semibold mb-1">اسم المستخدم:</label>
          <input
            type="text"
            value={user.name|| ''}
            readOnly
            className="w-full border rounded px-3 py-2 bg-gray-100"
          />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">الدور:</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full border rounded px-3 py-2"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="moderator">Moderator</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition"
        >
          تحديث
        </button>
      </form>
    </div>
  );
}
