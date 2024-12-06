import React, { useState, useEffect } from "react";
import { Star } from "lucide-react";
import dayjs from 'dayjs';
import { Deal } from "../types";


type DealItemProps = {
    deal: Deal;
    onOpenModal: (deal: Deal) => void;
};

const DealItem: React.FC<DealItemProps> = ({ deal, onOpenModal }) => {
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

    return (
        <>
            <div className="relative overflow-hidden h-96 w-full rounded-lg group bg-white shadow-lg"
                onClick={() => onOpenModal(deal)}>
                <div className="w-full h-full cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10" />
                    <img
                        src={deal.imageUrl}
                        alt={deal.name}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        loading="lazy"
                    />

                    {/* Display countdown */}
                    <div className="absolute top-0 left-0 right-0 p-4 z-20 flex items-center justify-end">
                        <p className="text-lg text-red-500 font-semibold" style={{ textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)' }}>
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
            </div>


        </>
    );
};


export default DealItem;