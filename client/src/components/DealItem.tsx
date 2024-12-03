import { NavLink } from "react-router-dom";
import { Star } from "lucide-react";

type DealItemProps = {
    deal: {
        id: number;
        name: string;
        price: number;
        rating: number;
        ratingCount: number;
        imageUrl: string;
    }
};

const DealItem: React.FC<DealItemProps> = ({ deal }) => {
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

    const formattedRating = deal.rating % 1 === 0 ? deal.rating.toFixed(0) : deal.rating.toFixed(1);

    return (
        <div className="relative overflow-hidden h-96 w-full rounded-lg group bg-white shadow-lg">
            <NavLink to={`/deals/${deal.id}`} className="block w-full h-full" // change link to actual route
            >
                <div className="w-full h-full cursor-pointer">
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900 opacity-50 z-10" />
                    <img
                        src={deal.imageUrl}
                        alt={deal.name}
                        className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
                        loading="lazy"
                    />
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-20">
                        <h3 className="text-white text-xl font-bold mb-2 truncate">{deal.name}</h3>
                        <p className="text-emerald-400 text-lg font-semibold">${deal.price.toFixed(2)}</p>
                        <div className="flex items-center mt-2">
                            {/* stars */}
                            <p className="text-white text-sm">
                            {formattedRating} <Star fill="yellow" className="inline h-5 w-5 text-yellow-400" /> ({deal.ratingCount.toLocaleString()})
                            </p>

                        </div>
                    </div>
                </div>
            </NavLink>

        </div>
    );
};

export default DealItem;