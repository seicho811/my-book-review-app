import { useProfileForm } from "./useProfileForm";

export default function ProfileForm() {
  const { register, onSubmit, errors, isLoading } = useProfileForm();
  return (
    <>
      {isLoading && <div>Loading...</div>}
      <form onSubmit={onSubmit}>
        <label htmlFor="name">Name</label>
        <input
          id="name"
          type="text"
          {...register("name")}
        />
        {errors.name && <div role="alert">{errors.name.message}</div>}
        <button>Submit</button>
      </form>
    </>
  );
}
