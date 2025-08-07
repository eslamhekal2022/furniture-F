import React, { useState } from 'react';
import { FaBars, FaTimes, FaFacebook, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import logo from "../../assets/ChatGPT Image Jul 20, 2025, 06_07_48 PM.png";
                  import { CiUser } from "react-icons/ci";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const Links = [
    { path: "/", link: "Home" },
    { path: "/products", link: "Products"},
    { path: "/offers", link: "Offers" },
    { path: "/ContactUs", link: "Contact Us" },
    { path: "/allusers", link: "Allusers" },
  ];

  return (
    <nav className="bg-[#f9f7f1] shadow-md w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" className="w-20 h-20 rounded-full" />
        </Link>

        {/* Hamburger Menu Icon */}
        <div className="md:hidden text-2xl cursor-pointer text-black" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Links - Desktop */}
        {token && (
          <ul className="hidden md:flex items-center gap-6 text-lg font-medium text-black">
            {Links.map((x, i) => (
              <li key={i}>
                <NavLink
                  to={x.path}
                  className={({ isActive }) =>
                    isActive
                      ? 'text-red-500 border-b-2 border-red-500 pb-1 capitalize'
                      : 'hover:text-red-500 capitalize'
                  }
                >
                  {x.link}
                </NavLink>
              </li>
            ))}
          </ul>
        )}

        {/* Buttons - Desktop */}
        <div className="hidden md:flex gap-3 items-center">
          {token ? (
            <>
              
              <Link to="/admin">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  Admin Panel
                </button>
              </Link>
              <a
                href="https://www.facebook.com/profile.php?id=61578340717800"
                target="_blank"
                rel="noreferrer"
              >
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2">
                  <FaFacebook className="text-xl" />
                  اطلب الآن
                </button>
              </a>
              <button
                onClick={handleLogout}
                className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition"
                title="Logout"
              >
                <FaSignOutAlt className="text-white text-xl" />
              </button>
            </>
          ) : (
            <Link to="/login">
              <div
                className="p-2 bg-green-600 rounded-full hover:bg-green-700 transition cursor-pointer"
                title="Login"
              >
                <FaSignInAlt className="text-white text-xl" />
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black text-white flex flex-col items-center gap-4 py-4 transition-all duration-300">
          {token ? (
            <>
              {Links.map((x, i) => (
                <NavLink
                  key={i}
                  to={x.path}
                  className={({ isActive }) =>
                    isActive ? 'text-red-500 capitalize' : 'hover:text-red-400 capitalize'
                  }
                  onClick={() => setIsOpen(false)}
                >
                  {x.link}
                </NavLink>
              ))}
              <Link to="/admin" onClick={() => setIsOpen(false)}>
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                  Admin Panel
                </button>
              </Link>
              <a
                href="https://www.facebook.com/profile.php?id=61578340717800"
                target="_blank"
                rel="noreferrer"
              >
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2">
                  <FaFacebook className="text-xl" />
                  اطلب الآن
                </button>
              </a>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="p-2 bg-red-600 rounded-full hover:bg-red-700"
                title="Logout"
              >
                <FaSignOutAlt className="text-white text-xl" />
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <div
                className="p-2 bg-green-600 rounded-full hover:bg-green-700 transition cursor-pointer"
                title="Login"
              >
                <FaSignInAlt className="text-white text-xl" />
              </div>
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
