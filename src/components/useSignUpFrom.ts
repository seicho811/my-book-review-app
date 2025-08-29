import { useState, useMemo } from "react";
import { useNavigate } from "react-router";
import {
  useForm,
  type FieldErrors,
  type UseFormRegister,
  type RegisterOptions,
  type SubmitHandler,
} from "react-hook-form";
import { signUp, uploadIcon } from "../utils/api";
import { compressToLimit } from "../utils/compressToLimit";

export type Inputs = {
  name: string;
  email: string;
  password: string;
  icon?: FileList;
};

const MB = 1024 * 1024;

export type UseSignUpReturn = {
  register: UseFormRegister<Inputs>;
  errors: FieldErrors<Inputs>;
  onSubmit: (e?: React.BaseSyntheticEvent) => Promise<void>;
  busy: boolean;
  submitLabel: string;
  iconRules: RegisterOptions<Inputs, "icon">;
};

export function useSignUpForm() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    setError,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const [isCompressing, setIsCompressing] = useState(false);
  const busy = isSubmitting || isCompressing;

  const submitLabel = isSubmitting
    ? "Signing up..."
    : isCompressing
    ? "Compressing..."
    : "Sign up";

  async function compressIcon(file: File) {
    setIsCompressing(true);
    try {
      return await compressToLimit(file, 1 * MB);
    } catch {
      throw new Error("Image compression failed");
    } finally {
      setIsCompressing(false);
    }
  }

  async function compressAndUploadIcon(file: File, token: string) {
    try {
      const compressed = await compressIcon(file);
      await uploadIcon(token, compressed);
      return { ok: true };
    } catch (e) {
      const step =
        e instanceof Error && e.message.includes("compression")
          ? "compress"
          : "upload";
      return { ok: false, step };
    }
  }

  const iconRules = useMemo<RegisterOptions<Inputs, "icon">>(
    () => ({
      validate: (files?: FileList) => {
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

  const onValid: SubmitHandler<Inputs> = async (data) => {
    try {
      const token = await signUp({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      const pickedIcon = data.icon?.[0];
      if (pickedIcon) {
        const { ok, step } = await compressAndUploadIcon(pickedIcon, token);
        if (!ok) {
          setError("icon", {
            type: step === "compress" ? "server" : "client",
            message:
              step === "compress"
                ? "Image compression failed."
                : "Icon upload failed.",
          });
        }
      }
      reset();
      navigate("/home");
    } catch {
      setError("root", { type: "server", message: "Signup failed." });
    }
  };
  return {
    register,
    errors,
    onSubmit: handleSubmit(onValid),
    busy,
    submitLabel,
    iconRules,
  };
}
