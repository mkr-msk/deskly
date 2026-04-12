import { describe, it, expect, vi } from "vitest";
import { registerUser } from "../lib/auth";

describe("registerUser", () => {
  it("creates a new user when email is unique", async () => {
    const findUserByEmail = vi.fn().mockResolvedValue(null);
    const createUser = vi.fn().mockResolvedValue({
      id: "user_1",
      email: "test@example.com",
    });

    const result = await registerUser(
      "test@example.com",
      "123456",
      { findUserByEmail, createUser }
    );

    expect(findUserByEmail).toHaveBeenCalledWith("test@example.com");
    expect(createUser).toHaveBeenCalledTimes(1);
    expect(createUser).toHaveBeenCalledWith({
      email: "test@example.com",
      passwordHash: expect.any(String),
    });
    expect(result).toEqual({
      id: "user_1",
      email: "test@example.com",
    });
  });

  it("throws an error if user already exists", async () => {
    const findUserByEmail = vi.fn().mockResolvedValue({
      id: "user_1",
      email: "test@example.com",
    });
    const createUser = vi.fn();

    await expect(
      registerUser("test@example.com", "123456", {
        findUserByEmail,
        createUser,
      })
    ).rejects.toThrow("User already exists");

    expect(findUserByEmail).toHaveBeenCalledWith("test@example.com");
    expect(createUser).not.toHaveBeenCalled();
  });

  it("throws an error if email or password is missing", async () => {
    const findUserByEmail = vi.fn();
    const createUser = vi.fn();

    await expect(
      registerUser("", "123456", {
        findUserByEmail,
        createUser,
      })
    ).rejects.toThrow("Email and password are required");

    expect(findUserByEmail).not.toHaveBeenCalled();
    expect(createUser).not.toHaveBeenCalled();
  });
});