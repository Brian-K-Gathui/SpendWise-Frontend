export default function Feature() {
  return (
    <div className="min-h-screen bg-white px-4 py-12 md:px-6 lg:px-8 text-[#092C4C]">
      <div className="mt-17">
        {/*--------------------------------------- Features Header----------------------------------------------------------- */}
        <div className="mb-12">
          <div className="flex flex-col justify-center space-y-6">
            <span className="text-sm font-medium text-gray-600">Features</span>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
              Discover Our Powerful Expense Management Tools
            </h1>
            <p className="text-gray-700 max-w-3xl">
              Take control of your finances with our intuitive features.
              SpendWise empowers you to categorize expenses, track income, and
              collaborate seamlessly.
            </p>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
          {/* Card 1 */}
          <div className="flex flex-col flex-1">
            <div className="mb-6">
              <div className="bg-black p-3 inline-block rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-bold mb-3">
              Simplify Your Budgeting with Expense Categorization
            </h2>
            <p className="text-gray-700">
              Organize your spending by easily categorizing each transaction.
            </p>
          </div>

          {/* Card 2 */}
          <div className="flex flex-col flex-1">
            <div className="mb-6">
              <div className="bg-black p-3 inline-block rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-bold mb-3">
              Stay on Top of Your Earnings
            </h2>
            <p className="text-gray-700">
              Track your income effortlessly to understand your financial
              health.
            </p>
          </div>

          {/* Card 3 */}
          <div className="flex flex-col flex-1">
            <div className="mb-6">
              <div className="bg-black p-3 inline-block rounded">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                </svg>
              </div>
            </div>
            <h2 className="text-xl font-bold mb-3">
              Collaborate with Shared Wallets for Better Management
            </h2>
            <p className="text-gray-700">
              Share wallets with family or friends for collaborative budgeting.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-wrap gap-4 mb-24">
          <button className="px-4 py-2 border border-gray-300 rounded font-medium hover:bg-gray-50 transition-colors">
            Learn More
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded font-medium hover:bg-gray-50 transition-colors flex items-center">
            Sign Up
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Your Journey Section */}
        <div className="text-center">
          <span className="text-sm font-medium text-gray-600">Truck</span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">
            Your Journey to Smart Expense Management
          </h2>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <p className="max-w-2xl mx-auto text-gray-700">
            With SpendWise, tracking your expenses is a breeze. Follow these
            simple steps to take control of your finances today.
          </p>
        </div>

        {/* Steps with Images */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
          {/* Step 1 */}
          <div className="flex flex-col items-center flex-1">
            <div className="mb-4 w-full">
              <img
                src="https://placehold.co/600x400"
                alt="Create account"
                className="w-full h-auto rounded"
              />
            </div>
            <h3 className="text-lg font-bold mb-2 text-center">
              Create Your SpendWise Account Easily
            </h3>
            <p className="text-gray-700 text-center text-sm">
              Sign up for free and set up your profile.
            </p>
          </div>

          {/* Step 2 */}
          <div className="flex flex-col items-center flex-1">
            <div className="mb-4 w-full">
              <img
                src="https://placehold.co/600x400"
                alt="Set budgets"
                className="w-full h-auto rounded"
              />
            </div>
            <h3 className="text-lg font-bold mb-2 text-center">
              Set Budgets for Your Financial Goals
            </h3>
            <p className="text-gray-700 text-center text-sm">
              Define your spending limits to stay on track.
            </p>
          </div>

          {/* Step 3 */}
          <div className="flex flex-col items-center flex-1">
            <div className="mb-4 w-full">
              <img
                src="https://placehold.co/600x400"
                alt="Categorize expenses"
                className="w-full h-auto rounded"
              />
            </div>
            <h3 className="text-lg font-bold mb-2 text-center">
              Categorize Your Income and Expenses
            </h3>
            <p className="text-gray-700 text-center text-sm">
              Organize your transactions for better insights.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-center gap-4 mb-16">
          <button className="px-4 py-2 bg-gray-800 text-white rounded font-medium hover:bg-gray-700 transition-colors">
            Get Started
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded font-medium hover:bg-gray-50 transition-colors flex items-center">
            Learn More
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>

        {/* Results Section */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-8">
          <div className="flex-1">
            <span className="text-sm font-medium text-gray-600">Results</span>
            <h2 className="text-2xl font-bold mt-2 mb-4">
              Transform Your Financial Management with SpendWise
            </h2>
          </div>
          <div className="flex-1">
            <p className="text-gray-700">
              Join thousands of users who have streamlined their budgeting and
              expense tracking. Experience the power of informed financial
              decisions with SpendWise.
            </p>
          </div>
        </div>

        {/* Stats */}
        <div className="flex flex-col md:flex-row justify-center gap-16 mb-12">
          <div className="text-center">
            <p className="text-4xl font-bold mb-2">75%</p>
            <p className="text-sm text-gray-700">
              of users report improved financial clarity and control
            </p>
          </div>
          <div className="text-center">
            <p className="text-4xl font-bold mb-2">90%</p>
            <p className="text-sm text-gray-700">
              of users achieve their budgeting goals with our app
            </p>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="flex justify-center gap-4">
          <button className="px-4 py-2 border border-gray-300 rounded font-medium hover:bg-gray-50 transition-colors">
            Learn More
          </button>
          <button className="px-4 py-2 border border-gray-300 rounded font-medium hover:bg-gray-50 transition-colors flex items-center">
            Sign Up
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 ml-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
