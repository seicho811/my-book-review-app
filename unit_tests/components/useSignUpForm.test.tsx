import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const navigateMock = vi.fn();
vi.mock("react-router", async () => {
  const actual = await vi.importActual("react-router");
  return { ...actual, useNavigate: () => navigateMock };
});

vi.mock("../../src/utils/api", () => ({
  signUp: vi.fn(),
  uploadIcon: vi.fn(),
}));

vi.mock("../../src/utils/compressToLimit", () => ({
  compressToLimit: vi.fn(),
}));

import { signUp, uploadIcon } from "../../src/utils/api";
import { compressToLimit } from "../../src/utils/compressToLimit";
import { useSignUpForm } from "../../src/pages/signup/components/useSignUpFrom";

function Harness() {
  const { register, errors, onSubmit, busy, submitLabel, iconRules } =
    useSignUpForm();
  return (
    <form onSubmit={onSubmit}>
      <label htmlFor="name">Name</label>
      <input
        id="name"
        {...register("name", {})}
      />
      <label htmlFor="email">email</label>
      <input
        id="email"
        {...register("email", {
          required: "Email is required.",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Email is not valid.",
          },
        })}
      />
      <label htmlFor="password">password</label>
      <input
        id="password"
        {...register("password", {
          required: "Password is required.",
        })}
      />
      <label htmlFor="icon">icon</label>
      <input
        id="icon"
        type="file"
        {...register("icon", iconRules)}
      />
      {errors.email && <p role="alert">{errors.email.message}</p>}
      {errors.password && <p role="alert">{errors.password.message}</p>}
      {errors.icon && <p role="alert">{errors.icon.message}</p>}
      {"root" in errors && errors.root && (
        <p role="alert">{errors.root.message}</p>
      )}
      <button
        type="submit"
        disabled={busy}
      >
        {submitLabel}
      </button>
      <output data-testid="label">{submitLabel}</output>
    </form>
  );
}

function fileOf(type: string, bytes = 16, name = "f") {
  return new File([new Uint8Array(bytes)], name, { type });
}

function deffered<T = any>() {
  let resolve!: (v: T | PromiseLike<T>) => void;
  let reject!: (e: any) => void;
  const promise = new Promise<T>((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return { promise, resolve, reject };
}

beforeEach(() => {
  vi.clearAllMocks();
});

describe("useSignUpForm", () => {
  it("should sign up a user without icon upload and navigate to /home", async () => {
    const def = deffered<string>();
    (signUp as vi.Mock).mockReturnValueOnce(def.promise);
    render(<Harness />);

    const u = userEvent.setup();
    await u.type(screen.getByLabelText(/email/i), "test@example.com");
    await u.type(screen.getByLabelText(/password/i), "password");

    const btn = screen.getByRole("button", { name: /sign up/i });
    await u.click(btn);

    expect(btn).toBeDisabled();
    expect(screen.getByTestId("label").textContent).toMatch(
      /Signing up\.\.\./i
    );

    def.resolve("t-123");
    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith("/home"));
    expect(uploadIcon).not.toHaveBeenCalled();
  });

  it("should sign up a user with icon upload and navigate to /home", async () => {
    (signUp as vi.Mock).mockResolvedValueOnce("t-123");
    (compressToLimit as vi.Mock).mockResolvedValueOnce(
      fileOf("image/jpeg", 8, "compressed.jpeg")
    );
    (uploadIcon as vi.Mock).mockResolvedValueOnce(undefined);

    render(<Harness />);
    const user = userEvent.setup();
    await user.type(screen.getByLabelText(/name/i), "tomo");
    await user.type(screen.getByLabelText(/email/i), "test@example.com");
    await user.type(screen.getByLabelText(/password/i), "password");

    const iconInput = screen.getByLabelText(/icon/i);
    await user.upload(iconInput, fileOf("image/png", 32, "icon.png"));

    const btn = screen.getByRole("button", { name: /sign up/i });
    await user.click(btn);
    await waitFor(() => expect(navigateMock).toHaveBeenCalledWith("/home"));
    expect(uploadIcon).toHaveBeenCalled();
  });

  it("should show validation error for invalid MIME type", async () => {
    render(<Harness />);
    const u = userEvent.setup();
    await u.type(screen.getByLabelText(/name/i), "tomo");
    await u.type(screen.getByLabelText(/email/i), "test@example.com");
    await u.type(screen.getByLabelText(/password/i), "password");
    await u.upload(
      screen.getByLabelText(/icon/i),
      fileOf("image/gif", 32, "icon.gif")
    );
    await u.click(screen.getByRole("button", { name: /sign/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /JPG\/PNG files only/i
    );
    expect(signUp).not.toHaveBeenCalled();
    expect(compressToLimit).not.toHaveBeenCalled();
    expect(uploadIcon).not.toHaveBeenCalled();
  });

  it("should show compression error for oversized files without navigating /home", async () => {
    (signUp as vi.Mock).mockResolvedValueOnce("t-123");
    (compressToLimit as vi.Mock).mockRejectedValueOnce(
      new Error("Image compression failed")
    );
    render(<Harness />);
    const u = userEvent.setup();
    await u.type(screen.getByLabelText(/name/i), "tomo");
    await u.type(screen.getByLabelText(/email/i), "test@example.com");
    await u.type(screen.getByLabelText(/password/i), "password");
    await u.upload(screen.getByLabelText(/icon/i), fileOf("image/png"));
    await u.click(screen.getByRole("button", { name: /sign/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /Image compression failed/i
    );
    expect(uploadIcon).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });

  it("should show root error message withoug navigating /home", async () => {
    (signUp as vi.Mock).mockRejectedValueOnce(new Error("Server is down"));
    render(<Harness />);
    const u = userEvent.setup();
    await u.type(screen.getByLabelText(/name/i), "tomo");
    await u.type(screen.getByLabelText(/email/i), "test@example.com");
    await u.type(screen.getByLabelText(/password/i), "password");
    await u.click(screen.getByRole("button", { name: /sign/i }));

    expect(await screen.findByRole("alert")).toHaveTextContent(
      /signup failed/i
    );
    expect(compressToLimit).not.toHaveBeenCalled();
    expect(navigateMock).not.toHaveBeenCalled();
  });
});
