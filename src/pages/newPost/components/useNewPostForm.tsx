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
    if (!token) {
      setError("root", {
        message: "You must be logged in to post a new book.",
      });
      return;
    }

    try {
      await postNewBook(token, data);
    } catch {
      setError("root", {
        message: "Failed to post new book. Please try again later.",
      });
      return;
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
