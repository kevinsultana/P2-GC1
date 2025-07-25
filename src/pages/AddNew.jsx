import { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa6";
import { addProduct } from "../redux/feature/productSlice";
import { useDispatch } from "react-redux";

import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";

export default function AddNew() {
  const [product, setProduct] = useState({
    name: "",
    description: "",
    price: "",
    stock: "",
    category: "",
    imgUrl: "",
  });
  const [loading, setLoading] = useState(false);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const [categories, setCategories] = useState([]);
  const [categoryLoading, setCategoryLoading] = useState(false);
  const [categoryError, setCategoryError] = useState(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchCategoriesFromFirebase = async () => {
    setCategoryLoading(true);
    setCategoryError(null);
    try {
      const q = query(collection(db, "categories"));
      const querySnap = await getDocs(q);
      const data = querySnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setCategoryError(error.message);
      Swal.fire(
        "Gagal",
        `Error fetching categories: ${error.message}`,
        "error"
      );
    } finally {
      setCategoryLoading(false);
    }
  };

  useEffect(() => {
    fetchCategoriesFromFirebase();
  }, []);

  const handleChange = async (e) => {
    const { name, value, files } = e.target;

    if (name === "imgUrl" && files[0]) {
      const file = files[0];
      setLoading(true);

      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "img-jpg");

      try {
        const res = await fetch(
          "https://api.cloudinary.com/v1_1/dpjdzqghj/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );

        const data = await res.json();

        if (data.secure_url) {
          setProduct((prev) => ({ ...prev, imgUrl: data.secure_url }));
          Swal.fire("Berhasil upload gambar!");
        } else {
          Swal.fire("Upload gagal:", data.error.message || "Unknown error");
        }
      } catch (error) {
        console.error("Upload error:", error);
        Swal.fire("Terjadi kesalahan saat upload.");
      } finally {
        setLoading(false);
      }
    } else {
      setProduct((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      Swal.fire("Nama kategori tidak boleh kosong!");
      return;
    }

    setCategoryLoading(true);
    setCategoryError(null);

    try {
      const categoriesRef = collection(db, "categories");
      const q = query(
        categoriesRef,
        where("name", "==", newCategoryName.trim().toLowerCase())
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        setCategoryError("Category already exists.");
        Swal.fire("Gagal", "Kategori sudah ada!", "error");
        return;
      }

      await addDoc(categoriesRef, {
        name: newCategoryName.trim().toLowerCase(),
        originalName: newCategoryName.trim(),
      });

      Swal.fire("Berhasil", "Kategori berhasil ditambahkan!", "success");
      setNewCategoryName("");
      setShowAddCategoryModal(false);
      fetchCategoriesFromFirebase();
    } catch (error) {
      console.error("Error adding category:", error);
      setCategoryError(error.message);
      Swal.fire(
        "Gagal",
        `Terjadi kesalahan saat menambahkan kategori: ${error.message}`,
        "error"
      );
    } finally {
      setCategoryLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !product.name ||
      !product.description ||
      !product.price ||
      !product.stock ||
      !product.category ||
      !product.imgUrl
    ) {
      Swal.fire("Semua field wajib diisi!");
      return;
    }

    setLoading(true);

    try {
      const actionResult = await dispatch(
        addProduct({
          ...product,
          price: Number(product.price),
          stock: Number(product.stock),
        })
      );

      if (addProduct.fulfilled.match(actionResult)) {
        Swal.fire("Berhasil", "Produk berhasil ditambahkan!", "success");
        navigate("/cms");
      } else {
        Swal.fire(
          "Gagal",
          `Gagal menambahkan produk: ${
            actionResult.payload || "Terjadi kesalahan tidak diketahui."
          }`,
          "error"
        );
      }
    } catch (error) {
      console.error("Error:", error);
      Swal.fire("Gagal menambahkan produk.");
    } finally {
      setLoading(false);
    }
  };

  if (loading || categoryLoading)
    return (
      <div className="bg-primaryLight dark:bg-primaryDark text-black dark:text-white w-full h-screen flex items-center justify-center">
        <span className="loading loading-dots loading-xl"></span>
      </div>
    );

  return (
    <div>
      <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow space-y-6">
        <div className="flex items-center gap-3">
          <FaArrowLeft
            onClick={() => navigate(-1)}
            className="cursor-pointer text-gray-800 dark:text-white"
          />
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Add New Product
          </h1>
        </div>

        <form className="space-y-4 text-black" onSubmit={handleSubmit}>
          {/* Nama Produk */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nama Produk
            </label>
            <input
              type="text"
              placeholder="Contoh: Headphone Wireless"
              className="mt-1 w-full px-4 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
              name="name"
              value={product.name}
              onChange={handleChange}
            />
          </div>

          {/* Deskripsi */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Deskripsi
            </label>
            <textarea
              rows={4}
              placeholder="Deskripsi produk..."
              className="mt-1 w-full px-4 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
              value={product.description}
              onChange={handleChange}
              name="description"
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Kategori
            </label>
            <div className="flex gap-2">
              <select
                value={product.category}
                onChange={handleChange}
                name="category"
                className="mt-1 w-full px-4 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
              >
                <option value="">Pilih kategori</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.name}>
                    {cat.originalName}
                  </option>
                ))}
              </select>
              <button
                type="button"
                onClick={() => setShowAddCategoryModal(true)}
                className="mt-1 px-4 py-2 bg-green-500 text-white rounded-md text-sm hover:bg-green-600"
              >
                +
              </button>
            </div>
            {categoryError && (
              <p className="text-red-500 text-xs mt-1">{categoryError}</p>
            )}
          </div>

          {/* Harga & Stok */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Harga (Rp)
              </label>
              <input
                type="number"
                className="mt-1 w-full px-4 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
                placeholder="contoh: 150000"
                value={product.price}
                onChange={handleChange}
                name="price"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Stok
              </label>
              <input
                type="number"
                className="mt-1 w-full px-4 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
                placeholder="contoh: 20"
                value={product.stock}
                onChange={handleChange}
                name="stock"
              />
            </div>
          </div>

          {/* Upload Gambar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Gambar Produk
            </label>
            {product.imgUrl ? (
              <img
                src={product.imgUrl}
                alt="product"
                className="w-48 h-48 object-cover mb-3"
              />
            ) : (
              <p className="text-sm text-gray-500 mb-3">
                Belum ada gambar dipilih.
              </p>
            )}
            <label className="flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-gray-300 rounded-md cursor-pointer dark:border-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
              <FaCloudUploadAlt className="w-6 h-6" />
              <span>Upload gambar (jpg, png)</span>
              <input
                type="file"
                name="imgUrl"
                onChange={handleChange}
                className="hidden"
              />
            </label>
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              onClick={() => navigate(-1)}
              type="button"
              className="px-4 py-2 rounded-md border text-sm dark:text-white dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              Batal
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
            >
              Simpan Produk
            </button>
          </div>
        </form>
      </div>

      {/* Add Category Modal */}
      {showAddCategoryModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-11/12 max-w-sm">
            <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
              Tambah Kategori Baru
            </h2>
            <input
              type="text"
              placeholder="Nama kategori..."
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              className="w-full px-4 py-2 border rounded-md text-sm text-black dark:bg-gray-700 dark:text-white dark:border-gray-600 mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowAddCategoryModal(false)}
                className="px-4 py-2 rounded-md border text-sm text-black dark:text-white dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                Batal
              </button>
              <button
                onClick={handleAddCategory}
                className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
              >
                Tambah
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
