import { useState, useEffect } from "react";
import { getBooks } from "../../utils/api";
import { Card, CardHeader, CardContent } from "../../components/Card/Card";
import style from "./HomePage.module.css";

type Book = {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
  isMine: boolean;
};

export default function HomePage() {
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const token: string | null = localStorage.getItem("token");
    if (!token) {
      console.log("Token not found");
      return;
    }
    const books = getBooks(token);
    books.then((res) => {
      setBooks(res);
    });
  }, []);
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
                <p className={`${style.book_detail} ${style.flex_item}`}>
                  {book.detail}
                </p>
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
    </>
  );
}
