'use client';
import React from 'react';
import UpdateProfile from './UpdateProfile';
import * as Yup from 'yup';

const UpdateProfilePage = () => {
  // Define validation schema as a plain object
  const validationSchema = {
    username: Yup.string().required('You must input username'),
    profilePhoto: Yup.string().required('You must upload a photo'),
    bio: Yup.string().required('You must input a bio'),
  };

  // Convert validation schema to Yup schema
  const yupValidationSchema = Yup.object().shape(validationSchema);

  const initialValues = {
    username: '',
    profilePhoto: '',
    bio: '',
  };

  return (
    <UpdateProfile
      validationSchema={yupValidationSchema}
      initialValues={initialValues}
    />
  );
};

export default UpdateProfilePage;
