const Pagination = ({ currentPage, totalPages, setPage }) => {
  return (
    <div className="flex justify-center mt-8">
      <button
        onClick={() => setPage(currentPage - 1)}
        disabled={currentPage === 1}
        className={`px-4 py-2 mx-1 text-sm font-semibold rounded-lg 
        ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
      >
        Previous
      </button>

      {[...Array(totalPages).keys()].map((number) => (
        <button
          key={number + 1}
          onClick={() => setPage(number + 1)}
          className={`px-4 py-2 mx-1 text-sm font-semibold rounded-lg 
          ${currentPage === number + 1 ? 'bg-blue-600 text-white' : 'bg-gray-300 hover:bg-gray-400'}`}
        >
          {number + 1}
        </button>
      ))}

      <button
        onClick={() => setPage(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`px-4 py-2 mx-1 text-sm font-semibold rounded-lg 
        ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-600 text-white hover:bg-blue-700'}`}
      >
        Next
      </button>
    </div>
  );
};
export default Pagination;