import { type UseLoginFormType } from "./useLoginForm";
import Button from "../../../components/Button/Button";
import style from "../../../pages/FormView.module.css";

export default function LoginForm({
  register,
  onSubmit,
  errors,
  isSubmitting,
}: UseLoginFormType) {
  return (
    <form
      onSubmit={onSubmit}
      className={style.form}
      noValidate
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
          type="email"
          autoComplete="email"
          className={style.input}
          {...register("email", {
            required: "Email is required.",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Invalid email address.",
            },
          })}
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
          type="password"
          autoComplete="current-password"
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
