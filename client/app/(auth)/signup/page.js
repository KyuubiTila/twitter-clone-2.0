'use client';
import SignUp from '@/components/SignUp';
import { useAuth } from '@/stores/auth';
import React from 'react';
import * as Yup from 'yup';

const SignupPage = () => {
  const { addUser } = useAuth();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('You must input a username'),
    email: Yup.string().required('You must input an email'),
    password: Yup.string().required('You must input a password'),
  });

  const initialValues = {
    username: '',
    email: '',
    password: '',
  };

  const register = async (data) => {
    try {
      await addUser(data);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };
  return (
    <SignUp
      validationSchema={validationSchema}
      initialValues={initialValues}
      register={register}
    />
  );
};

export default SignupPage;
