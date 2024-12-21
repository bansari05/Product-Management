import React from 'react';

const ProductFilter = ({ categories, filterProducts, sortProducts }) => (
  <div>
    <select onChange={(e) => filterProducts(e.target.value)}>
      <option value="">All Categories</option>
      {categories.map((category) => (
        <option key={category} value={category}>{category}</option>
      ))}
    </select>
    <select onChange={(e) => sortProducts(e.target.value)}>
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
    </select>
  </div>
);

export default ProductFilter;
