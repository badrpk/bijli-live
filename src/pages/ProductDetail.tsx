import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useCart } from '../contexts/CartContext';
import { FiStar, FiHeart, FiShare2, FiTruck, FiShield, FiCheck, FiMapPin, FiStar as FiStarFilled } from 'react-icons/fi';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  images: string[];
  description: string;
  category: string;
  vendor: string;
  rating: number;
  reviews: number;
  location: string;
  warranty: string;
  stock: number;
  specifications: Record<string, string>;
  features: string[];
}

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addItem } = useCart();

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockProduct: Product = {
      id: '1',
      name: '500W Monocrystalline Solar Panel - High Efficiency',
      price: 45000,
      originalPrice: 55000,
      images: [
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop',
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop&sat=-50',
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop&hue=180',
        'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=600&h=400&fit=crop&contrast=150'
      ],
      description: 'High-efficiency monocrystalline solar panel with advanced cell technology. Perfect for residential and commercial installations. Features anti-reflective coating and weather-resistant design for optimal performance in all conditions.',
      category: 'Solar Panels',
      vendor: 'SolarTech Pakistan',
      rating: 4.8,
      reviews: 124,
      location: 'Lahore',
      warranty: '25 Years',
      stock: 50,
      specifications: {
        'Power Output': '500W',
        'Efficiency': '21.5%',
        'Cell Type': 'Monocrystalline',
        'Dimensions': '1765 x 1048 x 35mm',
        'Weight': '23.5 kg',
        'Voltage': '24V',
        'Current': '8.33A',
        'Temperature Coefficient': '-0.35%/°C'
      },
      features: [
        'High-efficiency monocrystalline cells',
        'Anti-reflective coating',
        'Weather-resistant design',
        'Easy installation',
        'Long warranty period',
        'Certified quality standards'
      ]
    };

    setProduct(mockProduct);
    setLoading(false);
  }, [id]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.images[0],
        category: product.category,
        vendor: product.vendor
      });
    }
  };

  const discount = product?.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  if (loading) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Product not found</h2>
          <Link to="/products" className="btn btn-primary">
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm text-gray-500">
            <li><Link to="/" className="hover:text-blue-600">Home</Link></li>
            <li>/</li>
            <li><Link to="/products" className="hover:text-blue-600">Products</Link></li>
            <li>/</li>
            <li><Link to={`/products/${product.category.toLowerCase().replace(' ', '-')}`} className="hover:text-blue-600">{product.category}</Link></li>
            <li>/</li>
            <li className="text-gray-800">{product.name}</li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div>
            <div className="mb-4">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-96 object-cover rounded-lg"
              />
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-full h-20 object-cover rounded-lg border-2 ${
                    selectedImage === index ? 'border-blue-600' : 'border-gray-200'
                  }`}
                >
                  <img src={image} alt={`${product.name} ${index + 1}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <FiStarFilled
                      key={i}
                      size={20}
                      className={`${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-gray-600">
                  {product.rating} ({product.reviews} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-4">
                <div className="flex items-center space-x-3">
                  <span className="text-3xl font-bold text-gray-800">
                    Rs. {product.price.toLocaleString()}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        Rs. {product.originalPrice.toLocaleString()}
                      </span>
                      <span className="badge badge-danger">
                        -{discount}%
                      </span>
                    </>
                  )}
                </div>
              </div>

              {/* Vendor & Location */}
              <div className="flex items-center space-x-6 text-sm text-gray-600 mb-4">
                <div className="flex items-center">
                  <span className="font-medium">Vendor:</span>
                  <span className="ml-1">{product.vendor}</span>
                </div>
                <div className="flex items-center">
                  <FiMapPin size={16} className="mr-1" />
                  <span>{product.location}</span>
                </div>
              </div>

              {/* Stock Status */}
              <div className="mb-6">
                {product.stock > 0 ? (
                  <span className="text-green-600 font-medium">In Stock ({product.stock} available)</span>
                ) : (
                  <span className="text-red-600 font-medium">Out of Stock</span>
                )}
              </div>
            </div>

            {/* Add to Cart Section */}
            <div className="bg-gray-50 p-6 rounded-lg mb-6">
              <div className="flex items-center space-x-4 mb-4">
                <label className="font-medium">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 flex items-center justify-center hover:bg-gray-100"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="w-full btn btn-primary py-3 text-lg font-medium mb-3"
              >
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>

              <div className="flex space-x-2">
                <button className="flex-1 btn btn-secondary py-2">
                  <FiHeart className="mr-2" />
                  Wishlist
                </button>
                <button className="flex-1 btn btn-secondary py-2">
                  <FiShare2 className="mr-2" />
                  Share
                </button>
              </div>
            </div>

            {/* Features */}
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-3">Key Features</h3>
              <ul className="space-y-2">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-center text-gray-600">
                    <FiCheck className="text-green-500 mr-2" size={16} />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>

            {/* Trust Badges */}
            <div className="flex items-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center">
                <FiTruck className="mr-2" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center">
                <FiShield className="mr-2" />
                <span>{product.warranty} Warranty</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="bg-white rounded-lg shadow">
            <div className="border-b border-gray-200">
              <nav className="flex space-x-8 px-6">
                <button className="py-4 px-1 border-b-2 border-blue-600 text-blue-600 font-medium">
                  Description
                </button>
                <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium">
                  Specifications
                </button>
                <button className="py-4 px-1 border-b-2 border-transparent text-gray-500 hover:text-gray-700 font-medium">
                  Reviews
                </button>
              </nav>
            </div>

            <div className="p-6">
              <div className="prose max-w-none">
                <p className="text-gray-600 leading-relaxed">{product.description}</p>
                
                <h3 className="text-lg font-semibold text-gray-800 mt-6 mb-3">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-100">
                      <span className="font-medium text-gray-700">{key}</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-8">Related Products</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Add related products here */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
