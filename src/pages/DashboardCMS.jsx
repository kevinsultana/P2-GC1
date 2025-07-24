import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import {
  FaBoxOpen,
  FaClipboardList,
  FaShoppingCart,
  FaChartBar,
} from "react-icons/fa";
import { db } from "../firebase/firebase";
import { useNavigate } from "react-router";

export default function DashboardCMS() {
  const [products, setProducts] = useState([]);
  const [Loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const totalProduct = products?.length;
  const totalItem = products.reduce(
    (total, product) => total + product.stock,
    0
  );
  const totalModal = products.reduce(
    (total, product) => total + product.price * product.stock,
    0
  );

  const dataCard = [
    {
      label: "Total Produk",
      value: totalProduct,
      icon: <FaBoxOpen className="w-6 h-6" />,
    },
    {
      label: "Total Item",
      value: totalItem,
      icon: <FaClipboardList className="w-6 h-6" />,
    },
    {
      label: "Total Harga Barang",
      value: `Rp. ${totalModal.toLocaleString("id-ID")}`,
      icon: <FaShoppingCart className="w-6 h-6" />,
    },
    {
      label: "Total Pesanan",
      value: 100,
      icon: <FaChartBar className="w-6 h-6" />,
    },
  ];

  const getDataProducts = async () => {
    setLoading(true);
    try {
      const querySnap = await getDocs(collection(db, "product"));
      const data = querySnap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (id) => {
    navigate(`/cms/edit-product/${id}`);
  };

  useEffect(() => {
    getDataProducts();
  }, []);

  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-900 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white">
        Dashboard CMS
      </h1>

      {/* Card Dashboard */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        {dataCard.map((item, i) => (
          <div
            key={i}
            className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-md flex flex-col items-center transition"
          >
            <div className="text-indigo-600 dark:text-indigo-400 mb-2">
              {item.icon}
            </div>
            <h2 className="text-sm text-gray-600 dark:text-gray-300">
              {item.label}
            </h2>
            <p className="text-3xl font-bold text-gray-900 dark:text-white">
              {item.value}
            </p>
          </div>
        ))}
      </div>

      {/* Search & Filter */}
      <div className="flex flex-wrap items-center gap-4 mt-4">
        <input
          type="text"
          placeholder="Search product name..."
          className="px-4 py-2 border rounded-lg w-full sm:w-64 text-sm text-black dark:bg-gray-800 dark:text-white dark:border-gray-700"
        />
        <select className="px-4 py-2 border rounded text-sm text-black dark:bg-gray-800 dark:text-white dark:border-gray-700 space-y-3">
          <option value="">All Categories</option>
          <option value="elektronik">Elektronik</option>
          <option value="aksesoris">Aksesoris</option>
          <option value="aksesoris">Aksesoris</option>
          <option value="aksesoris">Aksesoris</option>
        </select>
      </div>

      {/* Table Item */}
      <div className="overflow-x-auto mt-6 rounded-xl border border-black bg-white dark:bg-gray-800">
        <table className="table-auto w-full text-left text-sm">
          <thead className="bg-gray-100 dark:bg-gray-700 text-black dark:text-gray-300 uppercase">
            <tr>
              <th className="px-6 py-3">No</th>
              <th className="px-6 py-3">Image</th>
              <th className="px-6 py-3">Name</th>
              <th className="px-6 py-3">Category</th>
              <th className="px-6 py-3">Price</th>
              <th className="px-6 py-3">stock</th>
              <th className="px-6 py-3">Action</th>
            </tr>
          </thead>
          <tbody>
            {Loading && <tr>Loading...</tr>}
            {products.map((item, index) => (
              <tr
                key={index}
                className="border-t hover:bg-gray-50 dark:hover:bg-gray-700 text-black dark:text-white"
              >
                <td className="px-6 py-3 border-r">{index + 1}</td>
                <td className="px-6 py-3 border-r">
                  <img
                    src={item.imgUrl}
                    alt={item.name}
                    className="w-32 h-32 object-cover rounded-md"
                  />
                </td>
                <td className="px-6 py-3 border-r">{item.name}</td>
                <td className="px-6 py-3 border-r">{item.category}</td>
                <td className="px-6 py-3 border-r">
                  Rp {item.price.toLocaleString()}
                </td>
                <td className="px-6 py-3 border-r">{item.stock}</td>
                <td className="px-6 py-3 space-x-2">
                  <button
                    onClick={() => handleEdit(item.id)}
                    className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 text-sm"
                  >
                    Edit
                  </button>
                  <button className="px-3 py-1 bg-rose-600 text-white rounded hover:bg-rose-700 text-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
