import { useMemo, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { signUp, uploadIcon } from "../utils/api";
import { compressToLimit } from "../utils/compressToLimit";

export default function SignUpForm() {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors },
  } = useForm<Inputs>();
  const icon = watch("icon")?.[0];
  const [status, setStatus] = useState<"idle" | "compressing" | "submitting">(
    "idle"
  );

  const navigate = useNavigate();

  async function compressIcon(file: File) {
    if (file) {
      setStatus("compressing");
      try {
        const compressedIcon = await compressToLimit(file);
        return compressedIcon;
      } finally {
        setStatus("idle");
      }
    }
    return null;
  }

  type Inputs = {
    name: string;
    email: string;
    password: string;
    icon: FileList | null;
  };

  async function onSubmit(data: Inputs) {
    const pickedIcon = data.icon?.[0];
    const compressedIcon = pickedIcon && (await compressIcon(pickedIcon));

    setStatus("submitting");
    try {
      const token = await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
      });
      if (compressedIcon) {
        uploadIcon(token, compressedIcon);
      }
      navigate("/home");
    } catch {
      setError("root", { type: "server", message: "Signup failed." });
    } finally {
      setStatus("idle");
    }
  }

  const validators = useMemo(
    () => ({
      validate: (files: FileList | null) => {
        const f = files?.[0];
        if (!f) return true; // file input is optional
        if (!["image/jpeg", "image/png"].includes(f.type)) {
          return "JPG/PNG files only";
        }
        return true;
      },
    }),
    []
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="name">User name</label>
        <input
          id="name"
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
          accept=".jpg, .jpeg, .png"
          {...register("icon", validators)}
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
        disabled={status !== "idle"}
      >
        {status === "submitting"
          ? "Signing up..."
          : status === "compressing"
          ? "compressing..."
          : "Sign up"}
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
