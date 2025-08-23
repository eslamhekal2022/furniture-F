import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/ChatGPT Image Jul 20, 2025, 06_07_48 PM.png"
import salon from "../../assets/salon.jpeg"
import antrh from "../../assets/antrh.png"
import rokn from "../../assets/rokn.png"
import bed from "../../assets/bed.png"
import { FaShippingFast } from 'react-icons/fa';
import { MdDesignServices } from 'react-icons/md';
import { GiMaterialsScience } from 'react-icons/gi';
import { BiSupport } from 'react-icons/bi';
import CategoryProduct from "../FeaturedCategory/FeaturedCat";
import { useTranslation } from "react-i18next";
import HeroSec from "../HeroSec/HeroSec.jsx";
export default function Home() {
  const {t}=useTranslation()
  return (
    <div className="bg-[#f9f7f1] text-gray-800">

{/* Hero Section */}
<HeroSec/>
      {/* Categories */}
       <CategoryProduct/>


      {/* Features */}
      <section className="py-16 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold mb-10 text-center">لماذا تختارنا؟</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
    <FaShippingFast className="text-4xl text-red-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg">شحن سريع</h3>
          </div>
          <div>
    <MdDesignServices className="text-4xl text-red-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg">تصميمات مودرن</h3>
          </div>
          <div>
    <GiMaterialsScience className="text-4xl text-red-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg">خامات ممتازة</h3>
          </div>
          <div>
    <BiSupport className="text-4xl text-red-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg">دعم ما بعد البيع</h3>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-12 text-center bg-red-600 text-white">
        <h2 className="text-3xl font-bold mb-4 py-4">ابدأ تجربتك الآن</h2>
        <Link to="/contactUs" className="bg-white text-red-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition">
          تواصل معنا
        </Link>
      </section>
    </div>
  );
}
