import { useState, useCallback } from "react";
import { getBooks } from "../../../utils/api";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router";
import { sendLog } from "../../../utils/logs";

type Book = {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
  isMine: boolean;
};

const LIMIT = 10;

export default function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [hasNext, setHasNext] = useState(false);

  const navigate = useNavigate();

  const { token } = useAuth();
  const fetchBooks = useCallback(
    async (page: number) => {
      if (!token) {
        console.log("Token not found");
        setBooks([]);
        return;
      }
      const offset = (page - 1) * LIMIT;

      try {
        const books: Book[] = await getBooks(token, offset);
        setBooks(books);
        setHasNext(books.length === LIMIT);
      } catch {
        throw new Error("Failed to fetch books");
      }
    },
    [token]
  );

  const onClickBook = useCallback(
    (id: string) => {
      navigate("/detail/" + id);
      if (token) {
        sendLog(token, id).catch((err) => {
          console.error("Failed to send log", err);
        });
      }
    },
    [navigate, token]
  );

  return {
    books,
    fetchBooks,
    hasNext,
    onClickBook,
  };
}
