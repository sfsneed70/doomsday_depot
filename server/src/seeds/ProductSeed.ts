import mongoose from "mongoose";
import Product from "../models/Product.js";

const productData = [
  {
    name: "Axe",
    description: "A reliable hand tool for chopping wood or fighting off zombies.",
    imageUrl: "/Axe.svg",
    price: 29.99,
    stock: 50,
    dateCreated: new Date(),
    reviews: [
      {
        username: "woodcutter42",
        review: "Great for chopping wood and... other things.",
        rating: 5,
        dateCreated: new Date(),
      },
    ],
  },
  {
    name: "Sword",
    description: "A sharp blade for close combat situations.",
    imageUrl: "/Sword.svg",
    price: 99.99,
    stock: 30,
    dateCreated: new Date(),
    reviews: [
      {
        username: "knight45",
        review: "Feels like I'm a medieval knight in the apocalypse.",
        rating: 4,
        dateCreated: new Date(),
      },
    ],
  },
  {
    name: "First Aid Kit",
    description: "Essential medical supplies for treating injuries.",
    imageUrl: "/FirstAid.svg",
    price: 19.99,
    stock: 100,
    dateCreated: new Date(),
    reviews: [
      {
        username: "medic101",
        review: "Helped me treat a nasty cut while escaping zombies.",
        rating: 5,
        dateCreated: new Date(),
      },
    ],
  },
  {
    name: "Survival Kit",
    description: "Contains essential tools for surviving in the wilderness.",
    imageUrl: "/SurvivalKit.svg",
    price: 49.99,
    stock: 40,
    dateCreated: new Date(),
    reviews: [
      {
        username: "survivorMaster",
        review: "Had everything I needed to survive for days.",
        rating: 5,
        dateCreated: new Date(),
      },
    ],
  },
  {
    name: "Bow",
    description: "A silent ranged weapon ideal for hunting and combat.",
    imageUrl: "/Bow.svg",
    price: 79.99,
    stock: 20,
    dateCreated: new Date(),
    reviews: [
      {
        username: "archer99",
        review: "Super effective and great for staying stealthy.",
        rating: 4,
        dateCreated: new Date(),
      },
    ],
  },
  {
    name: "Machete",
    description: "A large blade perfect for clearing brush or fending off enemies.",
    imageUrl: "/Machete.svg",
    price: 39.99,
    stock: 60,
    dateCreated: new Date(),
    reviews: [
      {
        username: "jungleExplorer",
        review: "Strong and versatile. Never leave home without it.",
        rating: 5,
        dateCreated: new Date(),
      },
    ],
  },
  {
    name: "Scoped Rifle",
    description: "A long-range weapon with a high-powered scope for accuracy.",
    imageUrl: "/ScopedRifle.svg",
    price: 299.99,
    stock: 15,
    dateCreated: new Date(),
    reviews: [
      {
        username: "sniperHunter",
        review: "Perfect for picking off zombies from a safe distance.",
        rating: 5,
        dateCreated: new Date(),
      },
    ],
  },
];

const seedProducts = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect("mongodb://127.0.0.1:27017/e_shop_db", {

    });
    console.log("Connected to MongoDB");

    // Clear existing data
    await Product.deleteMany({});
    console.log("Cleared existing products");

    // Insert product seed data
    await Product.insertMany(productData);
    console.log("Seeded products successfully");
  } catch (err) {
    console.error("Error seeding data:", err);
  } finally {
    // Disconnecting from MongoDB
    mongoose.connection.close();
    console.log("Disconnected from MongoDB");
  }
};

seedProducts();
