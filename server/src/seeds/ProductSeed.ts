import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";
import Category from "../models/Category.js";
import CategoryName from "../models/CategoryName.js"

// Load environment variables
dotenv.config();

const productData = {
  tools: [
    {
      name: "Axe",
      description: "Perfect for chopping wood or splitting zombie heads.",
      imageUrl: "https://m.media-amazon.com/images/I/71w3WlJslmL.__AC_SX300_SY300_QL70_FMwebp_.jpg",
      price: 34.99,
      stock: 50,
      onSaleDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      reviews: [
        {
          username: "SurvivalistSteve",
          review: "This axe is amazing! It's super sharp and durable.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        },
        {
          username: "ZombieHunter99",
          review: "I love this axe! It's great for taking out zombies.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        },
        {
          username: "ApocalypsePrepper",
          review: "This axe is a must-have for any survival kit.",
          rating: 4,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 2),
        },
        {
          username: "ZombieSlayer123",
          review: "This axe is awesome! It's sharp and well-balanced.",
          rating: 4,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
        },
      ],
    },
    {
      name: "Machete",
      description: "A versatile tool for clearing brush or slicing through zombies.",
      imageUrl: "https://m.media-amazon.com/images/I/71H2WtR4s-L._AC_UL320_.jpg",
      price: 39.99,
      stock: 60,
      reviews: [
        {
          username: "ZombieSlayer123",
          review: "This machete is awesome! It's sharp and well-balanced.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
        },
        {
          username: "SurvivalistSara",
          review: "I love this machete! It's great for clearing brush.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        },
        {
          username: "ApocalypsePrepper",
          review: "This machete is a must-have for any survival kit.",
          rating: 4,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 2),
        },
      ],
    },
    {
      name: "Deluxe Hammer",
      description: "Whack stuff... or just assert dominance in style.",
      imageUrl: "https://m.media-amazon.com/images/I/71g4u0BQZ+L._AC_UL320_.jpg",
      price: 25.99,
      stock: 30,
    },
  ],
  weapons: [
    {
      name: "Bow",
      description: "Silent, deadly, and great for stealth missions.",
      imageUrl: "https://m.media-amazon.com/images/I/61OP1BepnYL._AC_UL320_.jpg",
      price: 79.99,
      stock: 20,
      onSaleDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      reviews: [
        {
          username: "SurvivalistSteve",
          review: "This bow is amazing! It's super accurate and easy to use.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        },
        {
          username: "ZombieHunter99",
          review: "I love this bow! It's great for taking out zombies.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        },
        {
          username: "ApocalypsePrepper",
          review: "This bow is a must-have for any survival kit.",
          rating: 4,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 2),
        },
      ],
    },
    {
      name: "Scoped Rifle",
      description: "Long-range precision for the perfect headshot.",
      imageUrl: "https://m.media-amazon.com/images/I/616i4UdMm+L._AC_UL320_.jpg",
      price: 299.99,
      stock: 15,
      onSaleDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      reviews: [
        {
          username: "SurvivalistSteve",
          review: "This rifle is amazing! It's super accurate and powerful.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        },
        {
          username: "ZombieHunter99",
          review: "I love this rifle! It's great for taking out zombies from a distance.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        },
        {
          username: "ApocalypsePrepper",
          review: "This rifle is a must-have for any survival kit.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 2),
        },
        {
          username: "ZombieSlayer123",
          review: "This rifle is awesome! It's well-made and reliable.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
        },
        {
          username: "SurvivalistSara",
          review: "This rifle is amazing! It's super accurate and powerful.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        },
      ],
    },
    {
      name: "Sword",
      description: "Close-combat classic for any survivalist.",
      imageUrl: "https://m.media-amazon.com/images/I/51yns2R57oL._AC_UL320_.jpg",
      price: 99.99,
      stock: 30,
      onSaleDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      reviews: [
        {
          username: "SurvivalistSteve",
          review: "This sword is amazing! It's sharp and well-balanced.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        },
        {
          username: "ZombieHunter99",
          review: "I love this sword! It's great for close combat.",
          rating: 4,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        },
        {
          username: "ApocalypsePrepper",
          review: "This sword is a must-have for any survival kit.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 2),
        },
      ],
    },
  ],
  medical: [
    {
      name: "First Aid Kit",
      description: "Essential medical supplies to keep you alive.",
      imageUrl: "https://m.media-amazon.com/images/I/71fKX1BD5cL._AC_UL320_.jpg",
      price: 19.99,
      stock: 100,
      onSaleDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      reviews: [
        {
          username: "SurvivalistSteve",
          review: "This first aid kit is amazing! It has everything you need.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        },
        {
          username: "ZombieHunter99",
          review: "I love this first aid kit! It's great for treating injuries.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        },
        {
          username: "ApocalypsePrepper",
          review: "This first aid kit is a must-have for any survival kit.",
          rating: 4,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 2),
        },
        {
          username: "ZombieSlayer123",
          review: "This first aid kit is awesome! It's well-stocked and organized.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
        },
      ],
    },
    {
      name: "Deluxe First Aid Kit",
      description: "Everything you need for major or minor injuries.",
      imageUrl: "https://m.media-amazon.com/images/I/91b256XDiXL._AC_UL320_.jpg",
      price: 49.99,
      stock: 50,
    },
  ],
  shelter: [
    {
      name: "Survival Kit",
      description: "Contains essential tools for surviving any apocalypse.",
      imageUrl: "https://m.media-amazon.com/images/I/81C6VHe--jL._AC_UL320_.jpg",
      price: 49.99,
      stock: 40,
      onSaleDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      reviews: [
        {
          username: "SurvivalistSteve",
          review: "This survival kit is amazing! It has everything you need.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        },
        {
          username: "ZombieHunter99",
          review: "I love this survival kit! It's great for surviving in the wild.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        },
        {
          username: "ApocalypsePrepper",
          review: "This survival kit is a must-have for any survivalist.",
          rating: 4,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 2),
        },
        {
          username: "ZombieSlayer123",
          review: "This survival kit is awesome! It's well-stocked and organized.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
        },
      ],
    },
    {
      name: "Portable Shelter",
      description: "Stay safe and sound no matter where you end up.",
      imageUrl: "https://m.media-amazon.com/images/I/71AIHD5lPvL._AC_UY218_.jpg",
      price: 199.99,
      stock: 10,
    },
  ],
  cooking: [
    {
      name: "Zombie BBQ Grill",
      description: "Perfect for grilling steaks or zombie ribs.",
      imageUrl: "https://m.media-amazon.com/images/I/8173Azcsm2L._AC_UY218_.jpg",
      price: 149.99,
      stock: 15,
      onSaleDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      reviews: [
        {
          username: "SurvivalistSteve",
          review: "This grill is amazing! It cooks food perfectly.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        },
        {
          username: "ZombieHunter99",
          review: "I love this grill! It's great for cooking outdoors.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        },
        {
          username: "ApocalypsePrepper",
          review: "This grill is a must-have for any survival kit.",
          rating: 4,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 2),
        },
      ],
    },
    {
      name: "Portable Stove",
      description: "Cook meals on the go, wherever you are.",
      imageUrl: "https://m.media-amazon.com/images/I/71hYina6osL._AC_UY218_.jpg",
      price: 79.99,
      stock: 25,
    },
    {
      name: "Survival Cooking Kit",
      description: "Includes utensils, pans, and spice packs for gourmet meals.",
      imageUrl: "https://m.media-amazon.com/images/I/71+w63znCVL._AC_UL320_.jpg",
      price: 99.99,
      stock: 20,
    },
    {
      name: "Water Purification Tablets",
      description: "Make any water drinkable—even zombie swamp water.",
      imageUrl: "https://m.media-amazon.com/images/I/71dt0RnwKoL._AC_UL320_.jpg",
      price: 19.99,
      stock: 100,
      onSaleDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      reviews: [
        {
          username: "SurvivalistSteve",
          review: "These tablets are amazing! They make water taste great.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        },
        {
          username: "ZombieHunter99",
          review: "I love these tablets! They're great for purifying water.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        },
        {
          username: "ApocalypsePrepper",
          review: "These tablets are a must-have for any survival kit.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 2),
        },
        {
          username: "ZombieSlayer123",
          review: "These tablets are awesome! They work great and are easy to use.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
        },
      ],
    },
    {
      name: "Solar Oven",
      description: "Harness the power of the sun to bake your bread—or brains.",
      imageUrl: "https://m.media-amazon.com/images/I/81Uw6zfawzL._AC_UL320_.jpg",
      price: 249.99,
      stock: 10,
    },
    {
      name: "Collapsible Cooler",
      description: "Keep your food fresh while saving space.",
      imageUrl: "https://m.media-amazon.com/images/I/91+uwAVmB2L._AC_UL320_.jpg",
      price: 39.99,
      stock: 30,
    },
  ],
  clothes: [
    {
      name: "Zombie-Proof Jacket",
      description: "Stylish and bite-resistant, because safety never goes out of style.",
      imageUrl: "https://m.media-amazon.com/images/I/61Fyew+X5jL._AC_UL320_.jpg",
      price: 129.99,
      stock: 20,
      onSaleDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
      reviews: [
        {
          username: "SurvivalistSteve",
          review: "This jacket is amazing! It's stylish and durable.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        },
        {
          username: "ZombieHunter99",
          review: "I love this jacket! It's great for surviving in style.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        },
        {
          username: "ApocalypsePrepper",
          review: "This jacket is a must-have for any survivalist.",
          rating: 4,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 2),
        },
      ],
    },
    {
      name: "Camouflage Pants",
      description: "Blend in with the environment or hide from your ex.",
      imageUrl: "https://m.media-amazon.com/images/I/71Q3qu9gWoL._AC_UL320_.jpg",
      price: 49.99,
      stock: 30,
    },
    {
      name: "Combat Boots",
      description: "Kick harder and walk farther in apocalypse-approved footwear.",
      imageUrl: "https://m.media-amazon.com/images/I/71MihqvDdGL._AC_UL320_.jpg",
      price: 89.99,
      stock: 25,
      reviews: [
        {
          username: "SurvivalistSteve",
          review: "These boots are amazing! They're comfortable and durable.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        },
        {
          username: "ZombieHunter99",
          review: "I love these boots! They're great for surviving in the wild.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        },
        {
          username: "ApocalypsePrepper",
          review: "These boots are a must-have for any survival kit.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 2),
        },
        {
          username: "ZombieSlayer123",
          review: "These boots are awesome! They're well-made and sturdy.",
          rating: 4,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4),
        }
      ],
    },
    {
      name: "Thermal Undergarments",
      description: "Stay warm even when the world is chillingly cold.",
      imageUrl: "https://m.media-amazon.com/images/I/71-TGHniKaL._AC_UL320_.jpg",
      price: 39.99,
      stock: 40,
    },
    {
      name: "Bulletproof Vest",
      description: "For when you want to look cool AND stay alive.",
      imageUrl: "https://m.media-amazon.com/images/I/71J9PPb87tL._AC_UL320_.jpg",
      price: 249.99,
      stock: 10,
      reviews: [
        {
          username: "SurvivalistSteve",
          review: "This vest is amazing! It's lightweight and protective.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        },
        {
          username: "ZombieHunter99",
          review: "I love this vest! It's great for staying safe in dangerous situations.",
          rating: 5,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
        },
        {
          username: "ApocalypsePrepper",
          review: "This vest is a must-have for any survival kit.",
          rating: 4,
          dateCreated: new Date(Date.now() - 1000 * 60 * 60 * 2),
        },
      ],
    },
  ],
};

const seedDatabase = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/e_shop_db";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    await CategoryName.deleteMany({});
    console.log("Cleared existing data");

    // Seed products and categories
    for (const [categoryKey, products] of Object.entries(productData)) {
      const productDocs = await Product.insertMany(products);

      // Populate Category
      const category = new Category({
        name: categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1),
        imageUrl: `/${categoryKey}.jpg`,
        products: productDocs.map((product) => product._id),
      });
      await category.save();

      // Populate CategoryName
      const categoryName = new CategoryName({
        name: categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1),
        imageUrl: `/${categoryKey}.jpg`,
        products: productDocs.map((product) => product._id),
      });
      await categoryName.save();
    }

    console.log("Seeded categories and products successfully");
  } catch (err) {
    console.error("Error seeding database:", err);
  } finally {
    mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  }
};

seedDatabase();