import type { IProduct } from "../interfaces/Product";
import { Link } from "react-router-dom";

const Product = ({
  _id,
  name,
  description,
  // image,
  price,
  stock,
  // reviews,
  reviewCount,
  rating,
}: IProduct) => {
  return (
    <>
      <div>
        <Link className="" to={`/product/${_id}`}>
          {name}{" "}
        </Link>
        <p>{description}</p>
        <p>${price}</p>
        <p>Stock: {stock}</p>
      </div>
      <div>
        <p>
          {rating} Stars ({reviewCount} reviews)
        </p>
      </div>
    </>
  );
}

export default Product;
