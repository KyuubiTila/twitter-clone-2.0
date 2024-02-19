'use client';
import React from 'react';
import UpdateProfile from './UpdateProfile';
import * as Yup from 'yup';
import { useProfile } from '@/stores/profile';

const UpdateProfilePage = () => {
  const { addProfile } = useProfile();

  // Define validation schema as a plain object
  const validationSchema = {
    username: Yup.string().required('You must input username'),
    image: Yup.string().required('You must upload a photo'),
    bio: Yup.string().required('You must input a bio'),
  };

  // Convert validation schema to Yup schema
  const yupValidationSchema = Yup.object().shape(validationSchema);

  const initialValues = {
    username: '',
    image: '',
    bio: '',
  };

  return (
    <UpdateProfile
      validationSchema={yupValidationSchema}
      initialValues={initialValues}
      addProfile={addProfile}
    />
  );
};

export default UpdateProfilePage;
