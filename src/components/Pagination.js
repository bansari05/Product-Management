import React from 'react';

const Pagination = ({ totalProducts, productsPerPage, paginate }) => {
  const totalPages = Math.ceil(totalProducts / productsPerPage);

  const pageNumbers = [];
  for (let i = 1; i <= 5 && i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className="flex justify-center items-center space-x-2 mt-6">

      {pageNumbers.map(number => (
        <button
          key={number}
          onClick={() => paginate(number)}
          className="px-4 py-2 bg-gray-200 text-gray-700 font-semibold rounded-md hover:bg-blue-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition"
        >
          {number}
        </button>
      ))}

    </div>
  );
};

export default Pagination;
