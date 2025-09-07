import { useNavigate } from "react-router";
import {
  useForm,
  type FieldErrors,
  type SubmitHandler,
  type UseFormRegister,
} from "react-hook-form";
import { useAuth } from "../../../contexts/AuthContext";

type Inputs = {
  email: string;
  password: string;
};

export type UseLoginFormType = {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  isSubmitting: boolean;
};

export default function useLoginForm() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();
  const navigate = useNavigate();
  const { login } = useAuth();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await login(data.email, data.password);
      navigate("/home");
    } catch {
      setError("root", {
        type: "server",
        message: "Login failed.",
      });
    }
  };

  return {
    register,
    errors,
    onSubmit: handleSubmit(onSubmit),
    isSubmitting,
  };
}
