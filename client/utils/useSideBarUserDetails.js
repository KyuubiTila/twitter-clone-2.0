'use client';
import { useQuery } from 'react-query';
import axios from 'axios';

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

export const useSideBarProfile = () => {
  let storedUserDetails = {};

  // Check if window is defined (i.e., if running in the browser)
  typeof window !== 'undefined'
    ? (storedUserDetails = JSON.parse(localStorage.getItem('userDetails')))
    : null;

  const { id: profileId } = storedUserDetails || {};

  const {
    data: profile,
    isLoading,
    refetch: profileSideBarDetailsRefetch,
  } = useQuery(
    ['profileDetails', profileId],
    () => fetchUserProfileDetails(profileId),
    {
      enabled: !!profileId,
    }
  );

  return {
    profile,
    profileSideBarDetailsRefetch,
    isLoading,
  };
};
