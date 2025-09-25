import useNewPostForm from "./useNewPostForm";
import Button from "../../../components/Button/Button";
import style from "./NewPostForm.module.css";

export default function NewPostForm() {
  const { register, onSubmit, isLoading, isSubmitting } = useNewPostForm();
  return (
    <>
      {isLoading ?? <div>Loading...</div>}
      <form
        className={style.form}
        onSubmit={onSubmit}
      >
        <label htmlFor="title">Title</label>
        <input
          id="title"
          {...register("title")}
        />
        <label htmlFor="url">URL</label>
        <input
          id="url"
          {...register("url")}
        />
        <label htmlFor="detail">Detail</label>
        <input
          id="detail"
          {...register("detail")}
        />
        <label htmlFor="review">Review</label>
        <input
          id="review"
          {...register("review")}
        />
        <Button disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </>
  );
}
