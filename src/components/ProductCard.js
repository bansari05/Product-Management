import React from 'react';

const ProductCard = ({ product, addToCart }) => (
  <div className="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white hover:shadow-2xl transition-shadow duration-300">
    <div className="p-4">
      <h3 className="text-xl font-semibold text-gray-800 truncate">{product.name}</h3>
      <p className="text-gray-500 mt-2 text-sm">{product.category}</p>
      <p className="text-lg font-semibold text-blue-500 mt-4">${product.price}</p>
    </div>
    <div className="flex justify-center items-center pb-4">
      <button
        onClick={() => addToCart(product)} 
        className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none transition-colors duration-200"
      >
        Add to Cart
      </button>
    </div>
  </div>
);

export default ProductCard;
