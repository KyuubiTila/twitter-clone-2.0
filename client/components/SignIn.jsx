import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';

const SignIn = () => {
  const activeRoute = 'signin';
  const router = useRouter();

  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg px-4 md:px-0 lg:w-6/12">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <form className="w-full max-w-md">
          <div className="flex items-center justify-center mt-6">
            <Link
              href={'/signin'}
              className={`w-1/3 pb-4 font-medium text-center capitalize ${
                activeRoute === 'signin'
                  ? 'border-b-2 border-blue-500 text-blue-500 dark:text-white dark:border-blue-400'
                  : 'text-gray-800 dark:text-white'
              }`}
            >
              sign in
            </Link>
            <Link
              href={'/signup'}
              className={`w-1/3 pb-4 font-medium text-center capitalize ${
                activeRoute === 'signup'
                  ? 'border-b-2 border-blue-500 text-blue-500 dark:text-white dark:border-blue-400'
                  : 'text-gray-800 dark:text-white'
              }`}
            >
              sign up
            </Link>
          </div>

          <div className="relative flex items-center mt-8">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </span>

            <input
              type="text"
              className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Username"
              autoComplete="off"
            />
          </div>

          <div className="relative flex items-center mt-4">
            <span className="absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-6 h-6 mx-3 text-gray-300 dark:text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </span>

            <input
              type="password"
              className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              placeholder="Password"
              autoComplete="off"
            />
          </div>

          <div className="mt-6">
            <button
              // type="submit"
              onClick={() => router.push('/')}
              className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            >
              Sign In
            </button>

            <div className="mt-6 text-center">
              <Link
                href={'/signup'}
                className="text-sm text-blue-500 hover:underline dark:text-blue-400"
              >
                Do not have an account?
              </Link>
            </div>
          </div>
        </form>
      </div>
    </section>
  );
};

export default SignIn;
