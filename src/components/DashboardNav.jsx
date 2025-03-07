import React from 'react';
import { Search, Home, Wallet, Receipt, PieChart, BarChart2, MessageSquare, Users, Shield, Settings, HelpCircle, LogOut } from 'lucide-react';

const FinanceDashboard = () => {
  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 border-r border-gray-200 bg-white">
        {/* Logo */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center">
            <span className="font-bold text-xl">SW</span>
          </div>
          <button className="text-gray-400 rounded-full hover:bg-gray-100 p-1">
            <Home size={20} />
          </button>
        </div>

        {/* Search Bar */}
        <div className="p-4">
          <div className="flex items-center bg-gray-100 rounded-md px-3 py-2">
            <Search size={16} className="text-gray-400" />
            <input 
              type="text" 
              placeholder="Search" 
              className="bg-transparent border-none outline-none ml-2 text-sm w-full"
            />
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="px-4 py-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider pb-2">
            DASHBOARD
          </div>
          <ul>
            <li className="mb-1">
              <a href="#" className="flex items-center text-gray-700 py-2 px-3 rounded-md hover:bg-gray-100">
                <Home size={18} className="mr-3" />
                <span className="text-sm">Dashboard</span>
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="flex items-center text-gray-700 py-2 px-3 rounded-md hover:bg-gray-100">
                <Wallet size={18} className="mr-3" />
                <span className="text-sm">Wallet</span>
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="flex items-center text-gray-500 py-2 px-3 rounded-md bg-gray-100">
                <Receipt size={18} className="mr-3" />
                <span className="text-sm">Transactions</span>
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="flex items-center text-gray-700 py-2 px-3 rounded-md hover:bg-gray-100">
                <PieChart size={18} className="mr-3" />
                <span className="text-sm">Budgets</span>
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="flex items-center text-gray-700 py-2 px-3 rounded-md hover:bg-gray-100">
                <BarChart2 size={18} className="mr-3" />
                <span className="text-sm">Reports</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="px-4 py-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider pb-2">
            COMMUNICATION
          </div>
          <ul>
            <li className="mb-1">
              <a href="#" className="flex items-center text-gray-700 py-2 px-3 rounded-md hover:bg-gray-100">
                <MessageSquare size={18} className="mr-3" />
                <span className="text-sm">Messages</span>
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="flex items-center text-gray-700 py-2 px-3 rounded-md hover:bg-gray-100">
                <Users size={18} className="mr-3" />
                <span className="text-sm">Shared Wallets</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="px-4 py-2">
          <div className="text-xs font-semibold text-gray-400 uppercase tracking-wider pb-2">
            SETTINGS
          </div>
          <ul>
            <li className="mb-1">
              <a href="#" className="flex items-center text-gray-700 py-2 px-3 rounded-md hover:bg-gray-100">
                <Shield size={18} className="mr-3" />
                <span className="text-sm">Access control</span>
              </a>
            </li>
            <li className="mb-1">
              <a href="#" className="flex items-center text-gray-700 py-2 px-3 rounded-md hover:bg-gray-100">
                <Settings size={18} className="mr-3" />
                <span className="text-sm">Settings</span>
              </a>
            </li>
          </ul>
        </div>

        {/* Bottom Actions */}
        <div className="absolute bottom-0 w-64 border-t border-gray-200 bg-white">
          <ul className="p-4">
            <li className="mb-1">
              <a href="#" className="flex items-center text-gray-700 py-2 px-3 rounded-md hover:bg-gray-100">
                <HelpCircle size={18} className="mr-3" />
                <span className="text-sm">Help</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center text-gray-700 py-2 px-3 rounded-md hover:bg-gray-100">
                <LogOut size={18} className="mr-3" />
                <span className="text-sm">Log out</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1">
        {/* Top Navigation */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 bg-white">
          <div className="relative w-96">
            <input
              type="text"
              placeholder="Search finances..."
              className="w-full rounded-md border border-gray-300 py-2 px-4 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400">
              <Search size={16} />
            </button>
          </div>
          <div className="flex items-center space-x-4">
            <button className="text-gray-500 hover:text-gray-700">
              <span className="text-xs">+ Add Expense</span>
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <span className="relative">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
                </svg>
                <span className="absolute -top-1 -right-1 flex h-3 w-3">
                  <span className="animate-ping absolute h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  <span className="relative rounded-full h-3 w-3 bg-red-500"></span>
                </span>
              </span>
            </button>
            <button className="text-gray-500 hover:text-gray-700">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5zm0 2h10v7h-2l-1 2H8l-1-2H5V5z" clipRule="evenodd" />
              </svg>
            </button>
            <div className="h-8 w-8 rounded-full bg-teal-500 flex items-center justify-center text-white font-medium text-sm">
              SP
            </div>
          </div>
        </div>

        {/* Dashboard Content Area */}
        <div className="p-6">
          {/* Content would go here */}
        </div>
      </div>
    </div>
  );
};

export default FinanceDashboard;