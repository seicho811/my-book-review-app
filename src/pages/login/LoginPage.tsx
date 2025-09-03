import { Link } from "react-router";
import LoginForm from "./components/LoginForm";

export default function LoginPage() {
  return (
    <>
      <h2>Login</h2>
      <LoginForm />
      <p>
        Don't have an accout? <Link to="/signup">Register</Link>
      </p>
    </>
  );
}
