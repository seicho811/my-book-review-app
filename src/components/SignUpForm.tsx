import { useState } from "react";
import { useNavigate } from "react-router";

type Errors = {
  name: boolean;
  email: boolean;
  password: boolean;
};

export default function SignUpForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Errors>({
    name: false,
    email: false,
    password: false,
  });

  const navigate = useNavigate();

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const newErrors = {
      name: !name,
      email: !email,
      password: !password,
    };

    setErrors(newErrors);

    if (newErrors.name || newErrors.email || newErrors.password) {
      return;
    }

    setErrors({ name: false, email: false, password: false });
    console.log(name, email, password);
    navigate("/home");
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
      {errors?.name && <div className="alert">Name is required.</div>}
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
      {errors?.email && <div className="alert">Email is required.</div>}
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
      {errors?.password && <div className="alert">Password is required.</div>}
      <button type="submit">Sign up</button>
    </form>
  );
}
