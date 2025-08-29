import { type UseSignUpReturn } from "./useSignUpFrom";

export default function SignUpFormView({
  register,
  errors,
  onSubmit,
  busy,
  submitLabel,
  iconRules,
}: UseSignUpReturn) {
  return (
    <form onSubmit={onSubmit}>
      <div>
        <label htmlFor="name">User name</label>
        <input
          id="name"
          type="text"
          autoComplete="username"
          {...register("name", { required: "Name is required." })}
        />
      </div>
      {errors.name && typeof errors.name.message === "string" && (
        <p
          className="alert"
          role="alert"
        >
          {errors.name.message}
        </p>
      )}
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="email"
          autoComplete="email"
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
          className="alert"
          role="alert"
        >
          {errors.email.message}
        </p>
      )}
      <div>
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          autoComplete="new-password"
          {...register("password", { required: "Password is required." })}
        />
      </div>
      {errors.password && typeof errors.password.message === "string" && (
        <p
          className="alert"
          role="alert"
        >
          {errors.password.message}
        </p>
      )}
      <div>
        <label htmlFor="icon">Icon</label>
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
      <button
        type="submit"
        disabled={busy}
      >
        {submitLabel}
      </button>
      {errors.root && (
        <div
          role="alert"
          className="alert"
        >
          {errors.root.message}
        </div>
      )}
    </form>
  );
}
