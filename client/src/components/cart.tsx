// // // {/* User Logged In */ }
// // // {
// // //     loggedIn ? (
// // //                 <>
// // //             <NavLink
// // //                 to="/cart"
// // //                 className="relative group text-gray-300 hover:text-emerald-400 transition duration-300 ease-in-out"
// // //             >
// // //                 <ShoppingCart className="mr-1" size={25} />
// // //                 {cart.length > 0 && (
// // //                     <span
// // //                         className='absolute -top-2 -left-2 bg-emerald-500 text-white rounded-full px-2 py-0.5 
// // //                                       text-xs group-hover:bg-emerald-400 transition duration-300 ease-in-out'
// // //                     >
// // //                         {cart.length}
// // //                     </span>
// // //                 )}
// // //             </NavLink>

// import { useEffect } from 'react';
// import { loadStripe } from '@stripe/stripe-js';
// import { useLazyQuery } from '@apollo/client';
// import { GET_CHECKOUT } from '../utils/queries';
// // import { idbPromise } from '../../utils/helpers';
// // import CartItem from '../CartItem';
// import Auth from '../utils/auth';
// import { useDispatch, useSelector } from 'react-redux';
// // import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
// // import './style.css';

// const stripePromise = loadStripe('pk_test_51QRdlqK1v5m8j23imvztyNYobl3cLgVnYVkJGJWgX9ozmu2s1X8IbucEECd57G0bbUDHEoSfvDWP6xFx3fHLk2XH00OGPhRLkw');

// // const Cart = () => {
// //   const dispatch = useDispatch();
// //   const state = useSelector((state) => state);
// //   const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

// //   useEffect(() => {
// //     if (data) {
// //       stripePromise.then((res) => {
// //         res.redirectToCheckout({ sessionId: data.checkout.session });
// //       });
// //     }
// //   }, [data]);

// //   useEffect(() => {
// //     async function getCart() {
// //       const cart = await idbPromise('cart', 'get');
// //       dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
// //     }

// //     if (!state.cart.length) {
// //       getCart();
// //     }
// //   }, [state.cart.length, dispatch]);

// //   function toggleCart() {
// //     dispatch({ type: TOGGLE_CART });
// //   }

// //   function calculateTotal() {
// //     let sum = 0;
// //     state.cart.forEach((item) => {
// //       sum += item.price * item.purchaseQuantity;
// //     });
// //     return sum.toFixed(2);
// //   }

// //   function submitCheckout() {
// //     const productIds = [];

// //     state.cart.forEach((item) => {
// //       for (let i = 0; i < item.purchaseQuantity; i++) {
// //         productIds.push(item._id);
// //       }
// //     });

// //     getCheckout({
// //       variables: { products: productIds },
// //     });
// //   }

// //   if (!state.cartOpen) {
// //     return (
// //       <div className="cart-closed" onClick={toggleCart}>
// //         <span role="img" aria-label="trash">
// //           🛒
// //         </span>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="cart">
// //       <div className="close" onClick={toggleCart}>
// //         [close]
// //       </div>
// //       <h2>Shopping Cart</h2>
// //       {state.cart.length ? (
// //         <div>
// //           {state.cart.map((item) => (
// //             <CartItem key={item._id} item={item} />
// //           ))}

// //           <div className="flex-row space-between">
// //             <strong>Total: ${calculateTotal()}</strong>

// //             {Auth.loggedIn() ? (
// //               <button onClick={submitCheckout}>Checkout</button>
// //             ) : (
// //               <span>(log in to check out)</span>
// //             )}
// //           </div>
// //         </div>
// //       ) : (
// //         <h3>
// //           <span role="img" aria-label="shocked">
// //             😱
// //           </span>
// //           You haven't added anything to your cart yet!
// //         </h3>
// //       )}
// //     </div>
// //   );
// // };

// // export default Cart;