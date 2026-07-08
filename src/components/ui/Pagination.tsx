import { Link } from 'react-router-dom';

interface PaginationProps {
  buildPageHref: (pageNumber: number) => string;
  currentPage: number;
  totalPages: number;
}

export function Pagination({ buildPageHref, currentPage, totalPages }: PaginationProps) {
  if (totalPages <= 1) {
    return null;
  }

  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  return (
    <nav aria-label="Pagination" className="pagination">
      <div className="pagination__controls">
        <Link
          aria-disabled={currentPage === 1}
          className={currentPage === 1 ? 'button button--secondary is-disabled' : 'button button--secondary'}
          to={currentPage === 1 ? buildPageHref(1) : buildPageHref(currentPage - 1)}
        >
          Previous
        </Link>
        <div className="pagination__pages">
          {pageNumbers.map((pageNumber) => (
            <Link
              aria-current={pageNumber === currentPage ? 'page' : undefined}
              className={pageNumber === currentPage ? 'pagination__page is-current' : 'pagination__page'}
              key={pageNumber}
              to={buildPageHref(pageNumber)}
            >
              {pageNumber}
            </Link>
          ))}
        </div>
        <Link
          aria-disabled={currentPage === totalPages}
          className={
            currentPage === totalPages ? 'button button--secondary is-disabled' : 'button button--secondary'
          }
          to={currentPage === totalPages ? buildPageHref(totalPages) : buildPageHref(currentPage + 1)}
        >
          Next
        </Link>
      </div>
    </nav>
  );
}
