import React, { createContext, useContext, useReducer } from "react";

interface Product {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  description: string;
}

interface CartState {
  cart: Product[];
}

interface CartAction {
  type: "ADD_TO_CART" | "REMOVE_FROM_CART";
  payload: Product;
}

const CartContext = createContext<{ state: CartState; dispatch: React.Dispatch<CartAction> } | undefined>(undefined);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "ADD_TO_CART":
      return { ...state, cart: [...state.cart, action.payload] };
    case "REMOVE_FROM_CART":
      return { ...state, cart: state.cart.filter((item) => item._id !== action.payload._id) };
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { cart: [] });

  return <CartContext.Provider value={{ state, dispatch }}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
