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

const followProfile = async ({ profileId }) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.post(
      `http://localhost:3001/follow/${profileId}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'An error occurred');
  }
};

const unfollowProfile = async ({ profileId }) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.delete(
      `http://localhost:3001/follow/${profileId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message || 'An error occurred');
  }
};

export const useProfile = () => {
  const router = useRouter();
  const { profileId } = useParams();

  // UPDATE PROFILE
  const { mutate: patchProfile } = useMutation(
    (data) => updateProfile({ data, profileId }),
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
    refetch: profileDetailsRefetch,
  } = useQuery(
    ['profileDetails', profileId],
    () => fetchUserProfileDetails(profileId),
    {
      enabled: !!profileId,
    }
  );

  // FOLLOW PROFILE
  const { mutate: follow } = useMutation(() => followProfile({ profileId }), {
    onError: (error) => {
      console.error('profile follow failed:', error);
    },
  });

  // UNFOLLOW PROFILE
  const { mutate: unfollow } = useMutation(
    () => unfollowProfile({ profileId }),
    {
      onError: (error) => {
        console.error('profile unfollow failed:', error);
      },
    }
  );

  return {
    profile,
    profileDetailsRefetch,
    isLoading,
    patchProfile,
    follow,
    unfollow,
  };
};
