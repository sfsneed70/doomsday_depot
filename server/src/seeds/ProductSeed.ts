import mongoose from "mongoose";
import Product from "../models/Product.js";
import Category from "../models/Category.js";

const productData = {
  tools: [
    {
      name: "Axe",
      description: "Perfect for chopping wood or splitting zombie heads.",
      imageUrl: "/Axe.svg",
      price: 34.99,
      stock: 50,
    },
    {
      name: "Machete",
      description: "A versatile tool for clearing brush or slicing through zombies.",
      imageUrl: "/Machete.svg",
      price: 39.99,
      stock: 60,
    },
    {
      name: "Deluxe Hammer",
      description: "Whack stuff... or just assert dominance in style.",
      imageUrl: "/DeluxeHammer.svg",
      price: 25.99,
      stock: 30,
    },
  ],
  weapons: [
    {
      name: "Bow",
      description: "Silent, deadly, and great for stealth missions.",
      imageUrl: "/Bow.svg",
      price: 79.99,
      stock: 20,
    },
    {
      name: "Scoped Rifle",
      description: "Long-range precision for the perfect headshot.",
      imageUrl: "/ScopedRifle.svg",
      price: 299.99,
      stock: 15,
    },
    {
      name: "Sword",
      description: "Close-combat classic for any survivalist.",
      imageUrl: "/Sword.svg",
      price: 99.99,
      stock: 30,
    },
  ],
  medical: [
    {
      name: "First Aid Kit",
      description: "Essential medical supplies to keep you alive.",
      imageUrl: "/FirstAid.svg",
      price: 19.99,
      stock: 100,
    },
    {
      name: "Deluxe First Aid Kit",
      description: "Everything you need for major or minor injuries.",
      imageUrl: "/DeluxeFirstAid.svg",
      price: 49.99,
      stock: 50,
    },
  ],
  shelter: [
    {
      name: "Survival Kit",
      description: "Contains essential tools for surviving any apocalypse.",
      imageUrl: "/SurvivalKit.svg",
      price: 49.99,
      stock: 40,
    },
    {
      name: "Portable Shelter",
      description: "Stay safe and sound no matter where you end up.",
      imageUrl: "/PortableShelter.svg",
      price: 199.99,
      stock: 10,
    },
  ],
  cooking: [
    {
      name: "Zombie BBQ Grill",
      description: "Perfect for grilling steaks or zombie ribs.",
      imageUrl: "/ZombieBBQGrill.svg",
      price: 149.99,
      stock: 15,
    },
    {
      name: "Portable Stove",
      description: "Cook meals on the go, wherever you are.",
      imageUrl: "/PortableStove.svg",
      price: 79.99,
      stock: 25,
    },
    {
      name: "Survival Cooking Kit",
      description: "Includes utensils, pans, and spice packs for gourmet meals.",
      imageUrl: "/CookingKit.svg",
      price: 99.99,
      stock: 20,
    },
    {
      name: "Water Purification Tablets",
      description: "Make any water drinkable—even zombie swamp water.",
      imageUrl: "/WaterTablets.svg",
      price: 19.99,
      stock: 100,
    },
    {
      name: "Solar Oven",
      description: "Harness the power of the sun to bake your bread—or brains.",
      imageUrl: "/SolarOven.svg",
      price: 249.99,
      stock: 10,
    },
    {
      name: "Collapsible Cooler",
      description: "Keep your food fresh while saving space.",
      imageUrl: "/CollapseCooler.svg",
      price: 39.99,
      stock: 30,
    },
  ],
  clothes: [
    {
      name: "Zombie-Proof Jacket",
      description: "Stylish and bite-resistant, because safety never goes out of style.",
      imageUrl: "/ZombieJacket.svg",
      price: 129.99,
      stock: 20,
    },
    {
      name: "Camouflage Pants",
      description: "Blend in with the environment or hide from your ex.",
      imageUrl: "/CamoPants.svg",
      price: 49.99,
      stock: 30,
    },
    {
      name: "Combat Boots",
      description: "Kick harder and walk farther in apocalypse-approved footwear.",
      imageUrl: "/CombatBoots.svg",
      price: 89.99,
      stock: 25,
    },
    {
      name: "Thermal Undergarments",
      description: "Stay warm even when the world is chillingly cold.",
      imageUrl: "/Thermal.svg",
      price: 39.99,
      stock: 40,
    },
    {
      name: "Bulletproof Vest",
      description: "For when you want to look cool AND stay alive.",
      imageUrl: "/BulletProofVest.svg",
      price: 249.99,
      stock: 10,
    },
  ],
};

const seedDatabase = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/e_shop_db", {

    });
    console.log("Connected to MongoDB");

    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log("Cleared existing data");

    // Seed products and categories
    for (const [categoryKey, products] of Object.entries(productData)) {
      const productDocs = await Product.insertMany(products);
      const category = new Category({
        name: categoryKey.charAt(0).toUpperCase() + categoryKey.slice(1), // Capitalize category name
        imageUrl: `/${categoryKey}.jpg`,
        products: productDocs.map((product) => product._id), // Link product IDs
      });
      await category.save();
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


