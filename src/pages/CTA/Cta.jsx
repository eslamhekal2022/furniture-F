import React from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

export default function Cta() {
  const {t}=useTranslation()
  return (
<section className="py-12 text-center bg-red-600 text-white">
        <h2 className="text-3xl font-bold mb-4 py-4 capitalize">
{t("start-now")}
        </h2>
        <Link to="/contactUs" className="bg-white text-red-600 px-6 py-3 rounded-md font-semibold hover:bg-gray-100 transition capitalize">
 {t("contactUs")}
        </Link>
      </section>  )
}
