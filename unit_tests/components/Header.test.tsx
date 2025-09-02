import { render, screen, within } from "@testing-library/react";
import Header from "../../src/components/Header";

test("renders semantic <Header />", () => {
  render(<Header />);
  const header = screen.getByRole("banner");
  const h1 = within(header).getByRole("heading", {
    level: 1,
    name: /book review/i,
  });
  expect(h1).toBeInTheDocument();
});
