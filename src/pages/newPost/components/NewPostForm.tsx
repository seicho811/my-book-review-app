import useNewPostForm from "./useNewPostForm";
import Button from "../../../components/Button/Button";
import style from "./NewPostForm.module.css";
import { isValidURL } from "../../../utils/validator";

export default function NewPostForm() {
  const { register, onSubmit, isLoading, isSubmitting, errors } =
    useNewPostForm();
  return (
    <>
      {isLoading ?? <div>Loading...</div>}
      <form
        className={style.form}
        onSubmit={onSubmit}
      >
        <div className={style.field}>
          <label htmlFor="title">Title</label>
          <input
            id="title"
            className={style.input}
            {...register("title", { required: "Title is required" })}
          />
        </div>
        {errors.title && (
          <div className={style.alert}>
            {errors.title.message && <span>{errors.title.message}</span>}
          </div>
        )}
        <div className={style.field}>
          <label htmlFor="url">URL</label>
          <input
            id="url"
            className={style.input}
            {...register("url", {
              validate: (value) => {
                if (isValidURL(value)) return true;
                return "Invalid URL";
              },
            })}
          />
        </div>
        {errors.url && (
          <div className={style.alert}>
            <span>{errors.url.message ? errors.url.message : "Error"}</span>
          </div>
        )}
        <div className={style.field}>
          <label htmlFor="detail">Detail</label>
          <textarea
            id="detail"
            className={style.textarea}
            {...register("detail", { required: "Detail is required" })}
          />
        </div>
        {errors.detail && (
          <div className={style.alert}>
            <span>
              {errors.detail.message ? errors.detail.message : "Error"}
            </span>
          </div>
        )}
        <div className={style.field}>
          <label htmlFor="review">Review</label>
          <textarea
            id="review"
            className={style.textarea}
            {...register("review", { required: "Review is required" })}
          />
        </div>
        {errors.review && (
          <div className={style.alert}>
            <span>
              {errors.review.message ? errors.review.message : "Error"}
            </span>
          </div>
        )}
        <Button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
        {errors.root && (
          <div className={style.alert}>
            <span>{errors.root.message}</span>
          </div>
        )}
      </form>
    </>
  );
}
