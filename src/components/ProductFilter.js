import React from 'react';

const ProductFilter = ({ categories, filterProducts, sortProducts }) => (
  <div className="flex gap-4">
    <div>
  <select
    onChange={(e) => filterProducts(e.target.value)}
    className="border border-black rounded-md p-2"
  >
    {categories.map((category) => (
      <option key={category} value={category}>{category}</option>
    ))}
  </select>
</div>

    <div>
    <select onChange={(e) => sortProducts(e.target.value)}
      className="border border-black rounded-md p-2">
      <option value="asc">Price: Low to High</option>
      <option value="desc">Price: High to Low</option>
    </select>
    </div>
  </div>
);

export default ProductFilter;
