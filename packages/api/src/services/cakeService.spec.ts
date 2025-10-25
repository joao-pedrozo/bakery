import { test, expect, beforeEach, afterEach, describe } from "bun:test";
import {
  listCakes,
  createCake,
  getCakeById,
  markCakeStatus,
} from "./cakeService";
import Cake from "../models/cakeModel";
import { connectTestDB, disconnectDB } from "../db";

describe("Cake Service", () => {
  beforeEach(async () => {
    await connectTestDB();
    await Cake.deleteMany({});
  });

  afterEach(async () => {
    await disconnectDB();
  });

  test("should create cake successfully with default values", async () => {
    const cakeData = {
      flavor: "chocolate",
    };

    const createdCake = await createCake(cakeData);

    expect(createdCake).toBeDefined();
    expect(createdCake.flavor).toBe("chocolate");
    expect(createdCake.size).toBe("medium");
    expect(createdCake.cookingTime).toBe(3000);
    expect(createdCake.status).toBe("pending");
    expect(createdCake.createdAt).toBeDefined();
    expect(createdCake.updatedAt).toBeDefined();

    const savedCake = await Cake.findById(createdCake._id);
    expect(savedCake).toBeDefined();
    expect(savedCake?.flavor).toBe("chocolate");
  });

  test("should create cake with custom values", async () => {
    const cakeData = {
      flavor: "vanilla",
      size: "large" as const,
      cookingTime: 5000,
    };

    const createdCake = await createCake(cakeData);

    expect(createdCake).toBeDefined();
    expect(createdCake.flavor).toBe("vanilla");
    expect(createdCake.size).toBe("large");
    expect(createdCake.cookingTime).toBe(5000);
    expect(createdCake.status).toBe("pending");

    const savedCake = await Cake.findById(createdCake._id);
    expect(savedCake).toBeDefined();
    expect(savedCake?.flavor).toBe("vanilla");
    expect(savedCake?.size).toBe("large");
    expect(savedCake?.cookingTime).toBe(5000);
  });

  test("should list all cakes", async () => {
    const cakesData = [
      { flavor: "chocolate", size: "small" as const },
      { flavor: "vanilla", size: "medium" as const },
      { flavor: "strawberry", size: "large" as const },
    ];

    for (const cakeData of cakesData) {
      await createCake(cakeData);
    }

    const allCakes = await listCakes();

    expect(allCakes).toHaveLength(3);
    expect(allCakes[0].flavor).toBe("strawberry");
    expect(allCakes[1].flavor).toBe("vanilla");
    expect(allCakes[2].flavor).toBe("chocolate");
  });

  test("should get cake by id", async () => {
    const cakeData = {
      flavor: "red velvet",
      size: "medium" as const,
      cookingTime: 4000,
    };

    const createdCake = await createCake(cakeData);
    const retrievedCake = await getCakeById(createdCake._id.toString());

    expect(retrievedCake).toBeDefined();
    expect(retrievedCake?.flavor).toBe("red velvet");
    expect(retrievedCake?.size).toBe("medium");
    expect(retrievedCake?.cookingTime).toBe(4000);
    expect(retrievedCake?.status).toBe("pending");
  });

  test("should return null for non-existent cake id", async () => {
    const nonExistentId = "507f1f77bcf86cd799439011"; // Valid ObjectId format
    const retrievedCake = await getCakeById(nonExistentId);

    expect(retrievedCake).toBeNull();
  });

  test("should mark cake status as cooking", async () => {
    const cakeData = {
      flavor: "lemon",
      size: "small" as const,
    };

    const createdCake = await createCake(cakeData);
    const updatedCake = await markCakeStatus(
      createdCake._id.toString(),
      "cooking"
    );

    expect(updatedCake).toBeDefined();
    expect(updatedCake?.status).toBe("cooking");
    expect(updatedCake?.updatedAt).not.toEqual(createdCake.updatedAt);

    const savedCake = await Cake.findById(createdCake._id);
    expect(savedCake?.status).toBe("cooking");
  });

  test("should mark cake status as done", async () => {
    const cakeData = {
      flavor: "carrot",
      size: "large" as const,
      cookingTime: 6000,
    };

    const createdCake = await createCake(cakeData);
    const updatedCake = await markCakeStatus(
      createdCake._id.toString(),
      "done"
    );

    expect(updatedCake).toBeDefined();
    expect(updatedCake?.status).toBe("done");
    expect(updatedCake?.updatedAt).not.toEqual(createdCake.updatedAt);

    const savedCake = await Cake.findById(createdCake._id);
    expect(savedCake?.status).toBe("done");
  });
});
