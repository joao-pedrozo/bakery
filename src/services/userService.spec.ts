import { test, expect, beforeEach, afterEach, describe } from "bun:test";
import { getUsers, createUser } from "./userService";
import User from "../models/userModel";
import { connectTestDB, disconnectDB } from "../db";

describe("User Service - Integration Test", () => {
  beforeEach(async () => {
    await connectTestDB();
    await User.deleteMany({});
  });

  afterEach(async () => {
    await disconnectDB();
  });

  test("should fetch real users from database", async () => {
    const testUser = await User.create({
      name: "John Doe",
      email: "john@test.com",
      password: "hashedpassword",
    });

    await getUsers();

    const users = await User.find();
    expect(users).toHaveLength(1);
    expect(users[0].name).toBe("John Doe");
    expect(users[0].email).toBe("john@test.com");
  });

  test("should create user successfully", async () => {
    const userData = {
      name: "Jane Smith",
      email: "jane@test.com",
      password: "securepassword",
    };

    const createdUser = await createUser(userData, () => {});

    expect(createdUser).toBeDefined();
    expect(createdUser.name).toBe("Jane Smith");
    expect(createdUser.email).toBe("jane@test.com");
    expect(createdUser.password).toBe("securepassword");

    const savedUser = await User.findOne({ email: "jane@test.com" });
    expect(savedUser).toBeDefined();
    expect(savedUser?.name).toBe("Jane Smith");
  });

  test("should not create user with duplicate email", async () => {
    await User.create({
      name: "Existing User",
      email: "existing@test.com",
      password: "password123",
    });

    const duplicateUserData = {
      name: "New User",
      email: "existing@test.com",
      password: "newpassword",
    };

    let statusResult: any = null;
    const mockStatus = (code: number, data: any) => {
      statusResult = { code, data };
      return { code, data };
    };

    const result = await createUser(duplicateUserData, mockStatus);

    expect(statusResult).toBeDefined();
    expect(statusResult.code).toBe(409);
    expect(statusResult.data.error).toBe("User already exists");
    expect(statusResult.data.details).toBe(
      "A user with this email address is already registered."
    );

    const users = await User.find();
    expect(users).toHaveLength(1);
    expect(users[0].email).toBe("existing@test.com");
  });

  test("should handle multiple users correctly", async () => {
    const usersData = [
      { name: "User 1", email: "user1@test.com", password: "pass1" },
      { name: "User 2", email: "user2@test.com", password: "pass2" },
      { name: "User 3", email: "user3@test.com", password: "pass3" },
    ];

    for (const userData of usersData) {
      await createUser(userData, () => {});
    }

    const allUsers = await User.find();
    expect(allUsers).toHaveLength(3);

    await getUsers();

    const user1 = await User.findOne({ email: "user1@test.com" });
    const user2 = await User.findOne({ email: "user2@test.com" });
    const user3 = await User.findOne({ email: "user3@test.com" });

    expect(user1?.name).toBe("User 1");
    expect(user2?.name).toBe("User 2");
    expect(user3?.name).toBe("User 3");
  });
});
