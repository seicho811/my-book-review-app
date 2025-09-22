import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useLocation } from "react-router";
import PrivateRoute from "../../src/components/PrivateRoute";

let mockToken: string | null = null;
vi.mock("../../src/contexts/AuthContext", () => ({
  useAuth: () => ({ token: mockToken }),
}));

function AppRoutes() {
  return (
    <Routes>
      <Route element={<PrivateRoute />}>
        <Route
          path="/home"
          element={<div>Home protected</div>}
        />
      </Route>
      <Route
        path="/login"
        element={<LocationEcho />}
      />
    </Routes>
  );
}

function LocationEcho() {
  const loc = useLocation();
  return <div data-testid="loc">{loc.pathname + loc.search}</div>;
}

beforeEach(() => {
  mockToken = null;
});

test("redirects to /login with next when not authenticated", () => {
  render(
    <MemoryRouter initialEntries={["/home"]}>
      <AppRoutes />
    </MemoryRouter>
  );
  const echoed = screen.getByTestId("loc");
  expect(echoed.textContent).toMatch(/^\/login\?next=%2Fhome/);
});

test("renders protected routes", () => {
  mockToken = "t-123";
  render(
    <MemoryRouter initialEntries={["/home"]}>
      <AppRoutes />
    </MemoryRouter>
  );

  expect(screen.getByText(/home protected/i)).toBeInTheDocument();
});
