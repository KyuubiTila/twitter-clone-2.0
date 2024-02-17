import { useMutation } from 'react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const registerUser = async (data) => {
  try {
    const response = await axios.post(
      'http://localhost:3001/auth/signup',
      data
    );
    console.log(response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'An error occurred');
  }
};

const loginUser = async (data) => {
  console.log(data);
  try {
    const loggedInUser = await axios.post(
      'http://localhost:3001/auth/signin',
      data
    );
    console.log(loggedInUser);
    localStorage.setItem('accessToken', loggedInUser.data.accessToken);
    return loggedInUser.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'An error occurred');
  }
};

export const useAuth = () => {
  const router = useRouter();

  // REGISTER USER
  const { mutate: addUser } = useMutation(registerUser, {
    onSuccess: () => {
      router.push('/signin');
    },
    onError: (error) => {
      console.error('Registration failed:', error);
    },
  });

  // LOGIN USER
  const { mutate: login } = useMutation(loginUser, {
    onSuccess: () => {
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
      router.push('/signin');
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return {
    addUser,
    login,
    logOut,
  };
};
