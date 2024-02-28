'use client';
import React, { useEffect } from 'react';
import UpdateProfile from './UpdateProfile';
import * as Yup from 'yup';
import { useProfile } from '@/stores/profile';

const UpdateProfilePage = () => {
  const { patchProfile, profile, profileDetailsRefetch, isLoading } =
    useProfile();
  useEffect(() => {
    profileDetailsRefetch();
  }, [profileDetailsRefetch]);

  const { bio } = profile || {};
  const { username } = (profile && profile.user) || {};

  // Define validation schema as a plain object
  const validationSchema = {
    username: Yup.string().required('You must input username'),
    image: Yup.string().optional(),
    bio: Yup.string().required('You must input a bio'),
  };

  // Convert validation schema to Yup schema
  const yupValidationSchema = Yup.object().shape(validationSchema);

  const initialValues = {
    username: username,
    image: '',
    bio: bio ? bio : '',
  };

  return (
    <>
      {isLoading ? ( // Conditionally render based on loading state
        <p>Loading...</p>
      ) : (
        <UpdateProfile
          validationSchema={yupValidationSchema}
          initialValues={initialValues}
          patchProfile={patchProfile}
        />
      )}
    </>
  );
};

export default UpdateProfilePage;
