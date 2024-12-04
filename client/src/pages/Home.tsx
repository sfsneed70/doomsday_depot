import { useQuery } from "@apollo/client";
import { GET_CATEGORIES, GET_PRODUCTS } from "../utils/queries";
import CategoryItem from "../components/CategoryItem";
import DealCarousel from "../components/DealCarousel";

const Home = () => {
  // Fetch categories using the Apollo Client query
  const { loading: loadingCategories, error: errorCategories, data: dataCategories } = useQuery(GET_CATEGORIES);
  const { loading: loadingProducts, error: errorProducts, data: dataProducts } = useQuery(GET_PRODUCTS);

  if (loadingCategories || loadingProducts) return <div>Loading categories...</div>;
  if (errorCategories) return <div>Error fetching categories: {errorCategories.message}</div>;
  if (errorProducts) return <div>Error fetching products: {errorProducts.message}</div>;

  // Fetch products for deal carousel
  const deals = dataProducts.products.filter((product: any) => product.onSale).map((product: any) => ({
    id: product._id,
    name: product.name,
    price: product.price,
    salePrice: product.salePrice,
    imageUrl: product.imageUrl,
    reviewCount: product.reviewCount,
    rating: product.rating,
  }));

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">

        {/* Categories Section */}
        <h1 className="text-center text 5xl sm:text-6xl font-bold text-emerald-400 mb-4">
          Categories
        </h1>
        <p className="text-center text-xl sm:text-xl font-bold text-gray-200 mb-12 italic leading-relaxed text-shadow-lg">
        "Welcome to Doomsday Depot – Where Survival Meets Style. Gear up, the end is near, but your journey starts here!"
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {dataCategories.categories.map((category: { _id: string, name: string, imageUrl: string }) => (
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
        <p className="text-center text-xl sm:text-xl font-bold text-gray-200 mb-12 italic leading-relaxed text-shadow-lg">
          Grab these exclusive deals before they're gone!
        </p>
        <DealCarousel deal={deals} />
      </div>
    </div>
  );
};

export default Home;