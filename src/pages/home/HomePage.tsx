import { useEffect, useMemo, useCallback } from "react";
import style from "./HomePage.module.css";
import Pagination from "../../components/Pagination/Pagination";
import useBooks from "./components/useBooks";
import { Link, useSearchParams } from "react-router";
import Button from "../../components/Button/Button";

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
      <div className={style.container}>
        <Link to="/new">
          <Button className={style.new_book_button}>+ New book</Button>
        </Link>
        <div className={style.books_container}>
          {books.map((book) => {
            return (
              <>
                <div
                  key={book.id}
                  className={style.card}
                >
                  <div className={`${style.header}`}>
                    <h2>{book.title}</h2>
                  </div>
                  <div className={`${style.content}`}>
                    <p className={`${style.book_review}`}>{book.review}</p>
                    <p className={`${style.book_reviewer}`}>
                      Reviewed by: {book.reviewer}
                    </p>
                  </div>
                </div>
              </>
            );
          })}
        </div>
        <Pagination
          page={page}
          hasNext={hasNext}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
}
