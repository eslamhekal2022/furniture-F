import React, { useEffect, useState } from "react";
import { FaBars, FaTimes, FaFacebook, FaSignOutAlt, FaSignInAlt, FaArrowLeft } from "react-icons/fa";
import { Link, NavLink, useNavigate, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import logo from "../../assets/ChatGPT Image Jul 20, 2025, 06_07_48 PM.png";
import egypt from "/flags/Flag_of_Egypt.png";
import UNS from "/flags/Flag_of_the_United_States.png";
import { useSelector } from "react-redux";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const location = useLocation();
  const { i18n, t } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const flags = { en: UNS, ar: egypt };
  const user = useSelector((x) => x.user.user);

  useEffect(() => {
    setSelectedLang(i18n.language);
  }, [i18n.language]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const changeLanguage = (e) => {
    const lang = e.target.value;
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    setSelectedLang(lang);
  };

  const Links = [
    { path: "/", key: "home" },
    { path: "/products", key: "products" },
    { path: "/ContactUs", key: "contactUs" },
    ...(user?.role === "admin" ? [{ path: "/allusers", key: "allUsers" }] : []),
  ];

  const NavLinks = ({ onClick }) => (
    <>
      {Links.map((x, i) => (
        <NavLink
          key={i}
          to={x.path}
          className={({ isActive }) =>
            isActive
              ? "text-red-500 border-b-2 border-red-500 pb-1 capitalize"
              : "hover:text-red-500 capitalize"
          }
          onClick={onClick}
        >
          {t(x.key)}
        </NavLink>
      ))}
    </>
  );

  return (
  <nav className=" w-full bg-[#fdfdfb]/95 backdrop-blur-md shadow-sm z-50">
  <div className="container mx-auto px-4 py-3 flex items-center justify-between">
    
    {/* Left side (Back button + Logo) */}
    <div className="flex items-center gap-3">
      {/* Back button */}
      {location.pathname !== "/" && (
        <button
          onClick={() => navigate(-1)}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition "
          title={t("Back")}
        >
          <FaArrowLeft className="text-gray-700 text-lg" />
        </button>
      )}

      {/* Logo */}
      <Link to="/" className="flex items-center gap-2">
        <img src={logo} alt="logo" className="w-10 h-10 rounded-full border" />
        <span className="hidden sm:block text-lg font-bold text-gray-800">
          Eslam Home
        </span>
      </Link>
    </div>

    {/* Middle links (desktop only) */}
     <ul className="hidden md:flex gap-6 text-gray-700 font-medium items-center">
    <NavLinks />

    {user?.role === "admin" && (
      <Link
        to="/admin"
        className="flex items-center gap-2 bg-yellow-500 text-white px-4 py-2 rounded-lg 
                   hover:bg-yellow-600 transition font-medium shadow text-sm"
      >
        ⚙️ {t("Admin Panel")}
      </Link>
    )}
  </ul>
)
    {/* Right side */}
    <div className="flex items-center gap-3">
      {/* Order Now button (always visible) */}
      <a
        href="https://www.facebook.com/profile.php?id=61578340717800"
        target="_blank"
        rel="noreferrer"
      >
        <button className="bg-red-600 text-white px-3 sm:px-5 py-2 rounded-lg hover:bg-red-700 transition font-medium shadow text-sm sm:text-base">
          {t("اطلب الآن")}
        </button>
      </a>

      {/* Language Switcher (desktop only) */}
      <div className="flex items-center gap-2">
  <img className="w-5 h-3 object-cover" src={flags[selectedLang]} alt="flag" />
  <select
    className="border rounded px-2 py-1 text-sm bg-white"
    value={selectedLang}
    onChange={changeLanguage}
  >
    <option value="en">EN</option>
    <option value="ar">AR</option>
  </select>
</div>

      {/* Login / Logout */}
      {token ? (
        <button
          onClick={handleLogout}
          className="hidden md:block p-2 bg-gray-200 rounded-full hover:bg-gray-300 transition"
          title={t("Logout")}
        >
          <FaSignOutAlt className="text-gray-700 text-lg" />
        </button>
      ) : (
        <Link to="/login">
          <div
            className="hidden md:block p-2 bg-green-600 rounded-full hover:bg-green-700 transition cursor-pointer"
            title={t("Login")}
          >
            <FaSignInAlt className="text-white text-lg" />
          </div>
        </Link>
      )}

      {/* Mobile Hamburger */}
      <div
        className="md:hidden text-2xl cursor-pointer text-gray-700"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <FaTimes /> : <FaBars />}
      </div>
    </div>
  </div>

  {/* Mobile Menu */}
  {isOpen && (
    <div className="md:hidden bg-white border-t shadow flex flex-col items-center gap-4 py-4">
      { <NavLinks onClick={() => setIsOpen(false)} />}
      
      {/* Language Switcher in mobile */}
      <div className="flex items-center gap-2">
        <img className="w-5 h-3 object-cover" src={flags[selectedLang]} alt="flag" />
        <select
          className="border rounded px-2 py-1 text-sm"
          value={selectedLang}
          onChange={changeLanguage}
        >
          <option value="en">EN</option>
          <option value="ar">AR</option>
        </select>
        
      </div>
   {user?.role === "admin" && (
<Link
  to="/admin"
  onClick={() => setIsOpen(false)}
  className="flex items-center gap-2 px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition font-medium shadow text-sm"
>
  <span className="inline-block transition-transform duration-500 hover:rotate-180">
    ⚙️
  </span>
  {t("admin-panel")}
</Link>

)}

     
        <Link to="/login" onClick={() => setIsOpen(false)}>
          <div className="p-2 bg-green-600 rounded-full hover:bg-green-700 transition text-white flex items-center gap-2">
            <FaSignInAlt /> {t("Login")}
          </div>
        </Link>
      
    </div>
  )}
</nav>

  );
}
