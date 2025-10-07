import useBookDetail from "../components/useBookDetail";
import style from "./bookDetail.module.css";
import { isValidURL } from "../../../utils/validator";
import Button from "../../../components/Button/Button";
import LinkIcon from "../../../components/Icons/LinkIcon";

type BookDetailProps = {
  id: string;
};

export default function BookDetail({ id }: BookDetailProps) {
  const { bookDetail, loading, error, navigate } = useBookDetail(id);
  if (error) return <div>Error: {error.message}</div>;
  if (loading) return <div>Loading...</div>;
  if (!bookDetail) return <div>No book detail found.</div>;

  return (
    <>
      <nav className={style.nav}>
        <Button onClick={() => window.history.back()}>&lt; Back</Button>
      </nav>
      <div className={style.container}>
        <section className={style.bookSection}>
          <div className={style.titleRow}>
            <h1 className={style.title}>{bookDetail.title}</h1>
          </div>
          <div className={style.navRow}>
            {isValidURL(bookDetail.url) && (
              <a
                href={bookDetail.url}
                target="_blank"
                rel="noopener noreferrer"
                className={style.link}
              >
                Link
                <LinkIcon />
              </a>
            )}
            <Button
              className={bookDetail.isMine ? "" : style.hidden}
              onClick={() => navigate(`/edit/${bookDetail.id}`)}
            >
              Edit
            </Button>
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
