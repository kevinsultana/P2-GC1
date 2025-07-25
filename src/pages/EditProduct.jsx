import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import {
  collection,
  addDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { FaArrowLeft } from "react-icons/fa";
import { db } from "../firebase/firebase";
import Swal from "sweetalert2";
import CloudinaryUploadBtn from "../components/CloudinaryUploadBtn";
import { FileUploaderRegular } from "@uploadcare/react-uploader";
import "@uploadcare/react-uploader/core.css";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    price: "",
    stock: "",
    category: "",
    description: "",
    imgUrl: "",
  });
  const [loading, setLoading] = useState(true);
  const [showAddCategoryModal, setShowAddCategoryModal] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const [categories, setCategories] = useState([]);

  const fetchCategoriesFromFirebase = async () => {
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
      Swal.fire(
        "Gagal",
        `Error fetching categories: ${error.message}`,
        "error"
      );
    }
  };

  useEffect(() => {
    fetchCategoriesFromFirebase();
  }, []);

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) {
      Swal.fire("Nama kategori tidak boleh kosong!");
      return;
    }

    try {
      const categoriesRef = collection(db, "categories");
      const q = query(
        categoriesRef,
        where("name", "==", newCategoryName.trim().toLowerCase())
      );
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
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
      Swal.fire(
        "Gagal",
        `Terjadi kesalahan saat menambahkan kategori: ${error.message}`,
        "error"
      );
    }
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "product", id);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setForm({ ...docSnap.data() });
        } else {
          Swal.fire("Produk tidak ditemukan");
          navigate("/cms");
        }
      } catch (error) {
        console.error("Gagal fetch:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchProduct();
  }, [id, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateDoc(doc(db, "product", id), {
        ...form,
        price: Number(form.price),
        stock: Number(form.stock),
      });
      Swal.fire("Produk berhasil diperbarui!");
      navigate("/cms");
    } catch (error) {
      console.error("Gagal update:", error);
      Swal.fire("Gagal update produk.");
    }
  };

  if (loading)
    return (
      <p className="text-center text-gray-700 dark:text-white mt-10">
        Loading...
      </p>
    );

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow space-y-6">
      <div className="flex items-center gap-3">
        <FaArrowLeft
          className="text-gray-500 dark:text-gray-300 cursor-pointer"
          onClick={() => navigate(-1)}
        />
        <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
          Edit Produk
        </h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Gambar Produk
          </label>
          {form.imgUrl && (
            <img
              src={form.imgUrl}
              alt={form.name}
              className="w-60 h-60 object-cover rounded-2xl"
            />
          )}
          <input
            name="imgUrl"
            value={form.imgUrl}
            onChange={handleChange}
            type="text"
            disabled={true}
            placeholder="https://..."
            className="w-full mt-1 px-4 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
          <div className="flex items-center justify-center gap-6">
            <CloudinaryUploadBtn
              setImgUrl={(i) => setForm({ ...form, imgUrl: i })}
            />
            <FileUploaderRegular
              sourceList="local, camera, facebook, gdrive"
              pubkey="f8300ab6fd057a0cbcb8"
              onFileUploadSuccess={(result) => {
                setForm({ ...form, imgUrl: result.cdnUrl });
              }}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Nama Produk
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            type="text"
            className="w-full mt-1 px-4 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Deskripsi
          </label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full mt-1 px-4 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Harga (Rp)
            </label>
            <input
              name="price"
              value={form.price}
              onChange={handleChange}
              type="number"
              className="w-full mt-1 px-4 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Stok
            </label>
            <input
              name="stock"
              value={form.stock}
              onChange={handleChange}
              type="number"
              className="w-full mt-1 px-4 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Kategori
          </label>
          <div className="flex gap-2 items-center ">
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full mt-1 px-4 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
            >
              <option value="">Pilih kategori</option>
              {categories.map((category) => (
                <option key={category.id} value={category.name}>
                  {category.name}
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
        </div>

        <div className="flex justify-end gap-3 pt-4">
          <button
            type="button"
            onClick={() => navigate("/cms")}
            className="px-4 py-2 rounded-md border text-sm dark:text-white dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            Batal
          </button>
          <button
            type="submit"
            className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
          >
            Simpan Perubahan
          </button>
        </div>
      </form>
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
