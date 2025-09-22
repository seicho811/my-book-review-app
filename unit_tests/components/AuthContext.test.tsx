import { render, screen, waitFor } from "@testing-library/react";
import { AuthProvider, useAuth } from "../../src/contexts/AuthContext";

const navigateMock = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return { ...actual, useNavigate: () => navigateMock };
});

vi.mock("../../src/utils/api", () => ({
  login: vi.fn(),
  signUp: vi.fn(),
  getUserInfo: vi.fn(),
}));

import {
  login as loginApi,
  signUp as signUpApi,
  getUserInfo,
} from "../../src/utils/api";
import { MemoryRouter } from "react-router";

function Consumer() {
  const { user, token, login, logout, signUpAndLogin, clearAuthData } =
    useAuth();
  return (
    <div>
      <output data-testid="user">{user?.name ?? ""}</output>
      <output data-testid="token">{token ?? ""}</output>
      <button onClick={() => login("a@b.com", "pw")}>login</button>
      <button onClick={() => signUpAndLogin("Tomo", "t@t.com", "pw")}>
        signup
      </button>
      <button onClick={logout}>logout</button>
      <button onClick={clearAuthData}>clear</button>
    </div>
  );
}

function renderWithProvider() {
  return render(
    <MemoryRouter>
      <AuthProvider>
        <Consumer />
      </AuthProvider>
    </MemoryRouter>
  );
}

beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

test("restores user from localstorage when token and userName exist", async () => {
  localStorage.setItem("token", "t-123");
  localStorage.setItem("userName", "Tomo");
  renderWithProvider();

  expect(screen.getByTestId("token")).toHaveTextContent("t-123");
  expect(screen.getByTestId("user")).toHaveTextContent("Tomo");
});

test("fetch user on mount when token exists but userName misssing", async () => {
  localStorage.setItem("token", "t-123");
  (getUserInfo as vi.Mock).mockResolvedValue({ name: "Tomo" });
  renderWithProvider();
  await waitFor(() => {
    expect(screen.getByTestId("user")).toHaveTextContent("Tomo");
  });
  expect(getUserInfo).toHaveBeenCalledWith("t-123");
  expect(localStorage.getItem("userName")).toBe("Tomo");
});
