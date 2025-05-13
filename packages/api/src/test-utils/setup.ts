import { vi } from "vitest";

vi.mock("../constants", () => ({
  API_BASE_URL: "https://api.V7.com",
}));
