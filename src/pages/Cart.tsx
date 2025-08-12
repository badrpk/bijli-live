import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { FiTrash2, FiMinus, FiPlus, FiArrowLeft, FiShoppingBag } from 'react-icons/fi';

const Cart: React.FC = () => {
  const { items, removeItem, updateQuantity, totalItems, totalPrice, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiShoppingBag size={48} className="text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8">
            Looks like you haven't added any products to your cart yet.
          </p>
          <Link to="/products" className="btn btn-primary px-8 py-3 text-lg">
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        {/* Header */}
        <div className="mb-8">
          <Link to="/products" className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4">
            <FiArrowLeft className="mr-2" />
            Continue Shopping
          </Link>
          <h1 className="text-3xl font-bold text-gray-800">Shopping Cart</h1>
          <p className="text-gray-600">{totalItems} items in your cart</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Cart Items</h2>
              </div>
              
              <div className="divide-y divide-gray-200">
                {items.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-center space-x-4">
                      {/* Product Image */}
                      <div className="flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded-lg"
                        />
                      </div>

                      {/* Product Details */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="text-lg font-medium text-gray-800 mb-1">
                              {item.name}
                            </h3>
                            <p className="text-sm text-gray-500 mb-2">
                              by {item.vendor}
                            </p>
                            <p className="text-sm text-blue-600 font-medium">
                              {item.category}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="text-lg font-bold text-gray-800">
                              Rs. {item.price.toLocaleString()}
                            </p>
                            <p className="text-sm text-gray-500">
                              Rs. {(item.price * item.quantity).toLocaleString()} total
                            </p>
                          </div>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                            >
                              <FiMinus size={16} />
                            </button>
                            <span className="w-12 text-center font-medium">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50"
                            >
                              <FiPlus size={16} />
                            </button>
                          </div>

                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700 flex items-center space-x-1"
                          >
                            <FiTrash2 size={16} />
                            <span>Remove</span>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Cart Actions */}
              <div className="p-6 border-t border-gray-200">
                <div className="flex items-center justify-between">
                  <button
                    onClick={clearCart}
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Clear Cart
                  </button>
                  <Link
                    to="/products"
                    className="btn btn-secondary"
                  >
                    Continue Shopping
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow sticky top-24">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold text-gray-800">Order Summary</h2>
              </div>

              <div className="p-6 space-y-4">
                {/* Subtotal */}
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal ({totalItems} items)</span>
                  <span>Rs. {totalPrice.toLocaleString()}</span>
                </div>

                {/* Shipping */}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className="text-green-600">Free</span>
                </div>

                {/* Tax */}
                <div className="flex justify-between text-gray-600">
                  <span>Tax</span>
                  <span>Rs. {(totalPrice * 0.15).toLocaleString()}</span>
                </div>

                {/* Divider */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between text-lg font-bold text-gray-800">
                    <span>Total</span>
                    <span>Rs. {(totalPrice * 1.15).toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link
                  to="/checkout"
                  className="w-full btn btn-primary py-3 text-center text-lg font-medium"
                >
                  Proceed to Checkout
                </Link>

                {/* Additional Info */}
                <div className="text-sm text-gray-500 text-center">
                  <p>Secure checkout powered by</p>
                  <div className="flex items-center justify-center space-x-2 mt-2">
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                    <div className="w-8 h-5 bg-gray-200 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Help Section */}
            <div className="bg-white rounded-lg shadow mt-6">
              <div className="p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Need Help?</h3>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>• Free shipping on orders over Rs. 10,000</p>
                  <p>• 30-day return policy</p>
                  <p>• 24/7 customer support</p>
                  <p>• Secure payment processing</p>
                </div>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <Link to="/contact" className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                    Contact Support →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
