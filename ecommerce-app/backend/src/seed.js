require("dotenv").config();

const bcrypt = require("bcrypt");
const connectDB = require("./config/db");
const User = require("./models/User");
const Product = require("./models/Product");
const { CATEGORIES } = require("./utils/constants");

const sampleProducts = [
  {
    title: "Wireless Headphones",
    description: "Comfortable over-ear wireless headphones",
    price: 59,
    barcode: "BAR1001",
    category: CATEGORIES[0],
    stock: 30,
    isBestSeller: true,
  },
  {
    title: "Running Shoes",
    description: "Lightweight running shoes for daily training",
    price: 80,
    barcode: "BAR1002",
    category: CATEGORIES[1],
    stock: 20,
    isBestSeller: false,
  },
  {
    title: "Coffee Maker",
    description: "Simple home coffee maker",
    price: 45,
    barcode: "BAR1003",
    category: CATEGORIES[2],
    stock: 15,
    isBestSeller: true,
  },
  {
    title: "Face Cleanser",
    description: "Gentle cleanser for daily use",
    price: 12,
    barcode: "BAR1004",
    category: CATEGORIES[3],
    stock: 40,
    isBestSeller: false,
  },
  {
    title: "Yoga Mat",
    description: "Non-slip yoga mat",
    price: 25,
    barcode: "BAR1005",
    category: CATEGORIES[4],
    stock: 25,
    isBestSeller: true,
  },
];

const runSeed = async () => {
  await connectDB();

  const adminEmail = process.env.ADMIN_EMAIL || "admin@ecommerce.com";
  const adminPassword = process.env.ADMIN_PASSWORD || "Admin123!";

  const existingAdmin = await User.findOne({ email: adminEmail });

  if (!existingAdmin) {
    const hashed = await bcrypt.hash(adminPassword, 10);
    await User.create({
      name: "Main Admin",
      email: adminEmail,
      password: hashed,
      role: "admin",
    });
    console.log("Admin user created");
  } else {
    console.log("Admin already exists");
  }

  const productsCount = await Product.countDocuments();

  if (productsCount === 0) {
    await Product.insertMany(sampleProducts);
    console.log("Sample products inserted");
  } else {
    console.log("Products already exist");
  }

  process.exit(0);
};

runSeed().catch((error) => {
  console.error(error);
  process.exit(1);
});
