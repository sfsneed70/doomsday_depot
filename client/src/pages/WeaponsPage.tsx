import React from "react";
import { useQuery } from "@apollo/client";
import { GET_CATEGORY } from "../utils/queries"; // Adjust path as needed

const WeaponsPage: React.FC = () => {
  // Replace "weapons-category-id" with the actual ID of your "Weapons" category
  const { loading, error, data } = useQuery(GET_CATEGORY, {
    variables: { categoryId: "674fabc8dda05c5eede30216" },
  });

  if (loading) return <p>Loading weapons...</p>;
  if (error) return <p>Error loading weapons: {error.message}</p>;

  const category = data.category;

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{category.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {category.products.map((product: any) => (
          <div
            key={product._id}
            className="relative overflow-hidden h-96 w-full rounded-lg group shadow-lg"
          >
            <div className="w-full h-full cursor-pointer">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                <h3 className="text-white text-2xl font-bold mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-200 text-sm">{product.description}</p>
                <p className="text-gray-200 text-sm font-semibold mt-2">
                  <span>Price: </span>${product.price.toFixed(2)}
                </p>
                <p className="text-gray-200 text-sm font-semibold">
                  <span>Stock: </span>{product.stock} left
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeaponsPage;
