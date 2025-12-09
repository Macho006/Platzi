import { useEffect, useState } from "react";
import { api } from "@/lib/axios";
import CreateProduct from "@/pages/create product";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);

  const getProducts = async () => {
    const res = await api.get("products");
    setProducts(res.data);
  };

  const getUsers = async () => {
    const res = await api.get("users");
    setUsers(res.data);
  };

  useEffect(() => {
    getProducts();
    getUsers();
  }, []);

  return (
    <div className="p-5 flex flex-col items-center justify-center w-full">
      <CreateProduct onProductCreated={getProducts} />

      <h1 className="text-3xl font-bold mt-10 mb-6">Users</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full max-w-7xl">
        {users.map((u) => (
          <div
            key={u.id}
            className="bg-white shadow-md hover:shadow-lg transition-shadow rounded-xl p-4 flex flex-col items-center text-center border border-gray-200"
          >
            <img
              src={u.avatar}
              alt={u.name}
              className="w-28 h-28 object-cover rounded-full mb-4"
            />

            <h3 className="text-lg font-semibold">{u.name}</h3>
            <p className="text-gray-500">{u.email}</p>
            <span className="mt-2 px-3 py-1 text-sm rounded-full bg-gray-100 text-gray-700">
              {u.role}
            </span>
          </div>
        ))}
      </div>

      <h1 className="text-3xl font-bold mt-16 mb-6">Products</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 w-full max-w-7xl">
        {products.map((p) => (
          <div
            key={p.id}
            className="bg-white border border-gray-200 rounded-xl p-4 shadow-md hover:shadow-lg transition-shadow"
          >
            <img
              src={p.images?.[0]}
              alt={p.title}
              className="w-full h-36 object-cover rounded-md mb-4"
            />

            <h3 className="font-semibold text-lg mb-2">{p.title}</h3>
            <p className="text-gray-700 mb-1">💲 <b>{p.price}</b></p>
            <p className="text-gray-500 text-sm line-clamp-3">
              {p.description}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
