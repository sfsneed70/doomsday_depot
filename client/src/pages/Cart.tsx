import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/client";
import { GET_ME, GET_PRODUCT, GET_CHECKOUT } from "../utils/queries";
import { ADD_TO_BASKET, DECREMENT_BASKET_ITEM } from "../utils/mutations";
import { IBasketItem } from "../interfaces/BasketItem";
import useToast from "../components/Toast";
import { loadStripe } from "@stripe/stripe-js";

const stripePublicKey = `pk_test_51QRdlqK1v5m8j23imvztyNYobl3cLgVnYVkJGJWgX9ozmu2s1X8IbucEECd57G0bbUDHEoSfvDWP6xFx3fHLk2XH00OGPhRLkw`;
const stripePromise = loadStripe(stripePublicKey);

const Cart: React.FC = () => {
  const { loading, data, error, refetch } = useQuery(GET_ME, {
    fetchPolicy: "cache-and-network",
  });

  const [addToBasket] = useMutation(ADD_TO_BASKET);
  const [decrementBasketItem] = useMutation(DECREMENT_BASKET_ITEM);
  const [getCheckout, { data: checkoutData, loading: checkoutLoading }] = useLazyQuery(GET_CHECKOUT);
  const [getProductDetails] = useLazyQuery(GET_PRODUCT);
  const [basket, setBasket] = useState<IBasketItem[]>([]);
  const [basketTotal, setBasketTotal] = useState(0);

  useToast({ loading, checkoutLoading, error });

  useEffect(() => {
    if (data && data.me) {
      setBasket(data.me.basket);
      setBasketTotal(data.me.basketTotal);
    }
  }, [data]);

  const fetchSalePrice = async (productId: string) => {
    try {
      const { data: productData } = await getProductDetails({ variables: { productId } });
      if (productData && productData.product) {
        setBasket((prevBasket) =>
          prevBasket.map((item: IBasketItem) =>
            item.product._id === productId
              ? { ...item, product: { ...item.product, ...productData.product } }
              : item
          )
        );
      }
    } catch (err) {
      console.error("Error fetching product details:", err);
    }
  };

  useEffect(() => {
    basket.forEach((item: IBasketItem) => {
      if (item.product.salePrice === undefined) {
        fetchSalePrice(item.product._id);
      }
    });
  }, [basket]);

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

  const handleCheckout = async () => {
    try {
      const products = basket.flatMap((item: IBasketItem) => Array(item.quantity).fill(item.product._id));
      await getCheckout({ variables: { products } });
    } catch (err) {
      console.error("Error during checkout: ", err);
    }
  };

  useEffect(() => {
    if (checkoutData && checkoutData.checkout) {
      stripePromise.then((stripe) => {
        if (stripe) {
          stripe.redirectToCheckout({ sessionId: checkoutData.checkout.sessionId });
        }
      });
    }
  }, [checkoutData]);

  return (
    <div className="bg-gradient-to-b from-gray-900 to-gray-800 min-h-screen p-6 text-gray-200">
      <h1 className="text-3xl font-bold text-emerald-400 mb-6">Your Cart</h1>

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
                  <h2 className="text-xl font-semibold text-emerald-400">
                    {item.product.name}
                  </h2>
                  <p className="text-gray-300">
                    Price:{" "}
                    <span className="font-medium">
                      ${item.product.salePrice?.toFixed(2) || item.product.price.toFixed(2)}
                    </span>
                  </p>
                  <p className="text-gray-300">
                    Quantity: <span className="font-medium">{item.quantity}</span>
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="bg-emerald-500 hover:bg-emerald-600 text-white py-2 px-3 rounded-md"
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
            <h2 className="text-2xl font-bold text-emerald-400 mb-4">Cart Summary</h2>
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

