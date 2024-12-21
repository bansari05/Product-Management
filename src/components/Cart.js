import React from 'react';

const Cart = ({ cart, removeFromCart, updateQuantity }) => {
  const getTotalPrice = () => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0).toFixed(2);
  };

  return (
    <div className="max-w-lg mx-auto bg-white rounded-lg shadow-md p-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Your Cart</h2>
      <div className="space-y-4">
        {cart.length > 0 ? (
          cart.map(item => (
            <div key={item.id} className="flex items-center justify-between">
              <div>
                <p className="text-black">{item.name}</p>
                <p className="text-sm text-black">{item.category}</p>
              </div>
              <div className="flex items-center space-x-2">
              <button
    onClick={() => {
      if (item.quantity > 0) {
        updateQuantity(item.id, item.quantity - 1);
      }
    }}
    className="px-2 bg-gray-200 text-black rounded-md"
  >
                  -
                </button>
                <span className="text-gray-800">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="px-2 bg-gray-200 text-black rounded-md"
                >
                  +
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Remove
                </button>
              </div>
              <span className="text-gray-800">${(item.price * item.quantity).toFixed(2)}</span>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-center">Your cart is empty.</p>
        )}
      </div>
      <div className="flex justify-between mt-4">
        <p className="font-semibold text-gray-800">Total: ${getTotalPrice()}</p>
      </div>
    </div>
  );
};

export default Cart;
