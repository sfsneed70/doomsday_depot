import { useQuery } from "@apollo/client";
import { GET_CATEGORIES } from "../utils/queries";
import CategoryItem from "../components/CategoryItem";
import DealCarousel from "../components/DealCarousel";

const deals = [
  { id: 1, name: "1", price: 25.99, rating: 4, ratingCount: 1000, imageUrl: "/tools.jpg" },
  { id: 2, name: "2", price: 59.99, rating: 5, ratingCount: 750, imageUrl: "/powersupply.jpg" },
  { id: 3, name: "3", price: 19.99, rating: 4.5, ratingCount: 500, imageUrl: "/firstaid.jpg" },
  { id: 4, name: "4", price: 25.99, rating: 4, ratingCount: 1000, imageUrl: "/tools.jpg" },
  { id: 5, name: "5", price: 59.99, rating: 5, ratingCount: 750, imageUrl: "/powersupply.jpg" },
  { id: 6, name: "6", price: 19.99, rating: 4.5, ratingCount: 500, imageUrl: "/firstaid.jpg" },
  { id: 7, name: "7", price: 25.99, rating: 4, ratingCount: 1000, imageUrl: "/tools.jpg" },
  { id: 8, name: "8", price: 59.99, rating: 5, ratingCount: 750, imageUrl: "/powersupply.jpg" },
  { id: 9, name: "9", price: 19.99, rating: 4.5, ratingCount: 500, imageUrl: "/firstaid.jpg" },
];

const Home = () => {
  // Fetch categories using the Apollo Client query
  const { loading, error, data } = useQuery(GET_CATEGORIES);

  if (loading) return <div>Loading categories...</div>;
  if (error) return <div>Error fetching categories: {error.message}</div>;

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Categories Section */}
        <h1 className="text-center text 5xl sm:text-6xl font-bold text-emerald-400 mb-4">
          Categories
        </h1>
        <p className="text-center text-xl text-gray-300 mb-12">
          Apocalypse tagline
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data.categories.map((category: { _id: string, name: string, imageUrl: string }) => (
            <CategoryItem
              category={category}
              key={category._id}
            />
          ))}
        </div>

        {/* Deals Section */}
        <h2 className="text-center text 5xl sm:text-6xl font-bold text-emerald-400 mb-4 pt-16">
          Amazing Deals Daily
        </h2>
        <p className="text-center text-xl text-gray-300 mb-12">
          Grab these exclusive deals before they're gone!
        </p>
        <DealCarousel deal={deals} />
      </div>
    </div>
  );
};

export default Home;