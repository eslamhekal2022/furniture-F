import React from 'react'
import { useUser } from '../../context/userContext.jsx'

export default function Allusers() {
  const { users, setRefresh } = useUser()

  const handleRoleChange = async (id, currentRole) => {
    const newRole = currentRole === 'admin' ? 'moderator' : 'admin'
    try {
      const res = await fetch(`http://localhost:3000/api/users/update-role/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ role: newRole })
      })

      const data = await res.json()
      if (data.success) {
        alert("تم تحديث الدور بنجاح")
        setRefresh(prev => !prev) // لتحديث القائمة من الـ context
      } else {
        alert("حدث خطأ أثناء التحديث")
      }
    } catch (err) {
      console.error(err)
      alert("خطأ في الاتصال بالسيرفر")
    }
  }

  return (
    <div className='p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {users && users.length > 0 ? users.map((user, i) => (
        <div key={i} className='border rounded-xl shadow p-4 space-y-2 bg-white'>
          {user.image && (
         <img
         src={user.image?.startsWith("http") ? user.image : `${import.meta.env.VITE_API_URL}${user.image}`}
         alt={user.name}
         className='w-20 h-20 object-cover rounded-full mx-auto'
         />

          )}
          <h2 className='text-xl font-bold text-center'>{user.name}</h2>
          <p className='text-center'>📞 {user.phone}</p>
          <p className='text-center'>🎭 الدور: <span className='font-semibold'>{user.role}</span></p>

          <button
            onClick={() => handleRoleChange(user._id, user.role)}
            className='block w-full mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition'
          >
            تغيير الدور
          </button>
        </div>
      )) : (
        <p>لا يوجد مستخدمين حالياً</p>
      )}
    </div>
  )
}
