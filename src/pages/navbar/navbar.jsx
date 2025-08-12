import React, { useEffect, useState } from 'react';
import { FaBars, FaTimes, FaFacebook, FaSignOutAlt, FaSignInAlt } from 'react-icons/fa';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import logo from "../../assets/ChatGPT Image Jul 20, 2025, 06_07_48 PM.png";
import egypt from "/flags/Flag_of_Egypt.png";
import UNS from "/flags/Flag_of_the_United_States.png";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const { i18n, t } = useTranslation();
  const [selectedLang, setSelectedLang] = useState(i18n.language);

  const flags = { en: UNS, ar: egypt };

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
    { path: "/", link: t("Home") },
    { path: "/products", link: t("Products") },
    { path: "/offers", link: t("Offers") },
    { path: "/ContactUs", link: t("Contact Us") },
    { path: "/allusers", link: t("Allusers") },
  ];

  return (
    <nav className="bg-[#f9f7f1] shadow-md w-full z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">

        {/* Language Switcher */}
        <div className="flex items-center gap-2">
          <img className="w-6 h-4 object-cover" src={flags[selectedLang]} alt="flag" />
          <select
            className="border rounded px-1 py-0.5 text-sm"
            value={selectedLang}
            onChange={changeLanguage}
            aria-label={t("change_language")}
          >
            <option value="en">English</option>
            <option value="ar">العربية</option>
          </select>
        </div>

        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" className="w-20 h-20 rounded-full" />
        </Link>

        {/* Hamburger Icon (Mobile) */}
        <div
          className="md:hidden text-2xl cursor-pointer text-black"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Desktop Links */}
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

        {/* Desktop Buttons */}
        <div className="hidden md:flex gap-3 items-center">
          {token ? (
            <>
              <Link to="/admin">
                <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition">
                  {t("Admin Panel")}
                </button>
              </Link>
              <a
                href="https://www.facebook.com/profile.php?id=61578340717800"
                target="_blank"
                rel="noreferrer"
              >
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2">
                  <FaFacebook className="text-xl" />
                  {t("اطلب الآن")}
                </button>
              </a>
              <button
                onClick={handleLogout}
                className="p-2 bg-red-600 rounded-full hover:bg-red-700 transition"
                title={t("Logout")}
              >
                <FaSignOutAlt className="text-white text-xl" />
              </button>
            </>
          ) : (
            <Link to="/login">
              <div
                className="p-2 bg-green-600 rounded-full hover:bg-green-700 transition cursor-pointer"
                title={t("Login")}
              >
                <FaSignInAlt className="text-white text-xl" />
              </div>
            </Link>
          )}
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-black text-white flex flex-col items-center gap-4 py-4">
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
                  {t("Admin Panel")}
                </button>
              </Link>
              <a
                href="https://www.facebook.com/profile.php?id=61578340717800"
                target="_blank"
                rel="noreferrer"
              >
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 flex items-center gap-2">
                  <FaFacebook className="text-xl" />
                  {t("اطلب الآن")}
                </button>
              </a>
              <button
                onClick={() => {
                  handleLogout();
                  setIsOpen(false);
                }}
                className="p-2 bg-red-600 rounded-full hover:bg-red-700"
                title={t("Logout")}
              >
                <FaSignOutAlt className="text-white text-xl" />
              </button>
            </>
          ) : (
            <Link to="/login" onClick={() => setIsOpen(false)}>
              <div
                className="p-2 bg-green-600 rounded-full hover:bg-green-700 transition cursor-pointer"
                title={t("Login")}
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
