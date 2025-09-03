import SignUpForm from "./components/SignUpForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardFooter,
} from "../../components/Card/Card";
import { Link } from "react-router";
import style from "../Page.module.css";

export default function SignUpPage() {
  return (
    <>
      <main className={style.page}>
        <Card>
          <CardHeader>
            <h2>Sign Up</h2>
            <p>Create your account to get started with our service.</p>
          </CardHeader>
          <CardContent>
            <SignUpForm />
          </CardContent>
          <CardFooter>
            <p>
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </CardFooter>
        </Card>
      </main>
    </>
  );
}
