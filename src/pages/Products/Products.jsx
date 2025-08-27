import { FaTrash } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { useProduct } from '../../context/productContext.jsx';
import WhatsAppButton from '../WhatsApp/WhatsApp.jsx';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

export default function Products() {
  const { products, deleteProduct, categories } = useProduct();
  const { i18n, t } = useTranslation();
  const lang = i18n.language || "en";

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 40000]); // min & max price

  const user = JSON.parse(localStorage.getItem("user") || "null");

  // هنا الترجمة
  const categoryTranslations = {
    salon: { ar: "صالون", en: "Salon" },
    antrh: { ar: "انتريه", en: "Antrh" },
    rokna: { ar: "ركنه", en: "Rokna" },
  };

  const getCategoryLabel = (cat) => {
    return categoryTranslations[cat]?.[lang] || cat;
  };

  const deleteFire = async (id, iconn) => {
    const result = await Swal.fire({
      title: "Are you sure ?",
      text: 'You cannot undo this deletion!',
      icon: iconn,
      showCancelButton: true,
      confirmButtonText: 'Yes,Delete',
      cancelButtonText: 'Cancel',
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
    });

    if (result.isConfirmed) {
      deleteProduct(id);
    }
  };

  // فلترة المنتجات
  const filteredProducts = products.filter((p) => {
    const inCategory =
      selectedCategory === "all" ? true : p.category === selectedCategory;

    const inPrice =
      p.price >= priceRange[0] && p.price <= priceRange[1];

    return inCategory && inPrice;
  });

  return (
    <div className="p-4 bg-[#f9f7f1] min-h-screen">

      {/* أزرار التصنيفات */}
      <div className="mb-6 flex justify-center p-2 capitalize flex-wrap gap-3 ">
        <button
          onClick={() => setSelectedCategory("all")}
          className={`px-4 py-2 rounded-lg border capitalize  
            ${selectedCategory === "all" ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}
        >
          {t("allproducts")}
        </button>

        {categories.map((cat, i) => (
          <button
            key={i}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg border capitalize 
              ${selectedCategory === cat ? "bg-blue-600 text-white" : "bg-white text-gray-600"}`}
          >
            {getCategoryLabel(cat)}
          </button>
        ))}
      </div>

      {/* فلتر السعر */}
      <div className="mb-6 flex justify-center gap-4 items-center">
        <label className="font-semibold">{t("From")}</label>
        <input
          type="number"
          value={priceRange[0]}
          onChange={(e) => setPriceRange([+e.target.value, priceRange[1]])}
          className="border rounded px-2 py-1 w-24"
        />
        <label className="font-semibold">{t("to")}</label>
        <input
          type="number"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([priceRange[0], +e.target.value])}
          className="border rounded px-2 py-1 w-24"
        />
      </div>

      {/* المنتجات */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((x, i) => (
            <div key={i} className="bg-white shadow-lg rounded-lg p-4 relative group h-[400px]">
              <button
                onClick={() => deleteFire(x._id, "warning")}
                className="absolute top-2 right-2 text-red-600 hover:text-red-800 transition"
                title="حذف المنتج"
              >
                <FaTrash />
              </button>

              <Link to={`/productDet/${x._id}`} className="block cursor-pointer">
                <img
                  src={import.meta.env.VITE_API_URL + x.images[0]}
                  alt={x.name.en || x.name.ar}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h2 className="text-xl font-bold mt-2 text-gray-800">
                  {x.name[lang]}
                </h2>
                <p className="text-gray-500 mt-1 text-sm line-clamp-2">
                  {x.description[lang]}
                </p>
                <p className="text-red-600 font-semibold mt-2">
                  {user?.role === "admin"
                    ? `السعر: ${x.price} ج.م`
                    : `السعر: ${x.price} ج.م`}
                </p>
              </Link>

              <WhatsAppButton product={x} />
            </div>
          ))
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg font-semibold">
            {t("no-products-in-range")}
          </p>
        )}
      </div>

    </div>
  );
}
