import React, { useEffect } from 'react';
import { useUser } from '../../context/userContext.jsx';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { FaTrashAlt, FaEdit } from 'react-icons/fa';
import axios from 'axios';
import { useTranslation } from "react-i18next";

export default function Allusers() {
  const { users, loading, getAllUser, setRefresh } = useUser();
    
  useEffect(() => {
    getAllUser();
  }, []);
const deleteUser = async (id) => {
  const result =await Swal.fire({
  title: 'Are you sure?',
  text: 'You will not be able to revert this!',
  icon: 'warning',
  showCancelButton: true,
  confirmButtonText: '🗑 Yes, delete it',
  cancelButtonText: '❌ Cancel',
  confirmButtonColor: '#d33', // خلفية حمراء
  cancelButtonColor: '#3085d6', // خلفية زرقاء
  customClass: {
    confirmButton: 'swal-confirm-btn',
    cancelButton: 'swal-cancel-btn'
  }
});


  if (result.isConfirmed) {
    try {
      const res = await axios.delete(`${import.meta.env.VITE_API_URL}/deleteUser/${id}`);
      const data = res.data;

      if (data.success) {
        toast.success('User deleted successfully');
        setRefresh((prev) => !prev);
        Swal.fire('Deleted!', 'The user has been deleted.', 'success');
      } else {
        toast.error(data.message || 'Error while deleting');
      }
    } catch (error) {
      toast.error('Connection error with the server');
    }
  }
};



  if (loading) return <p className="text-center py-6">جارٍ التحميل...</p>;

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {users && users.length > 0 ? (
        users.map((user) => (
          <div
            key={user._id}
            className="border rounded-xl shadow p-4 bg-white relative"
          >
            {/* زر الحذف */}
            <button
              onClick={() => deleteUser(user._id)}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              title="حذف المستخدم"
            >
              <FaTrashAlt />
            </button>

            {/* صورة المستخدم */}
            {user.image && (
              <img
                src={
                  user.image?.startsWith('http')
                    ? user.image
                    : `${import.meta.env.VITE_API_URL}${user.image}`
                }
                alt={user.name}
                className="w-20 h-20 object-cover rounded-full mx-auto"
              />
            )}

            {/* بيانات المستخدم */}
            <h2 className="text-xl font-bold text-center mt-2">{user.name}</h2>
            {user.email && (
              <p className="text-center text-gray-500">📧 {user.email}</p>
            )}
            {user.phone && (
              <p className="text-center">📞+20  {user.phone}</p>
            )}
            <p className="text-center">
              🎭 الدور: <span className="font-semibold">{user.role}</span>
            </p>

            {/* زر تعديل الدور */}
            <Link
              to={`/UpdateRole/${user._id}`}
              className="block w-full mt-3 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition flex justify-center items-center gap-2"
            >
              <FaEdit /> تعديل الدور
            </Link>
          </div>
        ))
      ) : (
        <p className="text-center col-span-full">لا يوجد مستخدمين حالياً</p>
      )}
    </div>
  );
}
