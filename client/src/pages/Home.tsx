import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { GET_ME, GET_CATEGORIES, GET_PRODUCTS } from "../utils/queries";
import { ADD_TO_BASKET } from "../utils/mutations";
import { Deal } from "../types";
import CategoryItem from "../components/CategoryItem";
import DealCarousel from "../components/DealCarousel";
import DealModal from "../components/DealModal";
import useToast from "../components/Toast";


const Home: React.FC = () => {
  const [selectedDeal, setSelectedDeal] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const [addBasketItem] = useMutation(ADD_TO_BASKET);
  const handleAddToCart = async (deal: Deal) => {
    await addBasketItem({
      variables: { productId: deal._id, quantity: 1 },
      refetchQueries: [{query: GET_ME }],
    });
  };

  // Fetch categories using the Apollo Client query
  const { loading: loadingCategories, error: errorCategories, data: dataCategories } = useQuery(GET_CATEGORIES);
  const { loading: loadingProducts, error: errorProducts, data: dataProducts } = useQuery(GET_PRODUCTS);

  useToast({
    loading: loadingCategories || loadingProducts,
    error: errorCategories || errorProducts,
    loadingMessage: "Loading categories and products...",
    errorMessage: errorCategories?.message || errorProducts?.message
  })

  if (loadingCategories || loadingProducts) return <div>Loading categories and products...</div>;

  // Fetch products for deal carousel
  let deals = [];
  if (dataProducts && dataProducts.products) {
    deals = dataProducts.products.filter((product: Deal) => product.onSale).map((product: Deal) => ({
      _id: product._id,
      name: product.name,
      price: product.price,
      salePrice: product.salePrice,
      imageUrl: product.imageUrl,
      reviewCount: product.reviewCount,
      rating: product.rating,
      onSaleDate: product.onSaleDate,
      description: product.description,
      stock: product.stock,
    }));
  }

  const handleOpenModal = (deal: any) => {
    setSelectedDeal(deal);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedDeal(null);
  };

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
        {dataCategories && dataCategories.categories && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {dataCategories.categories.map((category: { _id: string, name: string, imageUrl: string }) => (
              <CategoryItem
                category={category}
                key={category._id}
              />
            ))}
          </div>
        )}


        {/* Deals Section */}
        <h2 className="text-center text 5xl sm:text-6xl font-bold text-emerald-400 mb-4 pt-16">
          Amazing Deals Daily
        </h2>
        <p className="text-center text-xl sm:text-xl font-bold text-gray-200 mb-12 italic leading-relaxed text-shadow-lg">
          Grab these exclusive deals before they're gone!
        </p>
        <DealCarousel deal={deals} onOpenModal={handleOpenModal} />
      </div>

      {/* Modal */}
      {
        isModalOpen && selectedDeal && (
          <DealModal
            deal={selectedDeal}
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onAddToCart={handleAddToCart}
          />
        )
      }
    </div>
  );
};

export default Home;