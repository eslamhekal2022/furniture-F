import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

export default function ProductDet() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
const [mainImage, setMainImage] = useState('');

  async function getProductDet() {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/productDet/${id}`);
      if (data.success) {
        setProduct(data.data); // يفترض ان المنتج موجود في data.data
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

  if (!product) {
    return <div className="text-center py-20 text-gray-500 text-xl">جاري تحميل المنتج...</div>;
  }

  return (
   <div className="max-w-4xl mx-auto bg-white shadow-md p-6 rounded-md mt-10">
  {/* الصورة الرئيسية */}
  <div className="w-full h-[400px] border rounded overflow-hidden mb-4">
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
    السعر: {product.price} ج.م
  </p>
</div>

  );
}
