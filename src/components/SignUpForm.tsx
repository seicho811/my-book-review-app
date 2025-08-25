import { useState } from "react";
import { useNavigate } from "react-router";
import { signUp, uploadIcon } from "../utils/api";
import { compressToLimit } from "../utils/compressToLimit";

type FieldErrors = Partial<
  Record<"name" | "email" | "password" | "icon", string>
>;

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [iconFile, setIconFile] = useState<File | null>(null);

  const [errors, setErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [status, setStatus] = useState<"idle" | "compressing" | "submitting">(
    "idle"
  );

  const navigate = useNavigate();

  async function handleIconChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    setStatus("compressing");
    try {
      const fileOut = await compressToLimit(file);
      setIconFile(fileOut);
    } finally {
      setStatus("idle");
    }
  }

  function validate() {
    const fieldErrors: FieldErrors = {};
    if (!name) fieldErrors.name = "Name is required.";
    if (!email) fieldErrors.email = "Email is required.";
    if (!password) fieldErrors.password = "Password is required.";

    setErrors(fieldErrors);
    return Object.keys(fieldErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!validate()) return;
    if (status === "compressing") return;

    setStatus("submitting");
    try {
      const token = await signUp({
        name: name,
        email: email,
        password: password,
      });
      if (iconFile) {
        uploadIcon(token, iconFile);
      }
      navigate("/home");
    } catch (err) {
      if (err instanceof Error) setFormError(err.message ?? "Signup failed");
    } finally {
      setStatus("idle");
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="name">User name</label>
        <input
          id="name"
          name="name"
          type="text"
          autoComplete="username"
          value={name}
          onChange={(e) => {
            setName(e.target.value);
          }}
        />
      </div>
      {errors?.name && (
        <div
          className="alert"
          role="alert"
        >
          {errors.name}
        </div>
      )}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        />
      </div>
      {errors?.email && (
        <div
          className="alert"
          role="alert"
        >
          {errors.email}
        </div>
      )}
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      {errors?.password && (
        <div
          className="alert"
          role="alert"
        >
          {errors.password}
        </div>
      )}
      <div>
        <label htmlFor="iconField">Icon</label>
        <input
          type="file"
          id="iconField"
          name="iconField"
          accept="image/*"
          onChange={handleIconChange}
        />
      </div>
      <button
        type="submit"
        disabled={status !== "idle"}
      >
        {status === "submitting"
          ? "Signing up..."
          : status === "compressing"
          ? "compressing..."
          : "Sign up"}
      </button>
      {formError && (
        <div
          role="alert"
          className="alert"
        >
          {formError}
        </div>
      )}
    </form>
  );
}
