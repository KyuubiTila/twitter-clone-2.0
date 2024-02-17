'use client';
import SignIn from '@/components/SignIn';
import { useAuth } from '@/stores/auth';
import React from 'react';
import * as Yup from 'yup';

const SigninPage = () => {
  const { login } = useAuth();

  const validationSchema = Yup.object().shape({
    username: Yup.string().required('You must input a username'),
    password: Yup.string().required('You must input a password'),
  });

  const initialValues = {
    username: '',
    password: '',
  };

  const loginUser = async (data) => {
    try {
      await login(data);
    } catch (error) {
      console.error('Error registering user:', error);
    }
  };
  return (
    <SignIn
      validationSchema={validationSchema}
      initialValues={initialValues}
      loginUser={loginUser}
    />
  );
};

export default SigninPage;
