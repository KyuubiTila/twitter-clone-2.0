'use client';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const createProfile = async (data) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.post('http://localhost:3001/profile', data, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'An error occurred');
  }
};

export const useProfile = () => {
  const router = useRouter();

  // CREATE PROFILE
  const { mutate: addProfile } = useMutation(createProfile, {
    onSuccess: () => {
      router.push('/profile');
    },
    onError: (error) => {
      console.error('profile creation failed:', error);
    },
  });

  return {
    addProfile,
  };
};
