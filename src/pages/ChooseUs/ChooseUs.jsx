import React from 'react'
import { useTranslation } from 'react-i18next'
import { FaShippingFast } from 'react-icons/fa';
import { MdDesignServices } from 'react-icons/md';
import { GiMaterialsScience } from 'react-icons/gi';
import { BiSupport } from 'react-icons/bi';
export default function ChooseUs() {
  const {t}=useTranslation()
  return (
 <section className="py-16 px-6 md:px-20 bg-white">
        <h2 className="text-3xl font-bold mb-10 text-center">{t("choose-us")}</h2>
        <div className="grid md:grid-cols-4 gap-8 text-center">
          <div>
    <FaShippingFast className="text-4xl text-red-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg">{t("Fast-Shipping")}</h3>
          </div>
          <div>
    <MdDesignServices className="text-4xl text-red-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg">{t("Modern-Designs")}</h3>
          </div>
          <div>
    <GiMaterialsScience className="text-4xl text-red-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg">{t("Premium-Materials")}</h3>
          </div>
          <div>
    <BiSupport className="text-4xl text-red-600 mx-auto mb-4" />
            <h3 className="font-semibold text-lg">{t("After-Sales-Support")}</h3>
          </div>
        </div>
      </section>
      )
}
