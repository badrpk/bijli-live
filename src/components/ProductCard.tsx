import React from 'react';
import { Link } from 'react-router-dom';
import { FiStar, FiHeart, FiShoppingCart } from 'react-icons/fi';
import { useCart } from '../contexts/CartContext';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  category: string;
  vendor: string;
  rating: number;
  reviews: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      vendor: product.vendor
    });
  };

  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link to={`/product/${product.id}`} className="group">
      <div className="card overflow-hidden group-hover:shadow-lg transition-all duration-300">
        {/* Product Image */}
        <div className="relative overflow-hidden">
          <img 
            src={product.image} 
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Discount Badge */}
          {discount > 0 && (
            <div className="absolute top-2 left-2">
              <span className="badge badge-danger">
                -{discount}%
              </span>
            </div>
          )}
          
          {/* Wishlist Button */}
          <button className="absolute top-2 right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-red-50">
            <FiHeart size={16} className="text-gray-600 hover:text-red-500" />
          </button>
          
          {/* Quick Add to Cart */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-2 right-2 w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-blue-700"
          >
            <FiShoppingCart size={16} className="text-white" />
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          {/* Category */}
          <div className="text-sm text-blue-600 font-medium mb-2">
            {product.category}
          </div>
          
          {/* Product Name */}
          <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
          
          {/* Vendor */}
          <div className="text-sm text-gray-500 mb-3">
            by {product.vendor}
          </div>
          
          {/* Rating */}
          <div className="flex items-center mb-3">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <FiStar
                  key={i}
                  size={14}
                  className={`${
                    i < Math.floor(product.rating)
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500 ml-2">
              {product.rating} ({product.reviews})
            </span>
          </div>
          
          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-xl font-bold text-gray-800">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">
                  Rs. {product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
