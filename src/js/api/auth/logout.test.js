import { logout } from "./logout";
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

describe("logout", () => {
  beforeEach(() => {
    localStorage.setItem("token", "sampleToken");
  });

  afterEach(() => {
    localStorage.clear();
    jest.resetAllMocks();
  });

  it("removes the token from localStorage", () => {
    logout();
    expect(localStorage.getItem("token")).toBeNull();
  });
});
