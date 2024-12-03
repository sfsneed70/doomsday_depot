import { useQuery } from "@apollo/client";
import { GET_PRODUCTS } from "../utils/queries";
import Product from "./Product";
import type { IProduct } from "../interfaces/Product";

const ProductList = () => {
  const { loading, data, error } = useQuery(GET_PRODUCTS, {
    fetchPolicy: "cache-and-network",
  });

  const products = data?.products || [];
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {products &&
        products.map((product: IProduct) => (
          <div key={product._id}>
            <Product
              _id={product._id}
              name={product.name}
              description={product.description}
              image={product.image}
              price={product.price}
              stock={product.stock}
              reviews={product.reviews}
              reviewCount={product.reviewCount}
              rating={product.rating}
            />
            <hr />
          </div>
        ))}
      {error && <div>Error: {error.message}</div>}
    </div>
  );
};

export default ProductList;
