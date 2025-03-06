import React, { useState } from 'react';
import { ChevronRight, Plus, Settings, CreditCard, ArrowDown, ArrowUp, ShoppingBag, Coffee, Gift, Car, User, Eye, EyeOff } from 'lucide-react';

// Reusable Credit Card Component
const PaymentCard = ({ 
  cardNumber = "1234 5678 9012 2231", 
  cardholderName = "Michael Odhiambo", 
  currency = "Ksh", 
  cardType = "mastercard",
  hideDetails = false,
  toggleVisibility = () => {},
  className = ""
}) => {
  // Format card number with spaces
  const formatCardNumber = (number) => {
    if (hideDetails) return "•••• •••• •••• " + number.slice(-4);
    return number;
  };

  return (
    <div className={`relative w-full h-48 rounded-xl overflow-hidden ${className}`}>
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-800 via-indigo-600 to-blue-300 w-full h-full">
        {/* Abstract shapes for background design */}
        <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-blue-400 opacity-20 -translate-y-1/4 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-indigo-400 opacity-20 translate-y-1/4 -translate-x-1/4"></div>
      </div>

      {/* Card content */}
      <div className="relative z-10 flex flex-col justify-between h-full p-6 text-white">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium">Credit Card</h3>
          
          {/* Card type logo */}
          {cardType === "mastercard" && (
            <div className="flex">
              <div className="w-8 h-8 bg-red-500 rounded-full opacity-90"></div>
              <div className="w-8 h-8 bg-yellow-400 rounded-full opacity-90 -ml-4"></div>
            </div>
          )}
        </div>

        {/* Card number and cardholder sections */}
        <div className="space-y-4">
          <div className="text-xl tracking-wider font-medium">
            {formatCardNumber(cardNumber)}
          </div>
          <div className="font-medium">
            {hideDetails ? "•••• ••••" : cardholderName}
          </div>
        </div>

        {/* Footer with currency and show/hide toggle */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <CreditCard size={20} className="text-white" />
            <span>{currency}</span>
          </div>
          
          <button 
            onClick={toggleVisibility} 
            className="text-white focus:outline-none"
            aria-label={hideDetails ? "Show card details" : "Hide card details"}
          >
            {hideDetails ? 
              <Eye size={20} /> : 
              <EyeOff size={20} />
            }
          </button>
          
          {/* Secure element indicator */}
          <div className="text-sm">
            {hideDetails ? "••••••••••••••••••" : "****************"}
          </div>
        </div>
      </div>
    </div>
  );
};

const MainDashboard = () => {
  const [hideCardDetails, setHideCardDetails] = useState(true);
  
  return (
    <div className="bg-gray-100 min-h-screen p-4">
      {/* Header */}
      <header className="mb-4">
        <h1 className="text-xl font-semibold">Hello, Michael!</h1>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Wallet Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Wallet <span className="text-xs text-gray-400">Select Card 4</span></h2>
          </div>

          {/* Card Preview - Using the PaymentCard component */}
          <div className="mb-4">
            <PaymentCard 
              cardNumber="1234 5678 9012 2231"
              cardholderName="Michael Odhiambo"
              currency="Ksh"
              cardType="mastercard"
              hideDetails={hideCardDetails}
              toggleVisibility={() => setHideCardDetails(!hideCardDetails)}
            />
            <div className="mt-2 flex justify-center">
              <button className="bg-indigo-700 text-white text-xs py-1 px-4 rounded-full">ACTIVATE</button>
            </div>
          </div>

          {/* Card Stats */}
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <div className="text-xs text-gray-500">Total Balance</div>
              <div className="font-bold">$48,914.90</div>
              <div className="text-xs text-gray-500">Total in 4 cards</div>
              <div className="flex items-center">
                <span className="text-sm font-medium">$24,632.00</span>
                <span className="text-xs text-red-500 ml-2">-11.4%</span>
              </div>
            </div>
            <div>
              <div className="text-xs text-gray-500">Balance</div>
              <div className="font-bold">$19,114.00</div>
              <div className="text-xs text-gray-500">Currency</div>
              <div className="text-sm font-medium">Kenyan KESh</div>
            </div>
          </div>

          {/* Card Income */}
          <div>
            <div className="text-xs text-gray-500">Total income</div>
            <div className="flex items-center">
              <span className="text-sm font-medium">$26,520.00</span>
              <span className="text-xs text-green-500 ml-2">+16.2%</span>
            </div>
          </div>

          {/* Available limit */}
          <div className="mt-4">
            <div className="flex justify-between items-center text-xs">
              <span className="text-gray-500">Available limit</span>
              <span>63%</span>
            </div>
            <div className="w-full h-1 bg-gray-200 rounded-full mt-1">
              <div className="h-1 bg-indigo-600 rounded-full" style={{ width: '63%' }}></div>
            </div>
          </div>
        </div>

        {/* Goals Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Goals <span className="text-xs text-gray-400">Wallet 1 out of 4</span></h2>
            <button className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white">
              <Plus size={14} />
            </button>
          </div>

          {/* Goals Progress */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500">Tour ($25,000)</div>
              <div className="text-xs">Achieved $17,350.00</div>
              <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
                <div className="h-1 bg-blue-500 rounded-full" style={{ width: '70%' }}></div>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-3">
              <div className="text-xs text-gray-500">Car ($45,000)</div>
              <div className="text-xs">Achieved $19,580.00</div>
              <div className="w-full h-1 bg-gray-200 rounded-full mt-2">
                <div className="h-1 bg-blue-500 rounded-full" style={{ width: '45%' }}></div>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-2">
                <div className="w-6 h-6 text-blue-500">
                  <Settings />
                </div>
              </div>
              <span className="text-xs">Utilities</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-2">
                <div className="w-6 h-6 text-orange-500">
                  <Coffee />
                </div>
              </div>
              <span className="text-xs">Restaurants</span>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-2">
                <div className="w-6 h-6 text-green-500">
                  <ShoppingBag />
                </div>
              </div>
              <span className="text-xs">Gifts</span>
            </div>
          </div>

          <div className="mt-6 bg-gray-50 rounded-lg p-4">
            {/* This would be a chart or other component */}
          </div>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-white rounded-lg p-4 shadow-sm mt-4">
        <h2 className="font-medium mb-4">Transactional History</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b text-xs text-gray-500">
                <th className="text-left py-2 font-normal">Type/Name</th>
                <th className="text-left py-2 font-normal">Date</th>
                <th className="text-left py-2 font-normal">Category</th>
                <th className="text-left py-2 font-normal">Card Used</th>
                <th className="text-right py-2 font-normal">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-3 text-sm font-medium">Lyft Ride Home</td>
                <td className="py-3 text-sm text-gray-500">24/06/2023</td>
                <td className="py-3">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-orange-100 rounded-md flex items-center justify-center mr-2">
                      <Car size={14} className="text-orange-500" />
                    </div>
                    <span className="text-sm">Transport</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-gray-500">**** 2231</td>
                <td className="py-3 text-sm font-medium text-right">-$22.00</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 text-sm font-medium">Starbucks Coffee</td>
                <td className="py-3 text-sm text-gray-500">24/06/2023</td>
                <td className="py-3">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-green-100 rounded-md flex items-center justify-center mr-2">
                      <Coffee size={14} className="text-green-500" />
                    </div>
                    <span className="text-sm">Food & Drinks</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-gray-500">**** 4832</td>
                <td className="py-3 text-sm font-medium text-right">-$8.00</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 text-sm font-medium">Wage/Payment</td>
                <td className="py-3 text-sm text-gray-500">24/06/2023</td>
                <td className="py-3">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center mr-2">
                      <ArrowDown size={14} className="text-blue-500" />
                    </div>
                    <span className="text-sm">Income</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-gray-500">**** 3244</td>
                <td className="py-3 text-sm font-medium text-right text-green-500">+$1,200.00</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 text-sm font-medium">Amazon Purchase</td>
                <td className="py-3 text-sm text-gray-500">23/06/2023</td>
                <td className="py-3">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-purple-100 rounded-md flex items-center justify-center mr-2">
                      <ShoppingBag size={14} className="text-purple-500" />
                    </div>
                    <span className="text-sm">Shopping</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-gray-500">**** 2231</td>
                <td className="py-3 text-sm font-medium text-right">-$64.20</td>
              </tr>
              <tr className="border-b">
                <td className="py-3 text-sm font-medium">App Store</td>
                <td className="py-3 text-sm text-gray-500">22/06/2023</td>
                <td className="py-3">
                  <div className="flex items-center">
                    <div className="w-6 h-6 bg-red-100 rounded-md flex items-center justify-center mr-2">
                      <Gift size={14} className="text-red-500" />
                    </div>
                    <span className="text-sm">Entertainment</span>
                  </div>
                </td>
                <td className="py-3 text-sm text-gray-500">**** 8293</td>
                <td className="py-3 text-sm font-medium text-right">-$9.99</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Percentage Bars */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-orange-100 rounded-md flex items-center justify-center mr-2">
                  <ShoppingBag size={14} className="text-orange-500" />
                </div>
              </div>
              <span className="text-xs">24%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-orange-500 rounded-full" style={{ width: '24%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-green-100 rounded-md flex items-center justify-center mr-2">
                  <Coffee size={14} className="text-green-500" />
                </div>
              </div>
              <span className="text-xs">21%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-green-500 rounded-full" style={{ width: '21%' }}></div>
            </div>
          </div>
          <div>
            <div className="flex justify-between items-center mb-1">
              <div className="flex items-center">
                <div className="w-6 h-6 bg-blue-100 rounded-md flex items-center justify-center mr-2">
                  <Car size={14} className="text-blue-500" />
                </div>
              </div>
              <span className="text-xs">36%</span>
            </div>
            <div className="w-full h-2 bg-gray-200 rounded-full">
              <div className="h-2 bg-blue-500 rounded-full" style={{ width: '36%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics and Shared Wallet */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-4">
        {/* Statistics Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-medium">Statistics</h2>
            <div className="flex space-x-2">
              <button className="text-xs py-1 px-3 rounded-full bg-gray-200">1D</button>
              <button className="text-xs py-1 px-3 rounded-full bg-gray-200">1W</button>
              <button className="text-xs py-1 px-3 rounded-full bg-gray-200">1M</button>
              <button className="text-xs py-1 px-3 rounded-full bg-gray-800 text-white">1Y</button>
              <button className="text-xs py-1 px-3 rounded-full bg-gray-200">ALL</button>
            </div>
          </div>
          
          {/* Chart */}
          <div className="h-48 w-full relative mt-4">
            {/* This would be a real chart component */}
            <div className="absolute bottom-0 left-0 right-0 h-32">
              <svg viewBox="0 0 400 100" className="w-full h-full">
                <path d="M0,50 C20,40 40,60 60,50 C80,40 100,30 120,40 C140,50 160,70 180,60 C200,50 220,20 240,30 C260,40 280,80 300,70 C320,60 340,40 360,50 C380,60 400,50 400,50" 
                      fill="none" 
                      stroke="#4F46E5" 
                      strokeWidth="2" />
                <circle cx="180" cy="60" r="6" fill="#4F46E5" />
                <text x="180" y="40" fontSize="10" fill="#000" textAnchor="middle">$7.8K</text>
              </svg>
            </div>
            
            {/* X-axis labels */}
            <div className="absolute bottom-0 left-0 right-0 flex justify-between text-xs text-gray-500">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
              <span>Jul</span>
            </div>
          </div>
          
          <div className="flex justify-center mt-4 space-x-4">
            <div className="flex items-center">
              <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-500">Income</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 bg-purple-500 rounded-full mr-2"></div>
              <span className="text-xs text-gray-500">Expenses</span>
            </div>
          </div>
        </div>

        {/* Shared Wallet Section */}
        <div className="bg-white rounded-lg p-4 shadow-sm">
          <h2 className="font-medium mb-4">Shared Wallet</h2>
          
          <div className="grid grid-cols-4 gap-2 mb-4 text-sm font-medium">
            <div className="text-indigo-700">Name</div>
            <div className="text-indigo-700">Team</div>
            <div className="text-indigo-700">Date</div>
            <div className="text-indigo-700">Price</div>
          </div>
          
          <div className="space-y-3">
            <div className="grid grid-cols-4 gap-2 text-sm items-center">
              <div className="font-medium">Flight to Malaysia</div>
              <div>
                <div className="flex -space-x-1">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">M</div>
                  <div className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-white text-xs">S</div>
                </div>
              </div>
              <div className="text-gray-500">01 Mar, 2023</div>
              <div className="font-medium">$567.50</div>
            </div>
            
            <div className="grid grid-cols-4 gap-2 text-sm items-center">
              <div className="font-medium">Dinner at The Vine</div>
              <div>
                <div className="flex -space-x-1">
                  <div className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-white text-xs">M</div>
                  <div className="w-6 h-6 rounded-full bg-green-500 flex items-center justify-center text-white text-xs">K</div>
                </div>
              </div>
              <div className="text-gray-500">28 Feb, 2023</div>
              <div className="font-medium">$125.00</div>
            </div>
            
            <div className="grid grid-cols-4 gap-2 text-sm items-center">
              <div className="font-medium">Macbook purchase</div>
              <div>
                <div className="flex -space-x-1">
                  <div className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-white text-xs">J</div>
                  <div className="w-6 h-6 rounded-full bg-pink-500 flex items-center justify-center text-white text-xs">L</div>
                </div>
              </div>
              <div className="text-gray-500">25 Feb, 2023</div>
              <div className="font-medium">$2,499.00</div>
            </div>
          </div>
          
          {/* Team Members */}
          <div className="mt-6">
            <div className="flex -space-x-2 mb-3">
              <div className="w-8 h-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center">
                <User size={14} />
              </div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center text-white text-xs">M</div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-green-500 flex items-center justify-center text-white text-xs">K</div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-red-500 flex items-center justify-center text-white text-xs">S</div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-yellow-500 flex items-center justify-center text-white text-xs">L</div>
              <div className="w-8 h-8 rounded-full border-2 border-white bg-black flex items-center justify-center text-white text-xs">+</div>
            </div>
            
            <button className="w-full bg-black text-white text-xs py-2 rounded-lg">Create Shared Wallet</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainDashboard;