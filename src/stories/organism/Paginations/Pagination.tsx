interface PaginationProps {
  total: number;
  current: number;
  maxLength: number;
  iconButton?: boolean;
  onPageChange: (page: number) => void;
}

export const Pagination = ({
  total,
  current,
  maxLength,
  onPageChange,
  iconButton = true,
}: PaginationProps) => {
  let startPage = Math.max(1, current - Math.floor(maxLength / 2));
  let endPage = Math.min(total, startPage + maxLength - 1);
  if (current > total - Math.floor(maxLength / 2)) {
    endPage = total;
    startPage = Math.max(1, endPage - maxLength + 1);
  }
  const pages = Array.from(
    { length: endPage - startPage + 1 },
    (_, i) => startPage + i
  );

  return (
    <ul className="pagination">
      <li
        className={`page-item ${current === 1 && "disabled"}`}
        onClick={() => current > 1 && onPageChange(current - 1)}
      >
        <a href="#" className="page-link">
          {iconButton ? <i className="previous"></i> : "Previous"}
        </a>
      </li>
      {startPage > 1 && (
        <>
          <li className="page-item" onClick={() => onPageChange(1)}>
            <a href="#" className="page-link">
              1
            </a>
          </li>
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
        </>
      )}
      {pages.map((page) => (
        <li
          key={page}
          className={`page-item ${page === current && "active"}`}
          onClick={() => onPageChange(page)}
        >
          <a href="#" className="page-link">
            {page}
          </a>
        </li>
      ))}
      {endPage < total && (
        <>
          <li className="page-item disabled">
            <span className="page-link">...</span>
          </li>
          <li className="page-item" onClick={() => onPageChange(total)}>
            <a href="#" className="page-link">
              {total}
            </a>
          </li>
        </>
      )}
      <li
        className={`page-item ${current === total && "disabled"}`}
        onClick={() => current < total && onPageChange(current + 1)}
      >
        <a href="#" className="page-link">
          {iconButton ? <i className="next"></i> : "Next"}
        </a>
      </li>
    </ul>
  );
};
