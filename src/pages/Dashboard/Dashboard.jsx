import React from 'react';

import { Link } from 'react-router-dom';
import { useProduct } from '../../context/productContext.jsx';
import { useUser } from '../../context/userContext.jsx';
import { useTranslation } from 'react-i18next';

export default function Dashboard() {
  const {productCounts}=useProduct()
  const{t}=useTranslation()
const {countUsers}=useUser()
  return (
    <main className="p-6 bg-[#f9f7f1] min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-red-600 capitalize">
          Welcome to the dashboard
        </h1>
      </header>

      <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
       
        <Link to="/allusers" className="no-underline">
          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-green-50 transition-all">
            <h3 className="text-xl font-semibold text-gray-800">{t("users")}</h3>
            <p className="text-3xl text-green-600 font-bold">{countUsers}</p>
          </div>
        </Link>

        <Link to="/products" className="no-underline">
          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-blue-50 transition-all">
            <h3 className="text-xl font-semibold text-gray-800">{t("products")}</h3>
            <p className="text-3xl text-blue-600 font-bold">{productCounts}</p>
          </div>
        </Link>
      </section>
    </main>
  );
}
