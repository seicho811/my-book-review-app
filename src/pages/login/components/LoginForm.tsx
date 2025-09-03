import { useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { login, getUserInfo } from "../../../utils/api";
import Button from "../../../components/Button/Button";
import style from "../../../pages/FormView.module.css";

type Inputs = {
  email: string;
  password: string;
};

export default function LoginForm() {
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
      if (res) navigate("/home");
    } catch (err) {
      console.error(err);
      setError("root", {
        type: "server",
        message: "Login failed.",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={style.form}
    >
      <div className={style.field}>
        <label
          htmlFor="email"
          className={style.label}
        >
          Email
        </label>
        <input
          id="email"
          className={style.input}
          {...register("email", { required: "Email is required." })}
        />
      </div>
      {errors.email && (
        <div
          className={style.alert}
          role="alert"
        >
          {errors.email && errors.email.message}
        </div>
      )}
      <div className={style.field}>
        <label
          htmlFor="password"
          className={style.label}
        >
          Password
        </label>
        <input
          id="password"
          className={style.input}
          {...register("password", { required: "Password is required." })}
        />
      </div>
      {errors.password && (
        <div
          className={style.alert}
          role="alert"
        >
          {errors.password && errors.password.message}
        </div>
      )}
      <Button
        type="submit"
        isDisabled={isSubmitting}
      >
        {isSubmitting ? "Logging in..." : "Login"}
      </Button>
      {errors.root && (
        <div
          className={style.alert}
          role="alert"
        >
          {errors.root && errors.root.message}
        </div>
      )}
    </form>
  );
}
