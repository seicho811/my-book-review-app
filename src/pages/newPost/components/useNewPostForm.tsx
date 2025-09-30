import { useAuth } from "../../../contexts/AuthContext";
import { useForm, type SubmitHandler } from "react-hook-form";
import { postNewBook } from "../../../utils/api";
import { useNavigate } from "react-router";

type Inputs = {
  title: string;
  url: string;
  detail: string;
  review: string;
};

export default function useNewPostForm() {
  const { token } = useAuth();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isLoading, isSubmitting },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onValid: SubmitHandler<Inputs> = async (data) => {
    try {
      // const res = await postNewBook(token, data);
      throw new Error("Test: Failed to post new book.");
    } catch {
      throw new Error("Failed to post new book.");
    }
    navigate("/home");
  };

  return {
    register,
    setError,
    onSubmit: handleSubmit(onValid),
    errors,
    isLoading,
    isSubmitting,
  };
}
