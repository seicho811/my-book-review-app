import { type UseSignUpReturn } from "./useSignUpFrom";
import Button from "../../../components/Button/Button";
import style from "../../FormView.module.css";

export default function SignUpFormView({
  register,
  errors,
  onSubmit,
  busy,
  submitLabel,
  iconRules,
}: UseSignUpReturn) {
  return (
    <form
      onSubmit={onSubmit}
      className={style.form}
    >
      <div className={style.field}>
        <label
          htmlFor="name"
          className={style.label}
        >
          User name
        </label>
        <input
          id="name"
          type="text"
          autoComplete="username"
          className={style.input}
          {...register("name", { required: "Name is required." })}
        />
      </div>
      {errors.name && typeof errors.name.message === "string" && (
        <p
          className={style.alert}
          role="alert"
        >
          {errors.name.message}
        </p>
      )}
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
      {errors.email && typeof errors.email.message === "string" && (
        <p
          className={style.alert}
          role="alert"
        >
          {errors.email.message}
        </p>
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
          autoComplete="new-password"
          className={style.input}
          {...register("password", { required: "Password is required." })}
        />
      </div>
      {errors.password && typeof errors.password.message === "string" && (
        <p
          className={style.alert}
          role="alert"
        >
          {errors.password.message}
        </p>
      )}
      <div className={style.field}>
        <label
          htmlFor="icon"
          className={style.label}
        >
          Icon
        </label>
        <input
          type="file"
          id="icon"
          accept="image/png, image/jpeg"
          {...register("icon", iconRules)}
        />
      </div>
      {errors.icon && typeof errors.icon.message === "string" && (
        <p
          className="alert"
          role="alert"
        >
          {errors.icon.message}
        </p>
      )}
      <Button
        type="submit"
        isDisabled={busy}
      >
        {submitLabel}
      </Button>
      {errors.root && (
        <div
          role="alert"
          className={style.alert}
        >
          {errors.root.message}
        </div>
      )}
    </form>
  );
}
