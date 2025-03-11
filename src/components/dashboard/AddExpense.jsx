import React, { useState } from 'react';

const ExpenseIncomeForm = () => {
  const [formData, setFormData] = useState({
    type: 'expense',
    amount: '',
    category: '',
    date: new Date().toISOString().substr(0, 10),
    description: '',
    wallet: 'personal',
    isSharedWallet: false
  });

  // Sample list of wallets
  const wallets = [
    { id: 'personal', name: 'Personal Wallet', color: 'blue' },
    { id: 'shared', name: 'Shared Wallet', color: 'purple' },
    { id: 'savings', name: 'Savings Wallet', color: 'teal' },
    { id: 'emergency', name: 'Emergency Fund', color: 'orange' }
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission - you would typically send this data to a server or state management system
    console.log('Form submitted:', formData);
    // Reset form after submission
    setFormData({
      ...formData,
      amount: '',
      category: '',
      description: '',
    });
    alert(`${formData.type} added successfully to ${formData.wallet} wallet!`);
  };

  // Get wallet color based on selected wallet
  const getWalletColor = () => {
    const selectedWallet = wallets.find(w => w.id === formData.wallet);
    return selectedWallet?.color || 'gray';
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Add Expense</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Transaction Type Toggle */}
        <div className="flex border rounded-md overflow-hidden">
          <button
            type="button"
            className={`flex-1 py-2 text-center transition-colors ${
              formData.type === 'expense' 
                ? 'bg-red-500 text-white font-medium' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFormData({ ...formData, type: 'expense' })}
          >
            Expense
          </button>
          <button
            type="button"
            className={`flex-1 py-2 text-center transition-colors ${
              formData.type === 'income' 
                ? 'bg-green-500 text-white font-medium' 
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
            onClick={() => setFormData({ ...formData, type: 'income' })}
          >
            Income
          </button>
        </div>
        
        {/* Amount */}
        <div>
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
            Amount
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <span className="text-gray-500">$</span>
            </div>
            <input
              type="number"
              id="amount"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              className="pl-7 block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-blue-500 focus:ring-blue-500"
              placeholder="0.00"
              step="0.01"
              min="0"
              required
            />
          </div>
        </div>
        
        {/* Wallet Selection */}
        <div>
          <label htmlFor="wallet" className="block text-sm font-medium text-gray-700 mb-1">
            Select Wallet
          </label>
          <div className="grid grid-cols-2 gap-2">
            {wallets.map((wallet) => (
              <div
                key={wallet.id}
                className={`
                  border rounded-md p-3 cursor-pointer transition-all
                  ${formData.wallet === wallet.id 
                    ? `border-2 border-${wallet.color}-500 bg-${wallet.color}-50` 
                    : 'border-gray-200 hover:border-gray-300'}
                `}
                onClick={() => setFormData({...formData, wallet: wallet.id})}
              >
                <div className="flex items-center">
                  <div className={`w-3 h-3 rounded-full bg-${wallet.color}-500 mr-2`}></div>
                  <span className="text-sm font-medium">{wallet.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-blue-500 focus:ring-blue-500"
            required
          >
            <option value="" disabled>Select a category</option>
            {formData.type === 'expense' ? (
              <>
                <option value="food">Food & Dining</option>
                <option value="transportation">Transportation</option>
                <option value="housing">Housing</option>
                <option value="utilities">Utilities</option>
                <option value="entertainment">Entertainment</option>
                <option value="shopping">Shopping</option>
                <option value="health">Health & Medical</option>
                <option value="other">Other</option>
              </>
            ) : (
              <>
                <option value="salary">Salary</option>
                <option value="investment">Investment</option>
                <option value="gift">Gift</option>
                <option value="refund">Refund</option>
                <option value="other">Other</option>
              </>
            )}
          </select>
        </div>
        
        {/* Date */}
        <div>
          <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-1">
            Date
          </label>
          <input
            type="date"
            id="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-blue-500 focus:ring-blue-500"
            required
          />
        </div>
        
        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
            className="block w-full rounded-md border-gray-300 shadow-sm border p-2 focus:border-blue-500 focus:ring-blue-500"
            placeholder={`Enter details about this ${formData.type}...`}
          ></textarea>
        </div>
        
        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-2 px-4 rounded-md text-white font-medium transition-colors ${
            formData.type === 'expense' 
              ? 'bg-red-600 hover:bg-red-700' 
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          Add {formData.type.charAt(0).toUpperCase() + formData.type.slice(1)}
        </button>
      </form>
    </div>
  );
};

export default ExpenseIncomeForm;