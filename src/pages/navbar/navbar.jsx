import React, { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link, NavLink } from 'react-router-dom';
import logo from "../../assets/ChatGPT Image Jul 20, 2025, 06_07_48 PM.png";
import {FaFacebook} from "react-icons/fa"
export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const Links = [
    { path: "/", link: "Home" },
    { path: "/products", link: "Products" },
    { path: "/offers", link: "Offers" },
    { path: "/ContactUs", link: "Contact Us" },
  ];

  return (
    <nav className="w-[100vw] h-[15vh] shadow-md px-6 flex items-center justify-between bg-[#f9f7f1] relative">


    <Link to={"/"}>
    <img className="w-[100px] h-[100px]" src={logo} alt="logo" />
    </Link>

    <div className="md:hidden text-2xl cursor-pointer text-black" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>

      <ul className="hidden md:flex gap-6 text-lg font-medium text-black">
        {Links.map((x, i) => (
          <li key={i}>
            <NavLink
              to={x.path}
              className={({ isActive }) =>
                isActive
                  ? 'text-red-500 border-b-2 border-red-500 pb-1 capitalize'
                  : 'hover:text-red-500 transition capitalize'
              }
            >
              {x.link}
            </NavLink>
          </li>
        ))}
      </ul>

      <div className="hidden md:flex gap-3">
  <Link to={"/register"} >
  <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center gap-2">
register
  </button>
</Link>

      <Link to={"/admin"}>
       <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
          Admin Panel
        </button>
      </Link>
       <a
   href="https://www.facebook.com/profile.php?id=61578340717800"
  target="_blank"
  rel="noreferrer"
>
  <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center gap-2">
    <FaFacebook className="text-xl" />
    اطلب الآن
  </button>
  
</a>


      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="absolute top-[15vh] left-0 w-full bg-black text-white flex flex-col items-center py-4 gap-4 md:hidden z-50 shadow-md transition-all duration-300">
          {Links.map((x, i) => (
            <NavLink
              key={i}
              to={x.path}
              className={({ isActive }) =>
                isActive
                  ? 'text-red-500 capitalize'
                  : 'hover:text-red-400 capitalize'
              }
              onClick={() => setIsOpen(false)}
            >
              {x.link}
            </NavLink>
          ))}
        
              <Link to={"/admin"}>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Admin Panel
          </button>
          </Link>
          
       <a
   href="https://www.facebook.com/profile.php?id=61578340717800"
  target="_blank"
  rel="noreferrer"
>
  <button className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition flex items-center gap-2">
    <FaFacebook className="text-xl" />
    اطلب الآن
  </button>
</a>


        </div>
      )}
    </nav>
  );
}
