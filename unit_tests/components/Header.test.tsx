import { render, screen, within } from "@testing-library/react";
import Header from "../../src/components/Header/Header";

// Mock AuthContext to avoid provider requirement in this simple rendering test
const logoutMock = vi.fn();
vi.mock("../../src/contexts/AuthContext", () => ({
  useAuth: () => ({ user: { name: "Tester" }, logout: logoutMock }),
}));

test("renders semantic <Header />", () => {
  render(<Header />);
  const header = screen.getByRole("banner");
  const h1 = within(header).getByRole("heading", {
    level: 1,
    name: /book review/i,
  });
  expect(h1).toBeInTheDocument();
});
