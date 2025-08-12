import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ProductDet() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);
const user=localStorage.getItem("user")
  async function getProductDet() {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/productDet/${id}`);
      if (data.success) {
        setProduct(data.data);
        toast.success("تم تحميل بيانات المنتج");
        setMainImage(import.meta.env.VITE_API_URL + data.data.images[0]);
      } else {
        toast.warning("لم يتم العثور على المنتج");
      }
    } catch (err) {
      console.log(err);
      toast.error("حدث خطأ في السيرفر");
    }
  }

  useEffect(() => {
    getProductDet();
  }, [id]);

  // إغلاق الصورة بزر Escape
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        setShowImageModal(false);
      }
    };

    if (showImageModal) {
      window.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showImageModal]);

  if (!product) {
    return <div className="text-center py-20 text-gray-500 text-xl">جاري تحميل المنتج...</div>;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md p-6 rounded-md mt-10">

    
      {/* الصورة الرئيسية */}
      <div
        className="w-full h-[400px] border rounded overflow-hidden mb-4 cursor-pointer"
        onClick={() => setShowImageModal(true)}
      >
        <img
          src={mainImage}
          alt="Main"
          className="w-full h-full object-cover"
        />
      </div>

      {/* الصور المصغّرة */}
      <div className="flex gap-3 mb-6">
        {product.images.map((img, i) => (
          <img
            key={i}
            src={import.meta.env.VITE_API_URL + img}
            alt={`Thumbnail ${i + 1}`}
            onClick={() => setMainImage(import.meta.env.VITE_API_URL + img)}
            className={`w-20 h-20 object-cover border-2 rounded cursor-pointer ${
              mainImage === import.meta.env.VITE_API_URL + img
                ? 'border-red-500'
                : 'border-gray-300'
            }`}
          />
        ))}
      </div>

      {/* معلومات المنتج */}
      <h2 className="text-2xl font-bold mt-2 text-gray-800">
        {product.name?.en || product.name?.ar}
      </h2>

      <p className="text-gray-600 mt-2">{product.description?.en || product.description?.ar}</p>

    
      <p className="text-red-600 font-semibold text-xl mt-4">
  {user.role === "admin" ? `السعر: ${product.price} ج.م` : ""}
</p>

      {/* Modal عرض الصورة */}
      {showImageModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setShowImageModal(false)} // يقفل لو ضغطت برا الصورة
        >
          <span
            onClick={(e) => {
              e.stopPropagation(); // عشان ما يقفلش لو ضغط على الزر نفسه
              setShowImageModal(false);
            }}
            className="absolute top-5 right-5 text-white text-3xl cursor-pointer"
          >
            ✖
          </span>
          <img
            src={mainImage}
            alt="Full View"
            className="max-w-[90%] max-h-[90%] rounded shadow-lg"
            onClick={(e) => e.stopPropagation()} // يمنع الإغلاق لو ضغطت على الصورة
          />
        </div>
      )}
    </div>
  );
}
