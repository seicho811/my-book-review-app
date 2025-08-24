import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import LoginForm from "../src/components/LoginForm";
import userEvent from "@testing-library/user-event";

test("renders form elements", () => {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  const emailField = screen.getByLabelText(/email/i);
  const passwordField = screen.getByLabelText(/password/i);
  const fileInputField = screen.getByLabelText(/icon/i);
  const submitButton = screen.getByRole("button", { name: /login/i });

  expect(emailField).toBeInTheDocument();
  expect(passwordField).toBeInTheDocument();
  expect(fileInputField).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

test("show error message when clicking login button without any value on password field", async () => {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );
  const emailField = screen.getByLabelText(/email/i);
  const submitButton = screen.getByRole("button", { name: /login/i });

  const user = userEvent.setup();
  await user.type(emailField, "a@b.com");
  await user.click(submitButton);

  const errorMsg = await screen.findByRole("alert");

  expect(errorMsg).toHaveTextContent(/password is required./i);
});

test("show error message when clicking login button without any value on password field", async () => {
  render(
    <MemoryRouter>
      <LoginForm />
    </MemoryRouter>
  );

  const passwordField = screen.getByLabelText(/password/i);
  const submitButton = screen.getByRole("button", { name: /login/i });

  const user = userEvent.setup();
  await user.type(passwordField, "1111");
  await user.click(submitButton);

  const errorMsg = await screen.findByRole("alert");

  expect(errorMsg).toHaveTextContent(/email is required./i);
});
