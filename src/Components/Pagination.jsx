const Pagination = ({ currentPage, totalPages, onPrev, onNext }) => {
  const disabledPrev = currentPage === 1;
  const disabledNext = currentPage === totalPages;

  return (
    <>
      <div className="join flex justify-center mt-4">
        <button
          className={`join-item btn ${disabledPrev ? "btn-disabled" : ""}`}
          onClick={onPrev}
          disabled={disabledPrev}
        >
          Previous
        </button>

        <button className="join-item btn btn-disabled">
          Page {currentPage} of {totalPages}
        </button>

        <button
          className={`join-item btn ${disabledNext ? "btn-disabled" : ""}`}
          onClick={onNext}
          disabled={disabledNext}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Pagination;
