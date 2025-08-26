import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import WhatsAppButton from '../WhatsApp/WhatsApp.jsx';

export default function ProductDet() {
  const { i18n } = useTranslation();
  const lang = i18n.language || "en";

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showImageModal, setShowImageModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "null");

  async function getProductDet() {
    try {
      const { data } = await axios.get(`${import.meta.env.VITE_API_URL}/productDet/${id}`);
      if (data.success) {
        setProduct(data.data);
        setCurrentIndex(0);
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
    if (!product?.images?.length) return;

    if (e.key === "Escape") {
      setShowImageModal(false);
    } else if (e.key === "ArrowRight") {
      setCurrentIndex((prev) => (prev + 1) % product.images.length);
    } else if (e.key === "ArrowLeft") {
      setCurrentIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
    }
  };

  if (showImageModal) {
    window.addEventListener("keydown", handleKeyDown);
  }
  return () => {
    window.removeEventListener("keydown", handleKeyDown);
  };
}, [showImageModal, product?.images?.length]);

  if (!product) {
    return <div className="text-center py-20 text-gray-500 text-xl">جاري تحميل المنتج...</div>;
  }

  const mainImage = import.meta.env.VITE_API_URL + product.images[currentIndex];

  const handleNext = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev + 1) % product.images.length);
  };

  const handlePrev = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev - 1 + product.images.length) % product.images.length);
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md p-6 rounded-md mt-10">
      {/* الصورة الرئيسية */}
      <div
        className="w-full h-[400px] border rounded overflow-hidden mb-4 cursor-pointer"
        onClick={() => setShowImageModal(true)}
      >
        <img src={mainImage} alt="Main" className="w-full h-full object-cover" />
      </div>

      {/* الصور المصغّرة */}
      <div className="flex gap-3 mb-6">
        {product.images.map((img, i) => (
          <img
            key={i}
            src={import.meta.env.VITE_API_URL + img}
            alt={`Thumbnail ${i + 1}`}
            onClick={() => setCurrentIndex(i)}
            className={`w-20 h-20 object-cover border-2 rounded cursor-pointer ${
              currentIndex === i ? 'border-red-500' : 'border-gray-300'
            }`}
          />
        ))}
      </div>

      {/* معلومات المنتج */}
      <h2 className="text-2xl font-bold mt-2 text-gray-800">
        {product.name[lang]}
      </h2>
      <p className="text-gray-600 mt-2">{product.description[lang]}</p>

      <p className="text-red-600 font-semibold mt-2">
        {user?.role === "admin"
          ? `السعر: ${product.price} ج.م`
          : (() => {
              const price = Number(product.price);
              const tiers = [
                { max: 5000, increase: 300 },
                { max: 7000, increase: 500 },
                { max: 10000, increase: 700 },
                { max: 15000, increase: 1000 },
                { max: 20000, increase: 1500 },
                { max: 30000, increase: 2000 },
              ];
              const tier = tiers.find(t => price <= t.max);
              let newPrice = tier ? price + tier.increase : price + 2500;
              return `السعر: ${newPrice} ج.م`;
            })()
        }
      </p>

      <div className="mt-6">
  <WhatsAppButton product={product} />
</div>

      {/* Modal عرض الصورة */}
      {showImageModal && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50"
          onClick={() => setShowImageModal(false)}
        >
          {/* زر Previous */}
         <button
  onClick={handlePrev}
  className="absolute left-5 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full text-4xl font-bold"
>
  ‹
</button>
          {/* زر الإغلاق */}
          <span
            onClick={(e) => {
              e.stopPropagation();
              setShowImageModal(false);
            }}
            className="absolute top-5 right-5 text-white text-3xl cursor-pointer"
          >
            ✖
          </span>

          {/* الصورة */}
          <img
            src={mainImage}
            alt="Full View"
            className="max-w-[90%] max-h-[90%] rounded shadow-lg"
            onClick={(e) => e.stopPropagation()}
          />

          {/* زر Next */}
        <button
  onClick={handleNext}
  className="absolute right-5 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full text-4xl font-bold"
>
  ›
</button>
        </div>
      )}
    </div>
  );
}
