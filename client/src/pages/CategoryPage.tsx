import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CATEGORY_BY_NAME } from "../utils/queries";
import CategoryProductsDisplay from "../components/CategoryProductsDisplay";
import useToast from "../components/Toast";

interface Category {
  name: string;
  products: Product[];
}

interface Product {
  _id: string;
  name: string;
  imageUrl: string;
  description: string;
  price: number;
  stock: number;
}

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams<{ categoryName: string }>();

  if (!categoryName) {
    return <p className="text-red-500">Error: No category name provided in the URL.</p>;
  }

  const { loading, error, data } = useQuery<{ categoryByName: Category }>(GET_CATEGORY_BY_NAME, {
    variables: { categoryName },
  });

  useToast({
    loading,
    error,
  })

  const category = data?.categoryByName;

  if (!category || category.products.length === 0) {
    return (
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">{category?.name || "Unknown Category"}</h1>
        <p className="text-gray-500">No products found in this category.</p>
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{category.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {category.products.map((product) => (
          <CategoryProductsDisplay key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;

 



