import React from "react";
import { FaPhoneAlt,FaFacebook, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

export default function ContactUs() {
  return (
    <div className="bg-[#f9f7f1] min-h-[80vh] flex items-center justify-center px-6 py-16">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-xl w-full text-center space-y-6">
        <h2 className="text-3xl font-bold text-red-600 mb-6">Contact Us</h2>

        <div className="flex flex-col gap-4 text-lg text-gray-700">
          <div className="flex items-center justify-center gap-3 text-2xl">
            <FaPhoneAlt className="text-red-500" />
            <span>01065624727</span>
          </div>

          <a
            href="https://wa.me/2001065624727"
            target="_blank"
            rel="noreferrer"
            className="text-2xl flex items-center justify-center gap-3 hover:text-green-600 transition"
          >
            <FaWhatsapp className="text-green-500" />
            <span>راسلنا على واتساب</span>
          </a>

         <a 
  
            className="flex text-2xl items-center justify-center gap-3 hover:text-green-600 transition"
            href="https://www.facebook.com/profile.php?id=61578340717800"
            target="_blank"
            rel="noreferrer"

         >

         <FaFacebook className="text-blue-500"/>
                     <span>راسلنا على فيسبوك</span>

         </a> 

          <div className="flex items-center justify-center gap-3 text-2xl">
            <FaEnvelope className="text-red-500" />
            <span>eslamhekal45@gmail.com</span>
          </div>

          <div className="flex items-center justify-center gap-3">
            <FaMapMarkerAlt className="text-red-500" />
            <span>دمياط، مصر</span>
          </div>
        </div>
      </div>
    </div>
  );
}
