import { useState } from "react";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log("Logging in with:", { email, password, rememberMe });
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Section - Login Form */}
      <div className="w-full md:w-1/2 p-8 md:p-16 flex flex-col justify-center">
        <div className="max-w-md mx-auto">
          <h1 className="text-3xl font-bold mb-2">Hello again!</h1>
          <p className="text-gray-600 mb-8">Login to access your account :)</p>

          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="mb-2">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                required
              />
            </div>

            <div className="flex justify-end mb-4">
              <a href="#" className="text-xs text-blue-600 hover:underline">
                Forgot your password?
              </a>
            </div>

            <div className="flex items-center mb-6">
              <input
                type="checkbox"
                id="remember"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-blue-600 border-gray-300 rounded"
              />
              <label
                htmlFor="remember"
                className="ml-2 block text-xs text-gray-700"
              >
                Remember for 30 days
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              Login
            </button>

            <div className="text-center my-4 text-gray-500">or</div>

            <div className="flex gap-4 mb-6">
              <button
                type="button"
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 48 48"
                  width="18"
                  height="18"
                >
                  <path
                    fill="#FFC107"
                    d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                  <path
                    fill="#FF3D00"
                    d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                  />
                  <path
                    fill="#4CAF50"
                    d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                  />
                  <path
                    fill="#1976D2"
                    d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                  />
                </svg>
                Sign in with Google
              </button>

              <button
                type="button"
                className="flex-1 py-2 px-4 border border-gray-300 rounded-md flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 2c5.514 0 10 4.486 10 10s-4.486 10-10 10-10-4.486-10-10 4.486-10 10-10zm-1.834 15.458c-.111 0-.214-.036-.302-.106-.115-.093-.173-.239-.173-.436v-4.916h-1.691v4.916c0 .197-.058.343-.173.436-.089.07-.192.106-.302.106-.12 0-.223-.036-.313-.106-.115-.093-.172-.239-.172-.436v-4.916h-1.68v-1.25h1.68v-1.937c0-.886.248-1.561.743-2.028.496-.466 1.156-.699 1.982-.699.696 0 1.225.173 1.585.52.36.347.54.832.54 1.455 0 .505-.129.933-.389 1.284-.26.35-.606.527-1.04.527-.364 0-.673-.121-.927-.36-.254-.24-.381-.547-.381-.923 0-.364.12-.667.359-.908.24-.242.526-.363.859-.363.23 0 .444.073.644.219l.22.22c.089.089.155.168.198.237.044.069.067.135.067.198 0 .098-.036.178-.106.238-.07.06-.155.106-.254.136-.098.03-.19.053-.278.067-.087.013-.18.02-.278.02h-.359v.678h.376c.326 0 .599.083.82.25.22.167.33.416.33.747 0 .331-.11.577-.33.737-.22.16-.494.24-.82.24h-.376v1.937c0 .197-.061.343-.184.436-.124.093-.289.139-.498.139zm4.834 0c-.12 0-.228-.036-.324-.106-.115-.093-.173-.239-.173-.436v-4.916h-1.68v-1.25h1.68v-1.937c0-.886.248-1.561.743-2.028.496-.466 1.156-.699 1.982-.699.696 0 1.225.173 1.585.52.36.347.54.832.54 1.455 0 .505-.129.933-.389 1.284-.26.35-.606.527-1.04.527-.364 0-.673-.121-.927-.36-.254-.24-.381-.547-.381-.923 0-.364.12-.667.359-.908.24-.242.526-.363.859-.363.23 0 .444.073.644.219l.22.22c.089.089.155.168.198.237.044.069.067.135.067.198 0 .098-.036.178-.106.238-.07.06-.155.106-.254.136-.098.03-.19.053-.278.067-.087.013-.18.02-.278.02h-.359v.678h.376c.326 0 .599.083.82.25.22.167.33.416.33.747 0 .331-.11.577-.33.737-.22.16-.494.24-.82.24h-.376v1.937c0 .197-.061.343-.184.436-.124.093-.289.139-.498.139z" />
                </svg>
                Sign in with Apple
              </button>
            </div>
          </form>

          <div className="text-center text-sm">
            <span className="text-gray-600">Dont have an account?</span>{" "}
            <a href="#" className="text-blue-600 font-medium hover:underline">
              Sign up
            </a>
          </div>
        </div>
      </div>

      {/* Right Section - Background Image */}
      <div className="hidden md:block md:w-1/2 bg-gray-100 rounded-l-[140px] overflow-hidden">
        <div className="h-full relative">
          <img
            src="https://placehold.co/600x400"
            alt="People on coins"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
