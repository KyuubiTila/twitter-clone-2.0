'use client';
import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import FileUpload from '@/utils/Fileupload';

const UpdateProfile = ({ validationSchema, initialValues, addProfile }) => {
  const [imageSrc, setImageSrc] = useState(null);

  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="container flex items-center justify-center min-h-screen px-6 mx-auto">
        <Formik
          initialValues={initialValues}
          onSubmit={(data, params) => {
            console.log(data);
            addProfile(data);
            params.resetForm();
            setImageSrc(null);
          }}
          validationSchema={validationSchema}
        >
          <Form className="w-full max-w-md">
            <div className="flex items-center justify-center">
              <a className="w-1/3 pb-4 font-medium text-center uppercase text-gray-800 dark:text-white">
                Update Profile
              </a>
            </div>

            <div className="mb-6">
              <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                USERNAME
              </div>
              <Field
                autoComplete="off"
                type="text"
                name="username"
                placeholder="enter username"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
              <span className="text-red-500">
                <ErrorMessage name="username" component="span" />
              </span>
            </div>

            <div className="mb-6">
              <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                PROFILE PHOTO
              </div>
              <Field
                name="image"
                component={FileUpload}
                setImageSrc={setImageSrc}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
              <span className="text-red-500">
                <ErrorMessage name="image" component="span" />
              </span>
            </div>

            <div className="mb-6">
              <div className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                BIO
              </div>
              <Field
                autoComplete="off"
                as="textarea"
                name="bio"
                placeholder="enter bio"
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
              />
              <span className="text-red-500">
                <ErrorMessage name="bio" component="span" />
              </span>
            </div>

            <div className="mt-6">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 w-full py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                UPDATE PROFILE
              </button>
            </div>
          </Form>
        </Formik>
      </div>
    </section>
  );
};

export default UpdateProfile;
