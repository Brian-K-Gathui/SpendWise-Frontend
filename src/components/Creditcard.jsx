import React from 'react';
import { CreditCard, Eye, EyeOff } from 'lucide-react';

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
    <div className={`relative w-full h-56 rounded-xl overflow-hidden ${className}`}>
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
          {cardType === "visa" && (
            <div className="text-white font-bold text-xl italic">VISA</div>
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



// export default CardDemo;