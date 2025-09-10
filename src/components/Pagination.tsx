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
        disabled={!canPrevious}
        onClick={() => {
          onPageChange(1);
        }}
      >
        {"<<"}
      </button>
      <button
        disabled={!canPrevious}
        onClick={() => {
          onPageChange(page - 1);
        }}
      >
        {"<"}
      </button>
      <span>Page {page}</span>
      <button
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
