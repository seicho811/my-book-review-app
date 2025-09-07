import { useNavigate } from "react-router";
import {
  useForm,
  type FieldErrors,
  type SubmitHandler,
  type UseFormRegister,
} from "react-hook-form";
import { login, getUserInfo } from "../../../utils/api";

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
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const token = await login(data.email, data.password);
      const res = await getUserInfo(token);
      localStorage.setItem("token", token);
      if (res) navigate("/home");
    } catch (err) {
      console.error(err);
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
