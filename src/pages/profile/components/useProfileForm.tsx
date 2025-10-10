import { useForm, type SubmitHandler } from "react-hook-form";
import { updateUserInfo } from "../../../utils/api";
import { useAuth } from "../../../contexts/AuthContext";

type Inputs = {
  name: string;
};

export function useProfileForm() {
  const { user, token, saveUserInfo } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isLoading },
  } = useForm<Inputs>({ defaultValues: { name: user?.name } });

  const onValid: SubmitHandler<Inputs> = async (data) => {
    if (!token) {
      setError("root", {
        message: "You must be logged in to update your profile.",
      });
      return;
    }
    try {
      await updateUserInfo(token, data.name);
    } catch {
      setError("root", {
        message: "Failed to update profile. Please try again later.",
      });
      return;
    }
    saveUserInfo(data);
  };

  return {
    register,
    onSubmit: handleSubmit(onValid),
    errors,
    isLoading,
  };
}
