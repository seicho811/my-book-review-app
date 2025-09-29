import BookDetail from "./components/BookDetail";
import { useParams } from "react-router";

export default function BookDetailPage() {
  const params = useParams();

  if (!params.id) return <div>No id</div>;
  return <BookDetail id={params.id} />;
}
