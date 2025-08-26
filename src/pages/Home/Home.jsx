import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/ChatGPT Image Jul 20, 2025, 06_07_48 PM.png"
import salon from "../../assets/salon.jpeg"
import antrh from "../../assets/antrh.png"
import rokn from "../../assets/rokn.png"
import bed from "../../assets/bed.png"

import CategoryProduct from "../FeaturedCategory/FeaturedCat";
import { useTranslation } from "react-i18next";
import HeroSec from "../HeroSec/HeroSec.jsx";
import Cta from "../CTA/Cta.jsx";
import ChooseUs from "../ChooseUs/ChooseUs.jsx";
export default function Home() {
  const {t}=useTranslation()
  return (
    <div className="bg-[#f9f7f1] text-gray-800">
       <HeroSec/>
      <CategoryProduct/>
    <ChooseUs/>
    <Cta/>
    </div>
  );
}
