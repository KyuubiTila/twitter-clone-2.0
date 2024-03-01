'use client';
import { useMutation } from 'react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useQuery } from 'react-query';

const registerUser = async (data) => {
  try {
    const response = await axios.post(
      'http://localhost:3001/auth/signup',
      data
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'An error occurred');
  }
};

const loginUser = async (data) => {
  try {
    const loggedInUser = await axios.post(
      'http://localhost:3001/auth/signin',
      data
    );
    localStorage.setItem('accessToken', loggedInUser.data.accessToken);
    return loggedInUser.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'An error occurred');
  }
};

const fetchUserDetails = async () => {
  try {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
      console.error('Access token not found.');
      return {};
    }

    const response = await axios.post(
      'http://localhost:3001/auth/user',
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const user = response.data.user || {};
    const { id, username } = user;
    localStorage.setItem('userDetails', JSON.stringify(user));

    return { id, username };
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export const useAuth = () => {
  const router = useRouter();
  let storedUserDetails = {};

  // Check if window is defined (i.e., if running in the browser)
  typeof window !== 'undefined'
    ? (storedUserDetails = JSON.parse(localStorage.getItem('userDetails')))
    : null;

  const initialUserDetails = storedUserDetails || {};

  // REGISTER USER
  const { mutate: addUser } = useMutation(registerUser, {
    onSuccess: async () => {
      await userDetailsRefetch();
      router.push('/signin');
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });

  // LOGIN USER
  const { mutate: login } = useMutation(loginUser, {
    onSuccess: async () => {
      await userDetailsRefetch();
      router.push('/');
    },
    onError: (error) => {
      console.error('login failed:', error);
    },
  });

  // LOGOUT USER
  const logOut = async () => {
    try {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('userDetails');
      router.push('/signin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // GET AUTHENTICATED USER
  const {
    data: user,
    isLoading,
    isError,
    refetch: userDetailsRefetch,
  } = useQuery('userDetails', fetchUserDetails, {
    retry: 1,
    refetchOnWindowFocus: false,
    enabled: false,
    refetchOnMount: false,
    refetchOnReconnect: false,
    initialData: initialUserDetails,
  });

  const loggedIn = !isLoading && !isError && user && user.id !== undefined;

  return {
    loggedIn,
    user,
    addUser,
    login,
    logOut,
    userDetailsRefetch,
  };
};
