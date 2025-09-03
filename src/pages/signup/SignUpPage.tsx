import SignUpForm from "./components/SignUpForm";
import { Link } from "react-router";

export default function SignUpPage() {
  return (
    <>
      <h2>Sign Up</h2>
      <SignUpForm />
      <p>
        Already have an account? <Link to="/login">Log in</Link>
      </p>
    </>
  );
}
