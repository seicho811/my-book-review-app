import { fetchBookDetail } from "../../../utils/api";
import { useAuth } from "../../../contexts/AuthContext";
import { useMemo, useEffect, useState } from "react";
import { useNavigate } from "react-router";

type BookDetail = {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
  isMine: boolean;
};

type UseBookDetailResult = {
  bookDetail: BookDetail | null;
  loading: boolean;
  error: Error | null;
  navigate: ReturnType<typeof useNavigate>;
};

export default function useBookDetail(id: string | null): UseBookDetailResult {
  const { token } = useAuth();
  const [bookDetail, setBookDetail] = useState<BookDetail | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  const fetchError = useMemo(() => {
    if (!id) return new Error("No id provided");
    if (!token) return new Error("No token provided");
  }, [id, token]);

  useEffect(() => {
    if (fetchError) {
      setError(fetchError);
      setLoading(false);
      setBookDetail(null);
      return;
    }

    let isCancelled = false;
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const detail = await fetchBookDetail(token!, id!);
        if (!isCancelled) {
          setBookDetail(detail);
        }
      } catch (err) {
        if (!isCancelled) {
          setError(err as Error);
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
  }, [fetchError, id, token]);

  return { bookDetail, loading, error, navigate };
}
