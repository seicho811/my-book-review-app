import { render, screen } from "@testing-library/react";
import Pagination from "../../src/components/Pagination/Pagination";
import userEvent from "@testing-library/user-event";

test("previous buttons are disabled on first page", () => {
  render(
    <Pagination
      page={1}
      onPageChange={() => {}}
      hasNext={true}
    />
  );
  expect(screen.getByRole("button", { name: /previous page/i })).toBeDisabled();
  expect(screen.getByRole("button", { name: /first page/i })).toBeDisabled();
  expect(screen.getByRole("button", { name: /next page/i })).toBeEnabled();
});

test("previous buttons are enabled on non-first page", () => {
  render(
    <Pagination
      page={3}
      onPageChange={() => {}}
      hasNext={false}
    />
  );
  expect(screen.getByRole("button", { name: /previous page/i })).toBeEnabled();
  expect(screen.getByRole("button", { name: /first page/i })).toBeEnabled();
});

test("click handlers are called with correct page", async () => {
  const onPageChange = vi.fn();
  render(
    <Pagination
      page={3}
      onPageChange={onPageChange}
      hasNext={true}
    />
  );
  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: /previous page/i }));
  await user.click(screen.getByRole("button", { name: /first page/i }));
  await user.click(screen.getByRole("button", { name: /next page/i }));

  expect(onPageChange).toHaveBeenCalledTimes(3);
  expect(onPageChange).toHaveBeenNthCalledWith(1, 2);
  expect(onPageChange).toHaveBeenNthCalledWith(2, 1);
  expect(onPageChange).toHaveBeenNthCalledWith(3, 4);
});

test("disabled button do not trigger onPageChange", async () => {
  const onPageChange = vi.fn();
  render(
    <Pagination
      page={10}
      onPageChange={onPageChange}
      hasNext={false}
    />
  );
  const user = userEvent.setup();
  await user.click(screen.getByRole("button", { name: /next page/i }));
  expect(onPageChange).not.toHaveBeenCalled();
});

test("renders page label", () => {
  render(
    <Pagination
      page={5}
      onPageChange={() => {}}
      hasNext={true}
    />
  );
  expect(screen.getByText(/page 5/i)).toBeInTheDocument();
});
