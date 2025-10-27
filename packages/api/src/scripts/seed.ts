import connectDB, { disconnectDB } from "../db";
import Category from "../models/categoryModel";
import Cake from "../models/cakeModel";

async function seed() {
  try {
    await connectDB();

    console.log("Clearing existing categories and cakes...");
    await Category.deleteMany({});
    await Cake.deleteMany({});

    console.log("Creating categories...");
    const categories = await Category.create([
      { name: "Cookie" },
      { name: "Pie" },
      { name: "Cupcake" },
    ]);

    const cookieCat = categories.find((c) => c.name === "Cookie");
    const pieCat = categories.find((c) => c.name === "Pie");
    const cupcakeCat = categories.find((c) => c.name === "Cupcake");

    console.log("Creating cakes...");
    const cakes = await Cake.create([
      {
        name: "Chocolate Chip Cookie",
        category: cookieCat?._id,
        size: "small",
        cookingTime: 1500,
      },
      {
        name: "Oatmeal Raisin Cookie",
        category: cookieCat?._id,
        size: "small",
        cookingTime: 1600,
      },
      {
        name: "Lemon Meringue Pie",
        category: pieCat?._id,
        size: "large",
        cookingTime: 5000,
      },
      {
        name: "Apple Pie",
        category: pieCat?._id,
        size: "large",
        cookingTime: 4800,
      },
      {
        name: "Vanilla Cupcake",
        category: cupcakeCat?._id,
        size: "small",
        cookingTime: 2200,
      },
    ]);

    console.log(
      `Inserted ${categories.length} categories and ${cakes.length} cakes.`
    );
  } catch (err) {
    console.error("Seeding failed:", err);
  } finally {
    await disconnectDB();
    process.exit(0);
  }
}

// Run when executed
if (require.main === module) {
  seed();
}
