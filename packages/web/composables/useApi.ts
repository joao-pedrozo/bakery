import type { Cake, User, ApiResponse } from "~/types";

export const useApi = () => {
  const baseUrl = "http://localhost:3000";

  const fetchCakes = async (): Promise<Cake[]> => {
    try {
      const response = await $fetch<Cake[]>(`${baseUrl}/cakes`);
      return response;
    } catch (error) {
      console.error("Failed to fetch cakes:", error);
      throw error;
    }
  };

  const fetchUsers = async (): Promise<User[]> => {
    try {
      const response = await $fetch<User[]>(`${baseUrl}/users`);
      return response;
    } catch (error) {
      console.error("Failed to fetch users:", error);
      throw error;
    }
  };

  const createCake = async (
    cake: Omit<Cake, "id">
  ): Promise<ApiResponse<Cake>> => {
    try {
      const response = await $fetch<ApiResponse<Cake>>(`${baseUrl}/cakes`, {
        method: "POST",
        body: cake,
      });
      return response;
    } catch (error) {
      console.error("Failed to create cake:", error);
      throw error;
    }
  };

  const createUser = async (
    user: Omit<User, "id">
  ): Promise<ApiResponse<User>> => {
    try {
      const response = await $fetch<ApiResponse<User>>(`${baseUrl}/users`, {
        method: "POST",
        body: user,
      });
      return response;
    } catch (error) {
      console.error("Failed to create user:", error);
      throw error;
    }
  };

  return {
    fetchCakes,
    fetchUsers,
    createCake,
    createUser,
  };
};
