import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';
import ProductFilter from './ProductFilter';
import Pagination from './Pagination';
import Cart from './Cart';

const ProductPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axios
      .get("https://dummyjson.com/products")
      .then((response) => {
        const fetchedProducts = response.data.products;
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts);
        const uniqueCategories = [...new Set(fetchedProducts.map((p) => p.category))];
        setCategories(["All Categories", ...uniqueCategories]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setError("Failed to load products. Please try again later.");
        setLoading(false);
      });
  }, []);


  const addToCart = (product) => {
    setCart(prevCart => {
      const productInCart = prevCart.find(item => item.id === product.id);
      if (productInCart) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
    setIsModalOpen(true); 
  };
  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    setCart(prevCart => {
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity } : item
      );
    });
  };


  const filterProducts = (selectedCategory) => {
    if (selectedCategory === "All Categories" || selectedCategory === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.category === selectedCategory));
    }
  };


  const sortProducts = (order) => {
    const sortedProducts = [...filteredProducts];
    if (order === 'asc') {
      sortedProducts.sort((a, b) => a.price - b.price);
    } else {
      sortedProducts.sort((a, b) => b.price - a.price);
    }
    setFilteredProducts(sortedProducts);
  };

  const productsPerPage = 5;
  const indexOfLastProduct = page * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <ProductFilter
          categories={categories}
          filterProducts={filterProducts}
          sortProducts={sortProducts}
        />
      </div>

      {loading ? (
        <div className="flex justify-center items-center text-xl text-gray-500">
          <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 border-solid border-gray-300 border-t-transparent rounded-full" />
        </div>
      ) : error ? (
        <div className="text-center text-xl text-red-500">{error}</div>
      ) : (
        <>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {currentProducts.length > 0 ? (
              currentProducts.map((product) => (
                <ProductCard key={product.id} product={product} addToCart={addToCart} />
              ))
            ) : (
              <div className="col-span-full text-center text-xl text-gray-500">
                No products found.
              </div>
            )}
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 flex justify-center">
            <Pagination
              totalProducts={filteredProducts.length}
              productsPerPage={productsPerPage}
              paginate={setPage}
            />
          </div>
        </>
      )}

{isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 px-4">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <h2 className="text-xl font-semibold text-center">Product Added to Cart</h2>
            <div className="mt-4">
              <Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
            </div>
            <button
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md"
              onClick={() => setIsModalOpen(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
};

export default ProductPage;