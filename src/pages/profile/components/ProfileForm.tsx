import { useProfileForm } from "./useProfileForm";
import Button from "../../../components/Button/Button";
import style from "./ProfileForm.module.css";

export default function ProfileForm() {
  const { register, onSubmit, errors, isLoading } = useProfileForm();
  return (
    <>
      {isLoading && <div>Loading...</div>}
      <form
        className={style.form}
        onSubmit={onSubmit}
      >
        <label
          className={style.label}
          htmlFor="name"
        >
          Display name
        </label>
        <input
          id="name"
          className={style.input}
          type="text"
          {...register("name")}
        />
        {errors.name && <div role="alert">{errors.name.message}</div>}
        <Button className={style.button}>Update</Button>
      </form>
    </>
  );
}
