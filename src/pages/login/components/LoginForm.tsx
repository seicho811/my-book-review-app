import useLoginForm from "./useLoginForm";
import LoginFormView from "./LoginFormView";

export default function LoginForm() {
  const vm = useLoginForm();
  return <LoginFormView {...vm} />;
}
