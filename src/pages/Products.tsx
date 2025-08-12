import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { FiFilter, FiGrid, FiList, FiStar, FiHeart, FiShoppingCart } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';
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
  location: string;
  warranty: string;
  stock: number;
}

const Products: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const { addItem } = useCart();

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState('');
  const [priceRange, setPriceRange] = useState([0, 500000]);
  const [selectedRating, setSelectedRating] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState('');
  const [sortBy, setSortBy] = useState('relevance');

  const categories = [
    'Solar Panels',
    'Inverters',
    'Batteries',
    'Electric Vehicles',
    'Electrical Appliances',
    'Electronics Parts',
    'Mobile Batteries',
    'Electrical Instruments'
  ];

  const locations = [
    'Lahore',
    'Karachi',
    'Islamabad',
    'Rawalpindi',
    'Faisalabad',
    'Multan',
    'Peshawar',
    'Quetta'
  ];

  // Mock data - replace with actual API call
  useEffect(() => {
    const mockProducts: Product[] = [
      {
        id: '1',
        name: '500W Monocrystalline Solar Panel',
        price: 45000,
        originalPrice: 55000,
        image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300&h=200&fit=crop',
        category: 'Solar Panels',
        vendor: 'SolarTech Pakistan',
        rating: 4.8,
        reviews: 124,
        location: 'Lahore',
        warranty: '25 Years',
        stock: 50
      },
      {
        id: '2',
        name: '3KW Hybrid Solar Inverter',
        price: 85000,
        originalPrice: 95000,
        image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=200&fit=crop',
        category: 'Inverters',
        vendor: 'Power Solutions Ltd',
        rating: 4.6,
        reviews: 89,
        location: 'Karachi',
        warranty: '5 Years',
        stock: 25
      },
      {
        id: '3',
        name: '100Ah Lithium Battery Pack',
        price: 65000,
        originalPrice: 75000,
        image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=300&h=200&fit=crop',
        category: 'Batteries',
        vendor: 'Battery World',
        rating: 4.7,
        reviews: 156,
        location: 'Islamabad',
        warranty: '3 Years',
        stock: 30
      },
      {
        id: '4',
        name: 'Electric Scooter E-200',
        price: 125000,
        originalPrice: 150000,
        image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
        category: 'Electric Vehicles',
        vendor: 'EV Pakistan',
        rating: 4.5,
        reviews: 67,
        location: 'Lahore',
        warranty: '2 Years',
        stock: 15
      },
      {
        id: '5',
        name: 'LED Smart Bulb Pack (4x)',
        price: 2500,
        image: 'https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=300&h=200&fit=crop',
        category: 'Electrical Appliances',
        vendor: 'Light Solutions',
        rating: 4.3,
        reviews: 89,
        location: 'Faisalabad',
        warranty: '1 Year',
        stock: 100
      },
      {
        id: '6',
        name: 'Arduino Uno R3 Board',
        price: 1200,
        image: 'https://images.unsplash.com/photo-1580894732444-8ecded7900cd?w=300&h=200&fit=crop',
        category: 'Electronics Parts',
        vendor: 'Electronics Hub',
        rating: 4.4,
        reviews: 234,
        location: 'Rawalpindi',
        warranty: '6 Months',
        stock: 200
      }
    ];

    setProducts(mockProducts);
    setFilteredProducts(mockProducts);
    setLoading(false);
  }, []);

  // Apply filters
  useEffect(() => {
    let filtered = [...products];

    // Category filter
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Price filter
    filtered = filtered.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    );

    // Rating filter
    if (selectedRating > 0) {
      filtered = filtered.filter(product => product.rating >= selectedRating);
    }

    // Location filter
    if (selectedLocation) {
      filtered = filtered.filter(product => product.location === selectedLocation);
    }

    // Search filter
    const search = searchParams.get('search');
    if (search) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(search.toLowerCase()) ||
        product.category.toLowerCase().includes(search.toLowerCase()) ||
        product.vendor.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Sort
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      default:
        // Keep original order for relevance
        break;
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, priceRange, selectedRating, selectedLocation, sortBy, searchParams]);

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      vendor: product.vendor
    });
  };

  const clearFilters = () => {
    setSelectedCategory('');
    setPriceRange([0, 500000]);
    setSelectedRating(0);
    setSelectedLocation('');
    setSortBy('relevance');
  };

  if (loading) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading products...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            {searchParams.get('search') ? `Search Results for "${searchParams.get('search')}"` : 'All Products'}
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} products found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden"
                >
                  <FiFilter size={20} />
                </button>
              </div>

              <div className={`lg:block ${showFilters ? 'block' : 'hidden'}`}>
                {/* Category Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Category</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <label key={category} className="flex items-center">
                        <input
                          type="radio"
                          name="category"
                          value={category}
                          checked={selectedCategory === category}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="mr-2"
                        />
                        <span className="text-sm">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Price Range (Rs.)</h4>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <input
                        type="number"
                        placeholder="Min"
                        value={priceRange[0]}
                        onChange={(e) => setPriceRange([parseInt(e.target.value) || 0, priceRange[1]])}
                        className="input text-sm"
                      />
                      <span>to</span>
                      <input
                        type="number"
                        placeholder="Max"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value) || 500000])}
                        className="input text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* Rating Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Minimum Rating</h4>
                  <div className="space-y-2">
                    {[4, 3, 2, 1].map((rating) => (
                      <label key={rating} className="flex items-center">
                        <input
                          type="radio"
                          name="rating"
                          value={rating}
                          checked={selectedRating === rating}
                          onChange={(e) => setSelectedRating(parseInt(e.target.value))}
                          className="mr-2"
                        />
                        <span className="text-sm">{rating}+ Stars</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Location Filter */}
                <div className="mb-6">
                  <h4 className="font-medium mb-3">Location</h4>
                  <select
                    value={selectedLocation}
                    onChange={(e) => setSelectedLocation(e.target.value)}
                    className="input text-sm"
                  >
                    <option value="">All Locations</option>
                    {locations.map((location) => (
                      <option key={location} value={location}>{location}</option>
                    ))}
                  </select>
                </div>

                {/* Clear Filters */}
                <button
                  onClick={clearFilters}
                  className="w-full btn btn-secondary"
                >
                  Clear All Filters
                </button>
              </div>
            </div>
          </div>

          {/* Products Section */}
          <div className="lg:w-3/4">
            {/* Toolbar */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">
                    {filteredProducts.length} products
                  </span>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Sort */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="input text-sm w-40"
                  >
                    <option value="relevance">Relevance</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="reviews">Most Reviewed</option>
                  </select>

                  {/* View Mode */}
                  <div className="flex items-center border border-gray-300 rounded-lg">
                    <button
                      onClick={() => setViewMode('grid')}
                      className={`p-2 ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                    >
                      <FiGrid size={16} />
                    </button>
                    <button
                      onClick={() => setViewMode('list')}
                      className={`p-2 ${viewMode === 'list' ? 'bg-blue-600 text-white' : 'text-gray-600'}`}
                    >
                      <FiList size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            {filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <FiFilter size={48} className="mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-600 mb-2">No products found</h3>
                <p className="text-gray-500">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearFilters}
                  className="btn btn-primary mt-4"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6' : 'space-y-4'}>
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
