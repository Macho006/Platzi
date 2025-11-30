import { useEffect, useState } from "react";
import { api } from "@/lib/axios";

export default function App() {
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
    <div className="p-5">
      <h1 className="text-2xl font-bold mt-10 mb-4">Users</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6  gap-4">
        {users.map((u) => (
          <div
            key={u.id}
            className="w-[200px] p-3 border border-gray-300 rounded"
          >
            <h3 className="font-semibold mb-1">{u.name}</h3>
            <p className="text-gray-600 mb-2">{u.email}</p>

            <img
              src={u.avatar}
              alt={u.name}
              className="w-20 h-20 rounded-full object-cover"
            />
          </div>
        ))}
      </div>

      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6  gap-4">
        {products.map((p) => (
          <div
            key={p.id}
            className="w-[200px] p-3 border border-gray-300 rounded"
          >
            <h3 className="font-semibold mb-2">{p.title}</h3>

            <img
              src={p.images?.[0]}
              alt={p.title}
              className="w-full h-[120px] object-cover mb-2"
            />

            <p className="text-gray-700">Price: ${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );

}
