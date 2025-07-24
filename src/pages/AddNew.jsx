import React from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

export default function AddNew() {
  return (
    <div>
      <div className="max-w-3xl mx-auto p-6 bg-white dark:bg-gray-900 rounded-xl shadow space-y-6">
        <div className="flex items-center gap-3">
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Add New Product
          </h1>
        </div>

        <form className="space-y-4">
          {/* Nama Produk */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Nama Produk
            </label>
            <input
              type="text"
              placeholder="Contoh: Headphone Wireless"
              className="mt-1 w-full px-4 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
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
            />
          </div>

          {/* Kategori */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Kategori
            </label>
            <select className="mt-1 w-full px-4 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700">
              <option value="">Pilih kategori</option>
              <option value="elektronik">Elektronik</option>
              <option value="aksesoris">Aksesoris</option>
              <option value="lainnya">Lainnya</option>
            </select>
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
              />
            </div>
          </div>

          {/* Upload Gambar */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Gambar Produk
            </label>
            <label className="flex items-center justify-center gap-2 px-4 py-8 border-2 border-dashed border-gray-300 rounded-md cursor-pointer dark:border-gray-600 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800">
              <FaCloudUploadAlt className="w-6 h-6" />
              <span>Upload gambar (jpg, png)</span>
              <input type="file" className="hidden" />
            </label>
          </div>

          {/* Tombol Aksi */}
          <div className="flex justify-end gap-3 pt-4">
            <button
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
    </div>
  );
}
