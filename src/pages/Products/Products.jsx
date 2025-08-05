import React from 'react';
import { useProduct } from '../../context/productContext.jsx';
import {Link} from 'react-router-dom';
import { FaTrash, FaWhatsapp } from 'react-icons/fa';
import Swal from 'sweetalert2';
import WhatsAppButton from '../WhatsApp/WhatsApp.jsx';

export default function Products() {
  const { products, deleteProduct } = useProduct();


  const deleteFire = async (id,iconn) => {
    const result = await Swal.fire(
 {
    title: "Are you sure ?"  ,
    text: 'You cannot undo this deletion!',
    icon: iconn,
    showCancelButton: true,
    confirmButtonText: 'Yes,Delete',
    cancelButtonText: 'Cancel',
    confirmButtonColor: '#d33',
    cancelButtonColor: '#3085d6',
    customClass: {
      title: 'text-lg font-bold',
      confirmButton: 'px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded',
      cancelButton: 'px-4 py-2 text-white bg-gray-500 hover:bg-gray-600 rounded',
    },
  }
  
  );
  
    if (result.isConfirmed) {
      deleteProduct(id)
      
    }

  };

  return (
    <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 bg-[#f9f7f1] min-h-screen">
      {products.map((x, i) => (
        <div key={i} className="bg-white shadow-lg rounded-lg p-4 relative group h-[400px]">
          {/* زرار حذف */}
          <button
            onClick={() => deleteFire(x._id,"warning")}
            className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition"
            title="حذف المنتج"
          >
            <FaTrash />
          </button>

          {/* محتوى المنتج */}
          <Link to={`/productDet/${x._id}`} className="block cursor-pointer">
            <img
              src={import.meta.env.VITE_API_URL + x.images[0]}
              alt={x.name.en || x.name.ar}
              className="w-full h-48 object-cover rounded-md"
            />
            <h2 className="text-xl font-bold mt-2 text-gray-800">
              {x.name.en || x.name.ar}
            </h2>
            <p className="text-gray-500 mt-1 text-sm line-clamp-2">
              {x.description.en || x.description.ar}
            </p>
            <p className="text-red-600 font-semibold mt-2">{x.price} ج.م</p>
          </Link>

         
            <WhatsAppButton product={x} />
        </div>
      ))}
    </div>
  );
}
