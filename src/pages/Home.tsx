import React from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiStar, FiTruck, FiShield, FiZap } from 'react-icons/fi';
import ProductCard from '../components/ProductCard';

const Home: React.FC = () => {
  const featuredCategories = [
    {
      name: 'Solar Panels',
      description: 'High-efficiency solar panels for residential and commercial use',
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=400&h=300&fit=crop',
      path: '/products/solar-panels',
      count: '500+ Products'
    },
    {
      name: 'Inverters',
      description: 'Reliable inverters for solar and backup power systems',
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=400&h=300&fit=crop',
      path: '/products/inverters',
      count: '300+ Products'
    },
    {
      name: 'Batteries',
      description: 'Long-lasting batteries for energy storage solutions',
      image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=400&h=300&fit=crop',
      path: '/products/batteries',
      count: '400+ Products'
    },
    {
      name: 'Electric Vehicles',
      description: 'Eco-friendly electric vehicles and charging solutions',
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop',
      path: '/products/evs',
      count: '200+ Products'
    }
  ];

  const featuredProducts = [
    {
      id: '1',
      name: '500W Solar Panel',
      price: 45000,
      originalPrice: 55000,
      image: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?w=300&h=200&fit=crop',
      category: 'Solar Panels',
      vendor: 'SolarTech Pakistan',
      rating: 4.8,
      reviews: 124
    },
    {
      id: '2',
      name: '3KW Hybrid Inverter',
      price: 85000,
      originalPrice: 95000,
      image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=300&h=200&fit=crop',
      category: 'Inverters',
      vendor: 'Power Solutions Ltd',
      rating: 4.6,
      reviews: 89
    },
    {
      id: '3',
      name: '100Ah Lithium Battery',
      price: 65000,
      originalPrice: 75000,
      image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=300&h=200&fit=crop',
      category: 'Batteries',
      vendor: 'Battery World',
      rating: 4.7,
      reviews: 156
    },
    {
      id: '4',
      name: 'Electric Scooter',
      price: 125000,
      originalPrice: 150000,
      image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=300&h=200&fit=crop',
      category: 'Electric Vehicles',
      vendor: 'EV Pakistan',
      rating: 4.5,
      reviews: 67
    }
  ];

  const stats = [
    { number: '10,000+', label: 'Happy Customers' },
    { number: '500+', label: 'Verified Vendors' },
    { number: '50,000+', label: 'Products Listed' },
    { number: '24/7', label: 'Customer Support' }
  ];

  const features = [
    {
      icon: <FiShield size={24} />,
      title: 'Verified Vendors',
      description: 'All vendors are thoroughly verified and rated by customers'
    },
    {
      icon: <FiTruck size={24} />,
      title: 'Fast Delivery',
      description: 'Quick delivery across Pakistan with tracking support'
    },
    {
      icon: <FiZap size={24} />,
      title: 'Quality Assured',
      description: 'Quality products with warranty and return policies'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 via-blue-700 to-green-600 text-white py-20">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Pakistan's Premier
                <span className="block text-green-300">Electric Marketplace</span>
              </h1>
              <p className="text-xl mb-8 text-blue-100">
                Discover the best solar panels, inverters, batteries, and electric vehicles from trusted vendors across Pakistan. 
                Power your future with sustainable energy solutions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products" className="btn bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
                  Explore Products
                </Link>
                <Link to="/sell-electricity" className="btn btn-secondary text-white border-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg">
                  Sell Electricity
                </Link>
              </div>
            </div>
            <div className="hidden lg:block">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-green-400 rounded-2xl transform rotate-6"></div>
                <div className="relative bg-white rounded-2xl p-8 shadow-2xl">
                  <div className="text-center">
                    <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FiZap size={40} className="text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-gray-800 mb-2">Join Bijli.live</h3>
                    <p className="text-gray-600 mb-4">Connect with Pakistan's electric market</p>
                    <div className="space-y-2 text-sm text-gray-500">
                      <div className="flex items-center justify-between">
                        <span>Solar Panels</span>
                        <span className="text-green-600 font-semibold">500+</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Inverters</span>
                        <span className="text-green-600 font-semibold">300+</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span>Batteries</span>
                        <span className="text-green-600 font-semibold">400+</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-blue-600 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Categories</h2>
            <p className="text-gray-600 text-lg">Explore our comprehensive range of electric products</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredCategories.map((category) => (
              <Link key={category.path} to={category.path} className="group">
                <div className="card overflow-hidden group-hover:shadow-lg transition-all duration-300">
                  <div className="relative overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.name}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300"></div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-gray-600 mb-3 text-sm">{category.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-blue-600 font-medium">{category.count}</span>
                      <FiArrowRight className="text-gray-400 group-hover:text-blue-600 transition-colors" />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Featured Products</h2>
            <p className="text-gray-600 text-lg">Top-rated products from trusted vendors</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link to="/products" className="btn btn-primary px-8 py-3 text-lg">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Bijli.live?</h2>
            <p className="text-gray-600 text-lg">We make buying electric products simple and reliable</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4 text-blue-600">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="container text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Power Your Future?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of customers who trust Bijli.live for their electric needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="btn bg-white text-blue-600 hover:bg-gray-100 px-8 py-3 text-lg">
              Get Started
            </Link>
            <Link to="/products" className="btn btn-secondary text-white border-white hover:bg-white hover:text-blue-600 px-8 py-3 text-lg">
              Browse Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
