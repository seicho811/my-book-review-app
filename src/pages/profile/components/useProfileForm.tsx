import { useForm, type SubmitHandler, type ErrorOption } from "react-hook-form";
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
    try {
      await updateUserInfo(token, data.name);
    } catch (err) {
      setError("root", err);
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
