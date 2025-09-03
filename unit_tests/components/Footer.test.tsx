import Footer from "../../src/components/Footer/Footer";
import { render, screen, within } from "@testing-library/react";

test("renders semantic <footer>", () => {
  render(<Footer />);
  const footer = screen.getByRole("contentinfo");
  const p = within(footer).getByText(/©\s*2025\s+Tomoaki Hasegawa/i);
  expect(p).toBeInTheDocument();
});
