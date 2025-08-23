// src/components/WhatsAppButton.jsx
import React from 'react';
import { useTranslation } from 'react-i18next';
import { FaWhatsapp } from 'react-icons/fa';

export default function WhatsAppButton({ product }) {
  const { _id, name } = product;

  const {t,i18n}=useTranslation()
  const lang=i18n.language
const message = `مرحبًا، أنا مهتم بالمنتج  ${name[lang]}" أرجو إرسال التفاصيل الكاملة.\nرابط المنتج:\n${window.location.origin}/productDet/${_id}`;
  const whatsappNumber = "201065624727"; 
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
  return (
    
  <a
      href={whatsappLink}
      target="_blank"
      rel="noopener noreferrer"
      className="w-full  mt-4 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md flex items-center justify-center gap-2 transition"
      title="تواصل عبر واتساب"
    >

      <FaWhatsapp className="text-white text-xl" />
      {t("orderwithWhatsUp")}
    </a>
  );
}
