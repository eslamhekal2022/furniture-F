import React from 'react';

import { Link } from 'react-router-dom';

export default function Dashboard() {

  return (
    <main className="p-6 bg-[#f9f7f1] min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-red-600 capitalize">
          Welcome to the dashboard
        </h1>
      </header>

      <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        <Link to="allOrders" className="no-underline">
          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-red-50 transition-all">
            <h3 className="text-xl font-semibold text-gray-800">Orders</h3>
            <p className="text-3xl text-red-600 font-bold">120</p>
          </div>
        </Link>

        <Link to="AllUser" className="no-underline">
          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-green-50 transition-all">
            <h3 className="text-xl font-semibold text-gray-800">Users</h3>
            <p className="text-3xl text-green-600 font-bold">2</p>
          </div>
        </Link>

        <Link to="allProducts" className="no-underline">
          <div className="bg-white p-6 rounded-xl shadow-md text-center hover:bg-blue-50 transition-all">
            <h3 className="text-xl font-semibold text-gray-800">Products</h3>
            <p className="text-3xl text-blue-600 font-bold">2</p>
          </div>
        </Link>
      </section>
    </main>
  );
}
