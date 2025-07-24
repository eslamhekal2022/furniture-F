import axios from "axios";
import { useState, useRef } from "react";
import { toast } from "react-toastify";
import { useProduct } from "../../context/productContext.jsx";

const AddItem = () => {
  const [formData, setFormData] = useState({
    name_en: "",
    name_ar: "",
    description_en: "",
    description_ar: "",
    price: "",
    category: "salon",
    images: [],
    imagePreviews: [],
  });

  const API = import.meta.env.VITE_API_URL;
  const { getAllProducts } = useProduct();
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      const fileArray = Array.from(files);
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...fileArray],
        imagePreviews: [
          ...prev.imagePreviews,
          ...fileArray.map((file) => URL.createObjectURL(file)),
        ],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => {
      const updatedImages = [...prev.images];
      const updatedPreviews = [...prev.imagePreviews];
      URL.revokeObjectURL(updatedPreviews[index]);
      updatedImages.splice(index, 1);
      updatedPreviews.splice(index, 1);
      return {
        ...prev,
        images: updatedImages,
        imagePreviews: updatedPreviews,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name_en || !formData.name_ar || !formData.description_en || !formData.description_ar || !formData.price || !formData.category) {
      toast.warning("يرجى ملء جميع الحقول المطلوبة");
      return;
    }

    if (formData.images.length === 0) {
      toast.warning("يرجى رفع صورة واحدة على الأقل");
      return;
    }

    const dataAdd = new FormData();
    dataAdd.append("name_en", formData.name_en);
    dataAdd.append("name_ar", formData.name_ar);
    dataAdd.append("description_en", formData.description_en);
    dataAdd.append("description_ar", formData.description_ar);
    dataAdd.append("price", formData.price);
    dataAdd.append("category", formData.category);
    formData.images.forEach((image) => dataAdd.append("images", image));

    try {
      const token=localStorage.getItem("token")
     const { data } = await axios.post(`${API}/addProduct`,
       dataAdd,
  { headers: { "Content-Type": "multipart/form-data", token } });


      if (data.success) {
        toast.success("تمت إضافة المنتج بنجاح");
        setFormData({
          name_en: "",
          name_ar: "",
          description_en: "",
          description_ar: "",
          price: "",
          category: "tablet",
          images: [],
          imagePreviews: [],
        });
        getAllProducts();
      } else {
        toast.warning("حدث خطأ أثناء الإضافة.");
      }
    } catch (error) {
      console.error("حدث خطأ أثناء الإضافة:", error);
      toast.error("خطأ في الخادم، يرجى المحاولة لاحقًا.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">إضافة منتج جديد</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="name_en"
          placeholder="Name (EN)"
          value={formData.name_en}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          name="name_ar"
          placeholder="الاسم (AR)"
          value={formData.name_ar}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <textarea
          name="description_en"
          placeholder="Description (EN)"
          value={formData.description_en}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <textarea
          name="description_ar"
          placeholder="الوصف (AR)"
          value={formData.description_ar}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <input
          type="number"
          name="price"
          placeholder="السعر"
          value={formData.price}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          required
          className="w-full border rounded px-3 py-2"
        >
          <option value="salon">salon</option>
          <option value="antrh">antrh</option>
          <option value="rokna">rokna</option>
        </select>

        <button
          type="button"
          onClick={() => fileInputRef.current.click()}
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
        >
          📸 تحميل الصور
        </button>

        <input
          type="file"
          name="images"
          accept="image/*"
          multiple
          onChange={handleChange}
          ref={fileInputRef}
          className="hidden"
        />

        <div className="grid grid-cols-3 gap-3">
          {formData.imagePreviews.map((src, index) => (
            <div key={index} className="relative">
              <img
                src={src}
                alt={`Preview ${index}`}
                className="w-full h-24 object-cover rounded"
              />
              <button
                type="button"
                onClick={() => handleRemoveImage(index)}
                className="absolute top-1 right-1 bg-red-600 text-white text-xs rounded-full px-2 py-1"
              >
                ×
              </button>
            </div>
          ))}
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
        >
          إضافة المنتج
        </button>
      </form>
    </div>
  );
};

export default AddItem;