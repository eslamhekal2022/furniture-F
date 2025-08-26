import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import salon from "../../assets/salon.jpeg";
import antrh from "../../assets/antrh.png";
import bed from "../../assets/bed.png";
import rokna from "../../assets/rokn.png";

export default function HeroSec() {
  const { t } = useTranslation();
  const images = [salon, antrh, bed,rokna];
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % images.length);
    }, 3000); 
        return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-[70vh] flex flex-col md:flex-row items-center justify-between px-8 md:px-20 py-16">
      <div className="max-w-xl space-y-6 text-center md:text-left ">
        <h1 className="text-4xl md:text-5xl font-bold leading-[3 text-gray-900 capitalize">
          {t("heroTitle")}
        </h1>
        <p className="text-lg text-gray-600 py-2">{t("herodesc")}</p>
        <Link to={"/products"}>
          <button className="bg-red-600 text-white px-8 py-3 rounded-md font-semibold hover:bg-red-700 transition capitalize">
            {t("orderNow")}
          </button>
        </Link>
      </div>

      {/* الصورة */}
      <div className="mt-10 md:mt-0">
        <img
          src={images[current]}
          alt="Furniture"
          className="rounded-2xl shadow-lg max-w-sm md:max-w-md"
        />
      </div>
    </div>
  );
}
