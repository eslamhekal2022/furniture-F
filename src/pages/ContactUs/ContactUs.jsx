import React from "react";
import { useTranslation } from "react-i18next";
import { FaPhoneAlt,FaFacebook, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactUs() {
  const {t}=useTranslation()
  return (
   <div className="bg-[#f9f7f1] min-h-[80vh] flex items-center justify-center px-4 sm:px-6 py-12 sm:py-16">
  <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 w-full sm:max-w-xl text-center space-y-6">
    <h2 className="text-2xl sm:text-3xl font-bold text-red-600 mb-6 capitalize">
      {t("contactUs")}
    </h2>

    <div className="flex flex-col gap-5 text-base sm:text-lg text-gray-700">
      
      {/* phone */}
      <div className="flex items-center justify-center gap-3 text-xl sm:text-2xl">
        <FaPhoneAlt className="text-red-500" />
        <span>01065624727</span>
      </div>

      {/* whatsapp */}
      <a
        href="https://wa.me/2001065624727"
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-3 text-xl sm:text-2xl hover:text-green-600 transition-colors"
      >
        <FaWhatsapp className="text-green-500" />
        <span className="capitalize">{t("MessageOnWhatsApp")}</span>
      </a>

      {/* facebook */}
      <a
        href="https://www.facebook.com/profile.php?id=61578340717800"
        target="_blank"
        rel="noreferrer"
        className="flex items-center justify-center gap-3 text-xl sm:text-2xl hover:text-blue-600 transition-colors"
      >
        <FaFacebook className="text-blue-500" />
        <span className="capitalize">{t("MessageOnFaceBook")}</span>
      </a>

      {/* email */}
      <div className="flex items-center justify-center gap-3 text-xl sm:text-2xl">
        <FaEnvelope className="text-red-500" />
        <span>eslamhekal45@gmail.com</span>
      </div>

      {/* address */}
      <div className="flex items-center justify-center gap-3 text-lg sm:text-xl">
        <FaMapMarkerAlt className="text-red-500" />
        <span className="capitalize">{t("address")}</span>
      </div>
    </div>
  </div>
</div>

  );
}
