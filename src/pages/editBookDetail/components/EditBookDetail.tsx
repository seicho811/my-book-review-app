import useEditBookDetail from "./useEditBookDetail";
import { useParams } from "react-router";
import style from "./EditBookDetail.module.css";

export default function EditBookDetail() {
  const params = useParams<{ id: string }>();
  const {
    bookDetail,
    loading,
    register,
    onSubmit,
    isSubmitSuccessful,
    errors,
  } = useEditBookDetail(params.id);
  if (loading) return <div>Loading...</div>;
  if (!bookDetail) return <div>No book detail found.</div>;

  return (
    <div>
      <form
        className={style.form}
        onSubmit={onSubmit}
      >
        <div className={style.field}>
          <label
            htmlFor="title"
            className={style.label}
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            className={style.input}
            {...register("title", { required: "Title is required" })}
          />
        </div>
        <div className={style.field}>
          <label
            htmlFor="url"
            className={style.label}
          >
            URL
          </label>
          <input
            id="url"
            type="text"
            className={style.input}
            {...register("url", { required: "URL is required" })}
          />
        </div>
        <div className={style.field}>
          <label
            htmlFor="detail"
            className={style.label}
          >
            Detail
          </label>
          <textarea
            id="detail"
            className={style.textarea}
            {...register("detail", { required: "Detail is required" })}
          />
        </div>
        <div className={style.field}>
          <label
            htmlFor="review"
            className={style.label}
          >
            Review
          </label>
          <textarea
            id="review"
            className={style.textarea}
            {...register("review", { required: "Review is required" })}
          />
        </div>
        <button type="submit">Save</button>
        {errors.root && (
          <div className={style.alert}>{errors.root.message}</div>
        )}
        {isSubmitSuccessful && (
          <div className={style.success}>Successfully updated!</div>
        )}
      </form>
    </div>
  );
}
