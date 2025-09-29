import useBookDetail from "../components/useBookDetail";
import style from "./bookDetail.module.css";

type BookDetailProps = {
  id: string;
};

export default function BookDetail({ id }: BookDetailProps) {
  const { bookDetail, loading, error } = useBookDetail(id);
  if (error) return <div>Error: {error.message}</div>;
  if (loading) return <div>Loading...</div>;
  if (!bookDetail) return <div>No book detail found.</div>;

  return (
    <>
      <div className={style.container}>
        <section className={style.bookSection}>
          <div className={style.titleRow}>
            <a
              href={bookDetail.url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <h1 className={style.title}>{bookDetail.title}</h1>
            </a>
            <button className={bookDetail.isMine ? "" : style.hidden}>
              Edit
            </button>
          </div>
          <p className={style.detail}>{bookDetail.detail}</p>
        </section>

        <section className={style.reviewSection}>
          <h2 className={style.reviewTitle}>Review</h2>
          <p className={style.review}>{bookDetail.review}</p>
          <p className={style.reviewer}>reviewed by {bookDetail.reviewer}</p>
        </section>
      </div>
    </>
  );
}
