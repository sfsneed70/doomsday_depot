import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { GET_CATEGORY_BY_NAME } from "../utils/queries";
import CategoryProductsDisplay from "../components/CategoryProductsDisplay";

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
    return <p>Error: No category name provided in the URL.</p>;
  }

  const { loading, error, data } = useQuery(GET_CATEGORY_BY_NAME, {
    variables: { categoryName }, 
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const category = data.categoryByName;
  const products: Product[] = category.products;

  if (!category || !products) {
    return <p>Error: Unable to load category or products.</p>;
  }

  if (products.length === 0) {
    return <p>No products found in this category.</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">{category.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <CategoryProductsDisplay key={product._id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default CategoryPage;
 



