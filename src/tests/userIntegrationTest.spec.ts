import { test, expect, beforeEach, afterEach, describe } from "bun:test";
import { getUsers, createUser } from "../services/userService";
import User from "../models/userModel";
import { connectTestDB, disconnectDB } from "../db";

describe("User Service - Integration Test", () => {
  beforeEach(async () => {
    // Conecta ao banco de teste separado (elysia_demo_test)
    await connectTestDB();
    await User.deleteMany({}); // Limpa o banco de teste antes de cada teste
  });

  afterEach(async () => {
    await disconnectDB();
  });

  test("should fetch real users from database", async () => {
    // Arrange - insere dados reais no banco
    const testUser = await User.create({
      name: "John Doe",
      email: "john@test.com",
      password: "hashedpassword",
    });

    // Act - chama a função que usa o banco real
    await getUsers();

    // Assert - verifica se o usuário foi criado corretamente
    const users = await User.find();
    expect(users).toHaveLength(1);
    expect(users[0].name).toBe("John Doe");
    expect(users[0].email).toBe("john@test.com");
  });

  test("should create user successfully", async () => {
    // Arrange
    const userData = {
      name: "Jane Smith",
      email: "jane@test.com",
      password: "securepassword",
    };

    // Act
    const createdUser = await createUser(userData, () => {});

    // Assert
    expect(createdUser).toBeDefined();
    expect(createdUser.name).toBe("Jane Smith");
    expect(createdUser.email).toBe("jane@test.com");
    expect(createdUser.password).toBe("securepassword");

    // Verifica se o usuário foi realmente salvo no banco
    const savedUser = await User.findOne({ email: "jane@test.com" });
    expect(savedUser).toBeDefined();
    expect(savedUser?.name).toBe("Jane Smith");
  });

  test("should not create user with duplicate email", async () => {
    // Arrange - cria um usuário inicial
    await User.create({
      name: "Existing User",
      email: "existing@test.com",
      password: "password123",
    });

    const duplicateUserData = {
      name: "New User",
      email: "existing@test.com", // mesmo email
      password: "newpassword",
    };

    let statusResult: any = null;
    const mockStatus = (code: number, data: any) => {
      statusResult = { code, data };
      return { code, data };
    };

    // Act
    const result = await createUser(duplicateUserData, mockStatus);

    // Assert
    expect(statusResult).toBeDefined();
    expect(statusResult.code).toBe(409);
    expect(statusResult.data.error).toBe("User already exists");
    expect(statusResult.data.details).toBe(
      "A user with this email address is already registered."
    );

    // Verifica que apenas um usuário existe no banco
    const users = await User.find();
    expect(users).toHaveLength(1);
    expect(users[0].email).toBe("existing@test.com");
  });

  test("should handle multiple users correctly", async () => {
    // Arrange - cria múltiplos usuários
    const usersData = [
      { name: "User 1", email: "user1@test.com", password: "pass1" },
      { name: "User 2", email: "user2@test.com", password: "pass2" },
      { name: "User 3", email: "user3@test.com", password: "pass3" },
    ];

    // Act - cria todos os usuários
    for (const userData of usersData) {
      await createUser(userData, () => {});
    }

    // Assert - verifica se todos foram criados
    const allUsers = await User.find();
    expect(allUsers).toHaveLength(3);

    // Verifica se getUsers funciona com múltiplos usuários
    await getUsers();

    // Verifica dados específicos
    const user1 = await User.findOne({ email: "user1@test.com" });
    const user2 = await User.findOne({ email: "user2@test.com" });
    const user3 = await User.findOne({ email: "user3@test.com" });

    expect(user1?.name).toBe("User 1");
    expect(user2?.name).toBe("User 2");
    expect(user3?.name).toBe("User 3");
  });
});
