import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { FaArrowLeft } from "react-icons/fa";
import { db } from "../firebase/firebase";
import Swal from "sweetalert2";

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
            placeholder="https://..."
            className="w-full mt-1 px-4 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
          />
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
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full mt-1 px-4 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
          >
            <option value="">Pilih kategori</option>
            <option value="elektronik">Elektronik</option>
            <option value="aksesoris">Aksesoris</option>
            <option value="lainnya">Lainnya</option>
          </select>
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
    </div>
  );
}
