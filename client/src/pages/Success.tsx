import { ArrowRight, CheckCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { GET_ME } from "../utils/queries";
import { CLEAR_BASKET } from "../utils/mutations";
import Confetti from "react-confetti";
import useToast from "../components/Toast";

const PurchaseSuccessPage: React.FC = () => {
    const { data, loading, error } = useQuery(GET_ME);
    const [clearBasket] = useMutation(CLEAR_BASKET, {
        refetchQueries: [{query: GET_ME}],
        awaitRefetchQueries: true,
    });
    const [purchasedDetails, setPurchasedDetails] = useState<{
        basket: any[];
        basketTotal: Number;
    }>({ basket: [], basketTotal: 0 });

    useEffect(() => {
        if (data?.me && purchasedDetails.basket.length === 0) {
            setPurchasedDetails({
                basket: data.me.basket,
                basketTotal: data.me.basketTotal
            });

            clearBasket().catch((err) => console.error("Error clearing basket: ", err));
        }
    }, [data]);

    useToast({
        loading,
        error,
    })

    const { basket, basketTotal } = purchasedDetails;

    return (
        <div className="h-screen flex items-center justify-center px-4">
            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
                gravity={0.1}
                style={{ zIndex: 99 }}
                numberOfPieces={700}
                recycle={false}
            />

            <div className="max-w-md w-full bg-gray-800 rounded-lg shadow-xl overflow-hidden relative z-10">
                <div className="p-6 sm:p-8">
                    <div className="flex justify-center">
                        <CheckCircle className="text-emerald-400 w-16 h-16 mb-4" />
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-bold text-center text-emerald-400 mb-2">
                        Purchase Successful!
                    </h1>
                    <p className="text-gray-300 text-center mb-2">
                        Thank you for your order. {"We're"} processing it now.
                    </p>

                    <div className="bg-gray-700 rounded-lg p-4 mb-6">
                        {basket.map((item: any) => (
                            <div key={item._id} className="flex items-center mb-4">
                                <img
                                    src={item.product.imageUrl}
                                    alt={item.product.name}
                                    className="w-20 h-20 object-cover rounded-md mr-4"
                                />

                                <div className="flex-1 text-right">
                                    <p className="text-emerald-400 font-bold">{item.product.name}</p>
                                    <p className="text-gray-400">Price: ${item.product.price.toFixed(2)}</p>
                                    <p className="text-gray-400">Quantity: {item.quantity}</p>
                                </div>
                            </div>
                        ))}
                        <hr className="border-gray-600 my-4" />
                        <p className="text-lg text-emerald-400 font-bold text-right">
                            Total: ${basketTotal.toFixed(2)}
                        </p>
                    </div>

                    <div className="space-y-4">
                        <NavLink
                            to={"/"}
                            className="w-full bg-gray-700 hover:bg-gray-600 text-emerald-400 font-bold py-2 px-4 
              rounded-lg transition duration-300 flex items-center justify-center"
                        >
                            Continue Shopping
                            <ArrowRight className="ml-2" size={18} />
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PurchaseSuccessPage;