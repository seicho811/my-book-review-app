import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import SignUpForm from "../src/components/SignUpForm";
// import userEvent from "@testing-library/user-event";

test("renders form elements", () => {
  render(
    <MemoryRouter>
      <SignUpForm />
    </MemoryRouter>
  );

  const nameField = screen.getByLabelText(/name/i);
  const emailField = screen.getByLabelText(/email/i);
  const passwordField = screen.getByLabelText(/password/i);
  const iconField = screen.getByLabelText(/icon/i);
  const submitButton = screen.getByRole("button", { name: /sign up/i });

  expect(nameField).toBeInTheDocument();
  expect(emailField).toBeInTheDocument();
  expect(passwordField).toBeInTheDocument();
  expect(iconField).toBeInTheDocument();
  expect(submitButton).toBeInTheDocument();
});

// test("shows error message when clicking sign up button with no value on email fields", async () => {
//   render(
//     <MemoryRouter>
//       <SignUpForm />
//     </MemoryRouter>
//   );

//   const nameField = screen.getByLabelText(/name/i);
//   const emailField = screen.getByLabelText(/email/i);
//   const passwordField = screen.getByLabelText(/password/i);
//   const submitButton = screen.getByRole("button", { name: /sign up/i });

//   const user = userEvent.setup();
//   await user.type(nameField, "tomo");
//   await user.click(submitButton);

//   const errorMsgs = await screen.findAllByRole("alert");
// });
