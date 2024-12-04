import React from "react";

interface CategoryProductsDisplayProps {
  product: {
    _id: string;
    name: string;
    imageUrl: string;
    description: string;
    price: number;
    stock: number;
  };
}

const CategoryProductsDisplay: React.FC<CategoryProductsDisplayProps> = ({ product }) => {
  return (
    <div
      key={product._id}
      className="relative overflow-hidden h-96 w-full rounded-lg group shadow-lg"
    >
      <div className="w-full h-full cursor-pointer">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10" />
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          loading="lazy"
        />
        <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
          <h3 className="text-white text-2xl font-bold mb-2">{product.name}</h3>
          <p className="text-gray-200 text-sm">{product.description}</p>
          <p className="text-gray-200 text-sm font-semibold mt-2">
            <span>Price: </span>${product.price.toFixed(2)}
          </p>
          <p className="text-gray-200 text-sm font-semibold">
            <span>Stock: </span>
            {product.stock} left
          </p>
        </div>
      </div>
    </div>
  );
};

export default CategoryProductsDisplay;
