import { useAuth } from "../../../contexts/AuthContext";
import { useEffect, useState } from "react";
import { fetchBookDetail, updateBookDetail } from "../../../utils/api";
import { useForm, type UseFormRegister } from "react-hook-form";

type BookDetail = {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
  isMine: boolean;
};

type UseEditBookResults = {
  bookDetail: BookDetail | null;
  loading: boolean;
  error: Error | null;
  setBookDetail: React.Dispatch<React.SetStateAction<BookDetail | null>>;
  register: UseFormRegister<Inputs>;
  isSubmitSuccessful: boolean;
  errors: Record<string, any>;
  onSubmit: (data: Inputs) => Promise<void>;
};

type Inputs = {
  title: string;
  url: string;
  detail: string;
  review: string;
};

export default function useEditBookDetail(
  id: string | null
): UseEditBookResults {
  const { token } = useAuth();
  const [bookDetail, setBookDetail] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(false);

  const {
    register,
    reset,
    handleSubmit,
    setError,
    formState: { errors, isSubmitSuccessful },
  } = useForm<Inputs>();

  useEffect(() => {
    if (!id || !token) {
      setError("root", { message: "Missing id or token" });
      setLoading(false);
      setBookDetail(null);
      return;
    }

    let isCancelled = false;
    const fetchData = async () => {
      setLoading(true);
      try {
        const detail = await fetchBookDetail(token, id);
        if (!isCancelled) {
          setBookDetail(detail);
          reset({
            title: detail.title,
            url: detail.url,
            detail: detail.detail,
            review: detail.review,
          });
        }
      } catch (err) {
        if (!isCancelled) {
          setError("root", { message: (err as Error).message });
          setBookDetail(null);
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };
    fetchData();

    return () => {
      isCancelled = true;
    };
  }, [id, token, reset]);

  const onValid = async (data: Inputs) => {
    try {
      await updateBookDetail(token, id, data);
    } catch {
      setError("root", {
        message: "Failed to update book detail. Please try again later.",
      });
      return;
    }
  };

  return {
    bookDetail,
    loading,
    setBookDetail,
    register,
    isSubmitSuccessful,
    errors,
    onSubmit: handleSubmit(onValid),
  };
}
