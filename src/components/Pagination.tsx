import React from "react";

interface PaginationProps<T> {
  page: T;
  setPage: (arg: T | ((s: T) => T)) => void;
  totalPages: T;
}

const Pagination = (props: PaginationProps<number>) => {
  const { page, setPage, totalPages } = props;

  const previousPage = () => {
    setPage(s => (s === 1 ? 1 : s - 1));
  };

  const nextPage = () => {
    setPage(s => (s === totalPages ? totalPages : s + 1));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value;

    if (value < 1) {
      setPage(1);
    } else if (value > totalPages) {
      setPage(totalPages);
    } else {
      setPage(value);
    }
  };

  return (
    <div className="pagination__container">
      <div className="pagination--prev">
        <button onClick={previousPage}>
          <i className="fas fa-angle-double-left"></i>
        </button>
      </div>
      <div className="pagination--page-wrapper">
        <input
          className="pagination--current-page"
          type="text"
          value={page}
          onChange={handleChange}
        />
        <span>&nbsp;&nbsp;/&nbsp;&nbsp;{totalPages}</span>
      </div>
      <div className="pagination--next">
        <button onClick={nextPage}>
          <i className="fas fa-angle-double-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Pagination;
