import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import WhatsAppButton from '../WhatsApp/WhatsApp.jsx';

export default function GetFilterCat() {
  const [productData, setData] = useState([]);
  const { category } = useParams();

  async function getFilterCat() {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_API_URL}/getFilterCat/${category}`
      );
      if (data.success) {
        setData(data.data);
      }
    } catch (error) {
      toast.error("فشل تحميل المنتجات");
      console.error(error);
    }
  }

  useEffect(() => {
    getFilterCat();
  }, [category]);

  return (
    <section className="p-6 bg-[#f9f7f1] min-h-screen">
      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800 capitalize">
        Category : {category}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {productData.map((item) => (
          <div
            key={item._id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition"
          >
            <Link to={`/productDet/${item._id}`}>
              <img
                src={`${import.meta.env.VITE_API_URL}${item.images[0]}`}
                alt={item.name?.ar || item.name?.en}
                className="w-full h-60 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2 text-gray-800">
                  {item.name?.ar || item.name?.en}
                </h3>
                <p className="text-gray-600 mb-2">
                  {item.description?.ar || item.description?.en}
                </p>
                <p className="text-red-600 font-bold text-lg">
                  السعر: {item.price} جنيه
                </p>
              </div>
            </Link>
            <div className="p-4">
              <WhatsAppButton product={item} />
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
