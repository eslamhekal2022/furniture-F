import React from 'react';
import { useProduct } from '../../context/productContext';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

export default function CategoryProduct() {
  const { productCategory } = useProduct();

  return (
    <section className="py-12 bg-[#f9f7f1]" dir="ltr">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-10 capitalize">featured categories</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {productCategory?.map((x) => (
            <Link
              to={`/GetFilterCat/${x.category}`}
              key={x._id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300 group"
              aria-label={`انتقل إلى فئة ${x.category}`}
            >
              <img
                src={`${import.meta.env.VITE_API_URL}${x.images[0]}`}
                alt={x.name?.ar || "صورة المنتج"}
                className="w-full h-52 object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="p-4 text-center">
                <h3 className="text-xl font-semibold text-gray-700 group-hover:text-red-600 transition capitalize">{x.category}</h3>
              </div>
            </Link>
          
          ))}
        </div>
      </div>
    </section>
  );
}
