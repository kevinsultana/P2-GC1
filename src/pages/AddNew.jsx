import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useNavigate } from "react-router";
import Swal from "sweetalert2";
import { FaArrowLeft } from "react-icons/fa6";
import { addProduct } from "../redux/feature/productSlice";
import { useDispatch } from "react-redux";

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

  const navigate = useNavigate();
  const dispatch = useDispatch();

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

  if (loading)
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
            className="cursor-pointer"
          />
          <h1 className="text-2xl font-semibold text-gray-800 dark:text-white">
            Add New Product
          </h1>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
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
            <select
              value={product.category}
              onChange={handleChange}
              name="category"
              className="mt-1 w-full px-4 py-2 border rounded-md text-sm dark:bg-gray-800 dark:text-white dark:border-gray-700"
            >
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
    </div>
  );
}
