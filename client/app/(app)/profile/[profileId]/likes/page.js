'use client';
import React, { useEffect } from 'react';
import LikesPage from './LikesPage';
import { useProfile } from '@/stores/profile';

const LikesProfile = () => {
  const {
    likedTweetsForProfile,
    isLoadingLikedTweetsForProfile,
    likedTweetsForProfileRefetch,
    likedCommentsForProfile,
    isLoadingLikedCommentsForProfile,
    likedCommentsForProfileRefetch,
  } = useProfile();

  useEffect(() => {
    likedTweetsForProfileRefetch();
    likedCommentsForProfileRefetch();
  }, [likedTweetsForProfileRefetch, likedCommentsForProfileRefetch]);

  return !isLoadingLikedTweetsForProfile && likedTweetsForProfile ? (
    <LikesPage
      likedTweetsForProfile={likedTweetsForProfile}
      likedCommentsForProfile={likedCommentsForProfile}
    />
  ) : (
    <p>Loading......</p>
  );
};

export default LikesProfile;
