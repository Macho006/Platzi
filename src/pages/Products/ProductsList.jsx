import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

const api = import.meta.env.VITE_BASE_URL

const fetchProducts = async () => {
  const response = await fetch(`${api}/products`);
  if (!response.ok) {
    throw new Error("xatolik yuz berdi");
  }
  return response.json();
};

export default function ProductsList() {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["products"], 
    queryFn: fetchProducts, 
    staleTime: 1000 * 60 * 5, 
  });

  if (isLoading) {
    return (
      <div className="p-4">
        <h2 className="text-2xl font-bold mb-6">Mahsulotlar yuklanmoqda...</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, index) => (
            <div key={index} className="flex flex-col space-y-3">
              <Skeleton className="h-[200px] w-full rounded-xl" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-[250px]" />
                <Skeleton className="h-4 w-[200px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        Xatolik yuz berdi: {error.message}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold mb-8 text-center">Get Products</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {data?.map((product) => (
          <div key={product.id} className="flex flex-col justify-between rounded-lg border hover:shadow-lg transition-shadow duration-300">
            <CardHeader className="p-0">
               <div className="w-full overflow-hidden rounded-t-lg">
                  <img 
                    src={product.images[0]} 
                    alt={product.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e) => { e.target.src = "https://placehold.co/600x400"; }}
                  />
               </div>
            </CardHeader>
            <CardContent className="p-4 flex-grow">
              <div className="flex justify-between items-start mb-2">
                <Badge variant="secondary" className="mb-2">
                  {product.category?.name}
                </Badge>
                <span className="font-bold text-lg text-green-600">
                  ${product.price}
                </span>
              </div>
              
              <CardTitle className="text-lg mb-2 line-clamp-1">
                {product.title}
              </CardTitle>
              
              <CardDescription className="line-clamp-2 text-sm text-gray-500">
                {product.description}
              </CardDescription>
            </CardContent>
          </div>
        ))}
      </div>
    </div>
  );
}