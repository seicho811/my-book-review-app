import { useEffect, useMemo, useCallback } from "react";
import { Card, CardHeader, CardContent } from "../../components/Card/Card";
import style from "./HomePage.module.css";
import Pagination from "../../components/Pagination/Pagination";
import useBooks from "./components/useBooks";
import { useSearchParams } from "react-router";

function parsePageParams(raw: string | null): number {
  const n = Number.parseInt(raw ?? "", 10);
  return Number.isFinite(n) && n > 0 ? n : 1;
}

export default function HomePage() {
  const [sp, setSp] = useSearchParams();
  const page = useMemo(() => parsePageParams(sp.get("page")), [sp]);
  const { books, fetchBooks, hasNext } = useBooks();

  useEffect(() => {
    fetchBooks(page);
  }, [page, fetchBooks]);

  const onPageChange = useCallback(
    (nextPage: number) => {
      setSp(
        (prev) => {
          const p = new URLSearchParams(prev);
          if (nextPage <= 1) p.delete("page");
          else p.set("page", String(nextPage));
          return p;
        },
        { replace: false }
      );
    },
    [setSp]
  );

  return (
    <>
      <div className={style.books_container}>
        {books.map((book) => {
          return (
            <Card
              key={book.id}
              className={style.book_card}
            >
              <CardHeader>
                <h2>{book.title}</h2>
              </CardHeader>
              <CardContent>
                <p className={`${style.book_review} ${style.flex_item}`}>
                  {book.review}
                </p>
                <p className={`${style.book_reviewer} ${style.flex_item}`}>
                  Reviewed by: {book.reviewer}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>
      <Pagination
        page={page}
        hasNext={hasNext}
        onPageChange={onPageChange}
      />
    </>
  );
}
