'use client';
import { useMutation, useQuery } from 'react-query';
import axios from 'axios';
import { useParams, useRouter } from 'next/navigation';
import { useSideBarProfile } from '@/utils/useSideBarUserDetails';

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

const getretweetedTweetsForProfile = async (userId) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.get(
      `http://localhost:3001/tweets-retweets/user/${userId}`,
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

const getretweetedCommentsForProfile = async (userId) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.get(
      `http://localhost:3001/comment-retweet/user/${userId}`,
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

const getLikedTweetsForProfile = async (userId) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.get(
      `http://localhost:3001/tweet-favoriting/user/${userId}`,
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

const getLikedCommentsForProfile = async (userId) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.get(
      `http://localhost:3001/comment-favorited/user/${userId}`,
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

const getBookmarkedTweetsForProfile = async (userId) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.get(
      `http://localhost:3001/tweet-bookmarks/user/${userId}`,
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

const getBookmarkedCommentsForProfile = async (userId) => {
  const accessToken = localStorage.getItem('accessToken');
  try {
    const response = await axios.get(
      `http://localhost:3001/comment-bookmark/user/${userId}`,
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

export const useProfile = (initialProfileId) => {
  const router = useRouter();
  const { profileId, userId } = useParams();
  const resolvedProfileId = profileId || userId || initialProfileId;
  const { profileSideBarDetailsRefetch } = useSideBarProfile();

  // UPDATE PROFILE
  const { mutate: patchProfile } = useMutation(
    (data) => updateProfile({ data, profileId: resolvedProfileId }),
    {
      onSuccess: () => {
        profileSideBarDetailsRefetch();
        router.push(`/profile/${resolvedProfileId}`);
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
    ['profileDetails', resolvedProfileId],
    () => fetchUserProfileDetails(resolvedProfileId),
    {
      enabled: !!resolvedProfileId,
    }
  );

  // FOLLOW PROFILE
  const { mutate: follow } = useMutation(
    () => followProfile({ profileId: resolvedProfileId }),
    {
      onError: (error) => {
        console.error('profile follow failed:', error);
      },
    }
  );

  // UNFOLLOW PROFILE
  const { mutate: unfollow } = useMutation(
    () => unfollowProfile({ profileId: resolvedProfileId }),
    {
      onError: (error) => {
        console.error('profile unfollow failed:', error);
      },
    }
  );

  // GET  RETWEETED TWEETS BY USER
  const {
    data: retweetedTweetsForProfile,
    isLoading: isLoadingRetweetedTweetsForProfile,
    refetch: retweetedTweetsForProfileRefetch,
  } = useQuery(
    ['retweetedTweetsForProfile', resolvedProfileId],
    () => getretweetedTweetsForProfile(resolvedProfileId),
    {
      enabled: !!resolvedProfileId,
    }
  );

  // GET  RETWEETED COMMENT BY USER
  const {
    data: retweetedCommentsForProfile,
    isLoading: isLoadingRetweetedCommentsForProfile,
    refetch: retweetedCommentsForProfileRefetch,
  } = useQuery(
    ['retweetedCommentsForProfile', resolvedProfileId],
    () => getretweetedCommentsForProfile(resolvedProfileId),
    {
      enabled: !!resolvedProfileId,
    }
  );

  // GET  LIKED TWEETS BY USER
  const {
    data: likedTweetsForProfile,
    isLoading: isLoadingLikedTweetsForProfile,
    refetch: likedTweetsForProfileRefetch,
  } = useQuery(
    ['likedTweetsForProfile', resolvedProfileId],
    () => getLikedTweetsForProfile(resolvedProfileId),
    {
      enabled: !!resolvedProfileId,
    }
  );

  // GET  LIKED COMMENT BY USER
  const {
    data: likedCommentsForProfile,
    isLoading: isLoadingLikedCommentsForProfile,
    refetch: likedCommentsForProfileRefetch,
  } = useQuery(
    ['likedCommentsForProfile', resolvedProfileId],
    () => getLikedCommentsForProfile(resolvedProfileId),
    {
      enabled: !!resolvedProfileId,
    }
  );

  // GET  BOOKMARKED TWEETS BY USER
  const {
    data: bookmarkedTweetsForProfile,
    isLoading: isLoadingBookmarkedTweetsForProfile,
    refetch: bookmarkedTweetsForProfileRefetch,
  } = useQuery(
    ['bookmarkedTweetsForProfile', resolvedProfileId],
    () => getBookmarkedTweetsForProfile(resolvedProfileId),
    {
      enabled: !!resolvedProfileId,
    }
  );

  // GET  BOOKMARKED COMMENTS BY USER
  const {
    data: bookmarkedCommentsForProfile,
    isLoading: isLoadingBookmarkedCommentsForProfile,
    refetch: bookmarkedCommentsForProfileRefetch,
  } = useQuery(
    ['bookmarkedCommentsForProfile', resolvedProfileId],
    () => getBookmarkedCommentsForProfile(resolvedProfileId),
    {
      enabled: !!resolvedProfileId,
    }
  );

  return {
    profile,
    profileDetailsRefetch,
    isLoading,
    patchProfile,
    follow,
    unfollow,
    retweetedTweetsForProfile,
    isLoadingRetweetedTweetsForProfile,
    retweetedTweetsForProfileRefetch,
    retweetedCommentsForProfile,
    isLoadingRetweetedCommentsForProfile,
    retweetedCommentsForProfileRefetch,
    likedTweetsForProfile,
    isLoadingLikedTweetsForProfile,
    likedTweetsForProfileRefetch,
    likedCommentsForProfile,
    isLoadingLikedCommentsForProfile,
    likedCommentsForProfileRefetch,
    bookmarkedTweetsForProfile,
    isLoadingBookmarkedTweetsForProfile,
    bookmarkedTweetsForProfileRefetch,
    bookmarkedCommentsForProfile,
    isLoadingBookmarkedCommentsForProfile,
    bookmarkedCommentsForProfileRefetch,
  };
};
