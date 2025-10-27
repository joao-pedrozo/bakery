import Cake from "../models/cakeModel";

type CreateCakeInput = {
  name: string;
  categoryId: string;
  size?: "small" | "medium" | "large";
  cookingTime?: number; // milliseconds
};

const listCakes = async () => {
  return await Cake.find().populate("category").sort({ createdAt: -1 });
};

const getCakeById = async (id: string) => {
  return await Cake.findById(id).populate("category");
};

const markCakeStatus = async (
  id: string,
  status: "pending" | "cooking" | "done" | "failed"
) => {
  return await Cake.findByIdAndUpdate(
    id,
    { status, updatedAt: new Date() },
    { new: true }
  );
};

const createCake = async (input: CreateCakeInput) => {
  const cake = new Cake({
    name: input.name,
    category: input.categoryId,
    size: input.size ?? "medium",
    cookingTime: input.cookingTime ?? 3000,
  });
  return await cake.save();
};

export { listCakes, createCake, getCakeById, markCakeStatus };
