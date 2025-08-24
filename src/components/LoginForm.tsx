import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";

type Errors = {
  email: boolean;
  password: boolean;
};

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({
    email: false,
    password: false,
  });

  const navigate = useNavigate();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();

    const newErrors = {
      email: !email,
      password: !password,
    };

    setErrors(newErrors);

    if (newErrors.email || newErrors.password) {
      return;
    }

    setErrors({ email: false, password: false });
    console.log({ email: email, password: password });
    navigate("/home");
  }

  return (
    <form onSubmit={handleSubmit}>
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
      {errors.email && (
        <div
          className="alert"
          role="alert"
        >
          Email is required.
        </div>
      )}
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        />
      </div>
      {errors.password && (
        <div
          className="alert"
          role="alert"
        >
          Password is required.
        </div>
      )}
      <button
        type="submit"
        accept="image/*"
      >
        Login
      </button>
    </form>
  );
}
