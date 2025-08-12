import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Link } from 'react-router-dom';
import { FiUser, FiShoppingBag, FiHeart, FiSettings, FiLogOut, FiEdit3, FiMapPin, FiPhone, FiMail, FiLock, FiShield, FiTrash2 } from 'react-icons/fi';

const Dashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');

  // Mock data - replace with actual API calls
  const orders = [
    {
      id: 'ORD001',
      date: '2024-01-15',
      status: 'Delivered',
      total: 45000,
      items: [
        { name: '500W Solar Panel', quantity: 1, price: 45000 }
      ]
    },
    {
      id: 'ORD002',
      date: '2024-01-10',
      status: 'In Transit',
      total: 85000,
      items: [
        { name: '3KW Hybrid Inverter', quantity: 1, price: 85000 }
      ]
    }
  ];

  const wishlist = [
    {
      id: '1',
      name: '100Ah Lithium Battery',
      price: 65000,
      image: 'https://images.unsplash.com/photo-1609599006353-e629aaabfeae?w=150&h=150&fit=crop'
    }
  ];

  const tabs = [
    { id: 'profile', name: 'Profile', icon: FiUser },
    { id: 'orders', name: 'Orders', icon: FiShoppingBag },
    { id: 'wishlist', name: 'Wishlist', icon: FiHeart },
    { id: 'settings', name: 'Settings', icon: FiSettings }
  ];

  const renderProfile = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Personal Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                value={user?.name || ''}
                className="input flex-1"
                readOnly
              />
              <button className="btn btn-secondary p-2">
                <FiEdit3 size={16} />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <div className="flex items-center space-x-2">
              <input
                type="email"
                value={user?.email || ''}
                className="input flex-1"
                readOnly
              />
              <button className="btn btn-secondary p-2">
                <FiEdit3 size={16} />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
            <div className="flex items-center space-x-2">
              <input
                type="tel"
                value={user?.phone || 'Not provided'}
                className="input flex-1"
                placeholder="Add phone number"
              />
              <button className="btn btn-secondary p-2">
                <FiEdit3 size={16} />
              </button>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
            <div className="flex items-center space-x-2">
              <textarea
                value={user?.address || 'Not provided'}
                className="input flex-1 resize-none"
                rows={3}
                placeholder="Add address"
              />
              <button className="btn btn-secondary p-2">
                <FiEdit3 size={16} />
              </button>
            </div>
          </div>
        </div>
        <div className="mt-6">
          <button className="btn btn-primary">Save Changes</button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Account Security</h3>
        <div className="space-y-4">
          <button className="btn btn-secondary w-full justify-start">
            <FiLock className="mr-2" />
            Change Password
          </button>
          <button className="btn btn-secondary w-full justify-start">
            <FiShield className="mr-2" />
            Two-Factor Authentication
          </button>
        </div>
      </div>
    </div>
  );

  const renderOrders = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">Order History</h3>
        </div>
        <div className="divide-y divide-gray-200">
          {orders.map((order) => (
            <div key={order.id} className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="font-medium text-gray-800">Order #{order.id}</h4>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
                <div className="text-right">
                  <p className="font-medium text-gray-800">Rs. {order.total.toLocaleString()}</p>
                  <span className={`badge ${
                    order.status === 'Delivered' ? 'badge-success' : 'badge-warning'
                  }`}>
                    {order.status}
                  </span>
                </div>
              </div>
              
              <div className="space-y-2">
                {order.items.map((item, index) => (
                  <div key={index} className="flex items-center justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span>Rs. {item.price.toLocaleString()}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 flex space-x-2">
                <button className="btn btn-secondary text-sm">View Details</button>
                <button className="btn btn-primary text-sm">Track Order</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderWishlist = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">My Wishlist</h3>
        </div>
        <div className="p-6">
          {wishlist.length === 0 ? (
            <div className="text-center py-8">
              <FiHeart className="mx-auto text-gray-400 mb-4" size={48} />
              <h3 className="text-lg font-medium text-gray-600 mb-2">Your wishlist is empty</h3>
              <p className="text-gray-500">Start adding products you love to your wishlist</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-32 object-cover rounded-lg mb-3"
                  />
                  <h4 className="font-medium text-gray-800 mb-2">{item.name}</h4>
                  <p className="text-lg font-bold text-gray-800 mb-3">
                    Rs. {item.price.toLocaleString()}
                  </p>
                  <div className="flex space-x-2">
                    <button className="btn btn-primary flex-1 text-sm">Add to Cart</button>
                    <button className="btn btn-secondary p-2">
                      <FiTrash2 size={16} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Notification Preferences</h3>
        <div className="space-y-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-3" defaultChecked />
            <span>Email notifications for orders</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-3" defaultChecked />
            <span>Promotional emails</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-3" />
            <span>SMS notifications</span>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Privacy Settings</h3>
        <div className="space-y-4">
          <label className="flex items-center">
            <input type="checkbox" className="mr-3" defaultChecked />
            <span>Profile visibility</span>
          </label>
          <label className="flex items-center">
            <input type="checkbox" className="mr-3" />
            <span>Share purchase history</span>
          </label>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Danger Zone</h3>
        <button className="btn bg-red-600 hover:bg-red-700 text-white">
          Delete Account
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeTab) {
      case 'profile':
        return renderProfile();
      case 'orders':
        return renderOrders();
      case 'wishlist':
        return renderWishlist();
      case 'settings':
        return renderSettings();
      default:
        return renderProfile();
    }
  };

  if (!user) {
    return (
      <div className="container py-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Please log in to access your dashboard</h2>
          <Link to="/login" className="btn btn-primary">
            Login
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
          <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
          <p className="text-gray-600">Welcome back, {user.name}!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-green-500 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-lg">
                      {user.name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-800">{user.name}</h3>
                    <p className="text-sm text-gray-500">{user.role}</p>
                  </div>
                </div>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-2">
                  {tabs.map((tab) => (
                    <li key={tab.id}>
                      <button
                        onClick={() => setActiveTab(tab.id)}
                        className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left transition-colors ${
                          activeTab === tab.id
                            ? 'bg-blue-50 text-blue-600'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <tab.icon size={20} />
                        <span>{tab.name}</span>
                      </button>
                    </li>
                  ))}
                </ul>
              </nav>

              <div className="p-4 border-t border-gray-200">
                <button
                  onClick={logout}
                  className="w-full flex items-center space-x-3 px-3 py-2 rounded-lg text-left text-red-600 hover:bg-red-50 transition-colors"
                >
                  <FiLogOut size={20} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {renderContent()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
