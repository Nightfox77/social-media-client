import { login } from "./login.js";

const mockLocalStorage = (() => {
  let storage = {};
  return {
    getItem: jest.fn((key) => storage[key] || null),
    setItem: jest.fn((key, value) => {
      storage[key] = value.toString();
    }),
    removeItem: jest.fn((key) => {
      delete storage[key];
    }),
    clear: jest.fn(() => {
      storage = {};
    }),
  };
})();
global.localStorage = mockLocalStorage;
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({ accessToken: "sampleToken" }),
  }),
);

describe("login", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it("a token should gget stored when login is successful", async () => {
    const userEmail = "someuser@junkmail.com";
    const userPassword = "userPassword123";
    await login(userEmail, userPassword);

    const savedToken = localStorage.getItem("token");
    const tokenValue = JSON.parse(savedToken);

    expect(tokenValue).toEqual("sampleToken");
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "token",
      JSON.stringify("sampleToken"),
    );
  });

  it("shows an error when login fails", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Unauthorized",
    });

    await expect(login("invalid@test.com", "wrongpassword")).rejects.toThrow(
      "Unauthorized",
    );
  });

  it("shows an specific error for an invalid username when user name is invalid", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Unauthorized",
    });

    const invalidEmail = "invalidUser@example.com";
    const correctPassword = "correctPassword";

    await expect(login(invalidEmail, correctPassword)).rejects.toThrow(
      "Invalid username",
    );
  });

  it("shows an specific error for a invalid password when user password is invalid", async () => {
    fetch.mockResolvedValueOnce({
      ok: false,
      statusText: "Unauthorized",
    });

    const correctEmail = "validUser@example.com";
    const invalidPassword = "incorrectPassword";

    await expect(login(correctEmail, invalidPassword)).rejects.toThrow(
      "Invalid password",
    );
  });
});
