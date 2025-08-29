import { useSignUpForm } from "./useSignUpFrom";
import SignUpFormView from "./SignUpFormView";

export default function SignUpForm() {
  const vm = useSignUpForm();
  return <SignUpFormView {...vm} />;
}
