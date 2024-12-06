import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Star } from "lucide-react";
import dayjs from 'dayjs';


type DealItemProps = {
    deal: {
        id: number;
        name: string;
        price: number;
        salePrice: number;
        rating: number;
        reviewCount: number;
        imageUrl: string;
        onSaleDate: string;
    }
};

const DealItem: React.FC<DealItemProps> = ({ deal }) => {
    const formattedRating = deal.rating % 1 === 0 ? deal.rating.toFixed(0) : deal.rating.toFixed(1);
    const [countdown, setCountdown] = useState<string>('');

    const calculateCountdown = (saleDate: string) => {
        const saleTime = dayjs(parseInt(saleDate));
        const currentTime = dayjs();
        const timeRemaining = saleTime.diff(currentTime);

        if (timeRemaining <= 0) {
            return "Deal expired";
        }

        const days = saleTime.diff(currentTime, 'days');
        const hours = saleTime.diff(currentTime, 'hours') % 24;
        const minutes = saleTime.diff(currentTime, 'minutes') % 60;
        const seconds = saleTime.diff(currentTime, 'seconds') % 60;


        return `${days}d ${hours}h ${minutes}m ${seconds}s`;
    }

    useEffect(() => {
        const interval = setInterval(() => {
            setCountdown(calculateCountdown(deal.onSaleDate));
        }, 1000); // updates every second

        // Initial countdown
        setCountdown(calculateCountdown(deal.onSaleDate));

        return () => clearInterval(interval);
    }, [deal.onSaleDate]);

    // const fullStars = Math.floor(deal.rating);
    // const halfStar = deal.rating % 1 >= 0.5;
    // const emptyStars = 5 - Math.ceil(deal.rating);

    // {/* Render full stars */ }
    // {
    //     Array.from({ length: fullStars }, (_, index) => (
    //         <Star key={index} fill="yellow" strokeWidth={0} className="h-5 w-5" />
    //     ))
    // }
    // {/* Render half star if needed */ }
    // { halfStar && <StarHalf fill="yellow" strokeWidth={0} className="h-5 w-5" /> }
    // {/* Render empty stars */ }
    // {
    //     Array.from({ length: emptyStars }, (_, index) => (
    //         <Star key={index + fullStars + (halfStar ? 1 : 0)} fill="#111" strokeWidth={0} className="h-5 w-5" />
    //     ))
    // }
    // <span className="ml-2 text-sm text-gray-300">({deal.rating})</span>

    return (
        <div className="relative overflow-hidden h-96 w-full rounded-lg group bg-white shadow-lg">
            <NavLink to={`/product/${deal.name}`} className="block w-full h-full">
                <div className="w-full h-full cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10" />
                    <img
                        src={deal.imageUrl}
                        alt={deal.name}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        loading="lazy"
                    />

                    {/* Display countdown */}
                    <div className="absolute top-0 left-0 right-0 p-4 z-20 bg-black bg-opacity-50 flex items-center justify-between">
                        <p className="text-lg text-red-500 font-semibold">
                            Sale ends: {countdown}
                        </p>
                    </div>

                    {/* Info */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20 bg-black bg-opacity-50">
                        <h3 className="text-white text-xl font-bold mb-2 truncate">{deal.name}</h3>
                        <div className="flex items-center gap-2">
                            {/* Show original price with strikethrough if salePrice exists */}
                            {deal.salePrice ? (
                                <p className="text-red-500 text-lg line-through">
                                    ${deal.price.toFixed(2)}
                                </p>
                            ) : (
                                <p className="text-emerald-400 text-lg font-semibold">
                                    ${deal.price.toFixed(2)}
                                </p>
                            )}

                            {/* Show sale price if it exists */}
                            {deal.salePrice && (
                                <p className="text-emerald-400 text-lg font-semibold">
                                    ${deal.salePrice.toFixed(2)}
                                </p>
                            )}
                        </div>
                        <div className="flex items-center mt-2">
                            {/* Render rating */}
                            <p className="text-white text-sm">
                                {formattedRating} <Star fill="yellow" className="inline h-5 w-5 text-yellow-400" /> ({deal.reviewCount.toLocaleString()})
                            </p>
                        </div>

                    </div>
                </div>
            </NavLink>
        </div>
    );
};


export default DealItem;