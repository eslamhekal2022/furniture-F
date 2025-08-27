import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function AdminPanel() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const links = [
    { path: "", label: "Dashboard" },
    { path: "AddItem", label: "Add Item" },
    { path: "/products", label: "All Products" },
    { path: "GetContacts", label: "Contact Messages" },
  ];

  return (
    <div className="min-h-screen flex relative">
  {/* Sidebar */}
  <aside
    className={`fixed top-0 left-0 h-screen w-[250px] bg-black text-white p-6 space-y-6 z-50 
    transform transition-transform duration-300 ease-in-out
    ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} 
    md:translate-x-0 md:static md:w-[250px]`}
  >
    <h2 className="text-2xl font-bold text-red-500 mb-6">Admin Panel</h2>
    <ul className="space-y-4 text-lg">
      {links.map((x, i) => (
        <li key={i}>
          <Link
            to={x.path}
            onClick={() => setSidebarOpen(false)}
            className="hover:text-red-400 transition"
          >
            {x.label}
          </Link>
        </li>
      ))}
    </ul>
  </aside>

  {/* Overlay for mobile */}
  {sidebarOpen && (
    <div
      onClick={() => setSidebarOpen(false)}
      className="fixed inset-0 bg-black/50 z-40 md:hidden"
    ></div>
  )}

  {/* Main content */}
  <div className="flex-1 bg-[#f9f7f1] p-6">
    {/* Hamburger menu - small screens only */}
    <button
      onClick={toggleSidebar}
      className="text-3xl text-black mb-4 md:hidden"
    >
      ☰
    </button>

    <Outlet />
  </div>
</div>

  );
}
