import {
  test,
  expect,
  mock,
  spyOn,
  beforeEach,
  afterEach,
  describe,
} from "bun:test";

// Abordagem mais simples - usa 'any' para evitar problemas de tipagem
const mockFind = mock((): any => Promise.resolve([]));

mock.module("../models/userModel", () => {
  return {
    default: {
      find: mockFind,
      findOne: mock((): any => Promise.resolve(null)),
    },
  };
});

describe("User Service - getUsers", () => {
  beforeEach(() => {
    mock.restore();
    mock.clearAllMocks();
    mockFind.mockClear();
  });

  afterEach(() => {
    mock.restore();
  });

  test("should call User.find and log message", async () => {
    const mockUsers = [
      {
        _id: "1",
        name: "John",
        email: "john@test.com",
        password: "hashedpassword",
      },
    ];

    mockFind.mockReturnValueOnce(Promise.resolve(mockUsers));

    const { getUsers } = await import("../services/userService");

    await getUsers();

    expect(mockFind).toHaveBeenCalledTimes(1);
    expect(mockFind).toHaveBeenCalledWith();

    expect(mockFind.mock.results[0].value).resolves.toEqual(mockUsers);
  });
});
