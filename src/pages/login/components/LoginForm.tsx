import { useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form";
import { login, getUserInfo } from "../../../utils/api";

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
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          {...register("email", { required: "Email is required." })}
        />
      </div>
      {errors.email && (
        <div
          className="alert"
          role="alert"
        >
          {errors.email && errors.email.message}
        </div>
      )}
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          {...register("password", { required: "Password is required." })}
        />
      </div>
      {errors.password && (
        <div
          className="alert"
          role="alert"
        >
          {errors.password && errors.password.message}
        </div>
      )}
      <button type="submit">{isSubmitting ? "Logging in..." : "Login"}</button>
      {errors.root && (
        <div
          className="alert"
          role="alert"
        >
          {errors.root && errors.root.message}
        </div>
      )}
    </form>
  );
}
