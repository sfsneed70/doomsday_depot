import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_ME } from "../utils/queries";
import { ADD_TO_BASKET, REMOVE_FROM_BASKET } from "../utils/mutations";

const Cart: React.FC = () => {
  const { loading, error, data, refetch } = useQuery(GET_ME);
  const [addBasketItem] = useMutation(ADD_TO_BASKET);
  const [removeBasketItem] = useMutation(REMOVE_FROM_BASKET);
  const [basket, setBasket] = useState([]);
  const [basketTotal, setBasketTotal] = useState(0);

  useEffect(() => {
    if (data && data.me) {
      setBasket(data.me.basket);
      setBasketTotal(data.me.basketTotal);
    }
  }, [data]);

  const handleAddItem = async (productId: string) => {
    try {
      await addBasketItem({ variables: { productId, quantity: 1 } });
      refetch(); // Refresh the basket data
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveItem = async (productId: string) => {
    try {
      await removeBasketItem({ variables: { productId } });
      refetch(); // Refresh the basket data
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="cart-page">
      <h1>Your Cart</h1>
      {basket.length > 0 ? (
        <div className="cart-items">
          {basket.map((item: any) => (
            <div key={item.product._id} className="cart-item">
              <img src={item.product.imageUrl} alt={item.product.name} />
              <div className="item-details">
                <h2>{item.product.name}</h2>
                <p>Price: ${item.product.price.toFixed(2)}</p>
                <p>Quantity: {item.quantity}</p>
                <button onClick={() => handleAddItem(item.product._id)}>+</button>
                <button onClick={() => handleRemoveItem(item.product._id)}>-</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>Your cart is empty.</p>
      )}

      <div className="cart-summary">
        <h2>Cart Summary</h2>
        <p>Total: ${basketTotal.toFixed(2)}</p>
      </div>
    </div>
  );
};

export default Cart;

