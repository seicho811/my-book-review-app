import { useState, useCallback } from "react";
import { getBooks } from "../../../utils/api";
import { useAuth } from "../../../contexts/AuthContext";

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

  return {
    books,
    fetchBooks,
    hasNext,
  };
}
