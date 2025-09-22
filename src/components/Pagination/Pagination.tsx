import "./Pagination.module.css";
type PaginationProps = {
  page: number;
  hasNext: boolean;
  onPageChange: (newPage: number) => void;
};

export default function Pagination({
  page,
  onPageChange,
  hasNext,
}: PaginationProps) {
  const canPrevious = page > 1;
  return (
    <nav>
      <button
        type="button"
        aria-label="First page"
        disabled={!canPrevious}
        onClick={() => {
          onPageChange(1);
        }}
      >
        {"<<"}
      </button>
      <button
        type="button"
        aria-label="Previous page"
        disabled={!canPrevious}
        onClick={() => {
          onPageChange(page - 1);
        }}
      >
        {"<"}
      </button>
      <span>Page {page}</span>
      <button
        type="button"
        aria-label="Next page"
        disabled={!hasNext}
        onClick={() => {
          onPageChange(page + 1);
        }}
      >
        {">"}
      </button>
    </nav>
  );
}
