import Link from 'next/link';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import React from 'react';

const SignUp = ({ validationSchema, initialValues, register }) => {
  const activeRoute = 'signup';

  return (
    <section className="bg-white dark:bg-gray-900 rounded-lg px-4 md:px-0 lg:w-6/12">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <Formik
          initialValues={initialValues}
          onSubmit={(data, params) => {
            register(data);
            params.resetForm();
          }}
          validationSchema={validationSchema}
        >
          <Form className="w-full max-w-md">
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

              <Field
                type="text"
                name="username"
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Username"
                autoComplete="off"
              />
            </div>
            <ErrorMessage
              name="username"
              component="div"
              className="text-red-500"
            />

            <div className="relative flex items-center mt-6">
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
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </span>

              <Field
                type="email"
                name="email"
                className="block w-full py-3 text-gray-700 bg-white border rounded-lg px-11 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Email address"
                autoComplete="off"
              />
            </div>
            <ErrorMessage
              name="email"
              component="div"
              className="text-red-500"
            />

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

              <Field
                type="password"
                name="password"
                className="block w-full px-10 py-3 text-gray-700 bg-white border rounded-lg dark:bg-gray-900 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 dark:focus:border-blue-300 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
                placeholder="Password"
                autoComplete="off"
              />
            </div>
            <ErrorMessage
              name="password"
              component="div"
              className="text-red-500"
            />

            <div className="mt-6">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 w-full py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                SIGN UP
              </button>

              <div className="mt-6 text-center ">
                <Link
                  href={'/signin'}
                  className="text-sm text-blue-500 hover:underline dark:text-blue-400"
                >
                  Already have an account?
                </Link>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default SignUp;
