'use client';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';

const updateProfile = async ({ data, profileId }) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.patch(
      `http://localhost:3001/profile/${profileId}`,
      data,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'An error occurred');
  }
};

const fetchUserProfileDetails = async (profileId) => {
  const accessToken = localStorage.getItem('accessToken');
  if (!accessToken) {
    throw new Error('Access token not found');
  }
  try {
    const response = await axios.get(
      `http://localhost:3001/profile/${profileId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export const useProfile = () => {
  const router = useRouter();
  const { profileId } = useParams();

  // UPDATE PROFILE
  const { mutate: patchProfile } = useMutation(
    (data) => updateProfile({ data, profileId }), // Pass profileId to updateProfile function
    {
      onSuccess: () => {
        router.push(`/profile/${profileId}`);
      },
      onError: (error) => {
        console.error('profile update failed:', error);
      },
    }
  );

  // GET  USER PROFILE
  const {
    data: profile,
    isLoading,
    isError,
    refetch: profileDetailsRefetch,
  } = useQuery(
    ['profileDetails', profileId],
    () => fetchUserProfileDetails(profileId),
    {
      enabled: !!profileId,
    }
  );

  return {
    profile,
    profileDetailsRefetch,
    isLoading,
    patchProfile,
  };
};
