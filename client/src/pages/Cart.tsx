import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_ME } from "../utils/queries";
import { ADD_TO_BASKET, DECREMENT_BASKET_ITEM } from "../utils/mutations";
import { IBasketItem } from "../interfaces/BasketItem";

const Cart: React.FC = () => {
  // const { loading, error, data, refetch } = useQuery(GET_ME);
  const { loading, data, error, refetch } = useQuery(GET_ME, {
    fetchPolicy: "cache-and-network",
  });

  const [addToBasket] = useMutation(ADD_TO_BASKET);
  const [decrementBasketItem] = useMutation(DECREMENT_BASKET_ITEM);
  const [basket, setBasket] = useState([]);
  const [basketTotal, setBasketTotal] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    if (data && data.me) {
      setBasket(data.me.basket);
      setBasketTotal(data.me.basketTotal);
    }
  }, [data]);

  const handleAddToBasket = async (productId: string) => {
    try {
      await addToBasket({ variables: { productId, quantity: 1 } });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemoveFromBasket = async (productId: string) => {
    try {
      await decrementBasketItem({ variables: { productId } });
      refetch();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckout = () => {
    navigate("/checkout");
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen p-6 text-gray-200">
      <h1 className="text-3xl font-bold text-green-400 mb-6">Your Cart</h1>

      {basket.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="cart-items space-y-6">
            {basket.map((item: IBasketItem) => (
              <div
                key={item.product._id}
                className="bg-gray-800 rounded-lg shadow-lg flex items-center p-4"
              >
                <img
                  src={item.product.imageUrl}
                  alt={item.product.name}
                  className="h-24 w-24 object-cover rounded-md"
                />
                <div className="ml-4 flex-1">
                  <h2 className="text-xl font-semibold text-green-400">
                    {item.product.name}
                  </h2>
                  <p className="text-gray-300">
                    Price:{" "}
                    <span className="font-medium">${item.product.price.toFixed(2)}</span>
                  </p>
                  <p className="text-gray-300">
                    Quantity: <span className="font-medium">{item.quantity}</span>
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white py-2 px-3 rounded-md"
                    onClick={() => handleAddToBasket(item.product._id)}
                  >
                    +
                  </button>
                  <button
                    className="bg-red-500 hover:bg-red-600 text-white py-2 px-3 rounded-md"
                    onClick={() => handleRemoveFromBasket(item.product._id)}
                  >
                    -
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-green-400 mb-4">Cart Summary</h2>
            <p className="text-gray-300 text-lg">
              <span className="font-semibold">Total: </span>${basketTotal.toFixed(2)}
            </p>
            <button
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-md font-medium"
              onClick={handleCheckout}
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-300 text-lg">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;



