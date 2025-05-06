import React from "react";

const Login = () => {

    
  return (
    <div>
      <div class="flex justify-center items-center min-h-screen bg-gray-100">
        <div class="w-96 max-w-lg bg-white rounded-lg overflow-hidden shadow-lg">
          <div class="p-8">
            <div class="mb-8">
              <h1 class="text-3xl text-center text-gray-900 leading-tight">
                Admin Login
              </h1>
            </div>

            <div class="flex items-center my-6">
              <hr class="flex-grow border-gray-300" />
              <span class="px-2 text-sm text-gray-500">OR</span>
              <hr class="flex-grow border-gray-300" />
            </div>

            <form id="loginForm" class="space-y-4">
              <div class="bg-white rounded-lg max-w-md mx-auto py-2">
                <div class="relative bg-inherit">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    class="peer bg-transparent h-12 w-full rounded-lg text-gray-900 placeholder-transparent ring-2 ring-gray-300 px-4 focus:ring-sky-500 focus:outline-none focus:border-sky-600 transition-all"
                    placeholder="Enter your email"
                    required
                  />
                  <label
                    for="email"
                    class="absolute cursor-text left-4 -top-3 text-sm text-gray-600 bg-white px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                  >
                    Enter your email
                  </label>
                </div>
              </div>

              <div class="bg-white rounded-lg max-w-md mx-auto py-2">
                <div class="relative bg-inherit">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    class="peer bg-transparent h-12 w-full rounded-lg text-gray-900 placeholder-transparent ring-2 ring-gray-300 px-4 focus:ring-sky-500 focus:outline-none focus:border-sky-600 transition-all"
                    placeholder="Enter your password"
                    required
                  />
                  <label
                    for="password"
                    class="absolute cursor-text left-4 -top-3 text-sm text-gray-600 bg-white px-1 peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-500 peer-placeholder-shown:top-3 peer-focus:-top-3 peer-focus:text-sky-600 peer-focus:text-sm transition-all"
                  >
                    Password
                  </label>
                </div>
              </div>

              <div class="flex justify-between items-center">
                <div class="flex items-center">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    class="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300"
                  />
                  <label for="rememberMe" class="ml-2 text-sm text-gray-600">
                    Remember me
                  </label>
                </div>
                <a href="#" class="text-sm text-blue-500 hover:underline">
                  Forgot Password?
                </a>
              </div>

              <button
                type="submit"
                class="w-full p-3 bg-black text-white rounded-lg hover:bg-gray-800 focus:outline-none transition-colors"
              >
                Login
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
