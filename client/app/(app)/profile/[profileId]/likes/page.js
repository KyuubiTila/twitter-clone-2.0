'use client';
import React, { useEffect } from 'react';
import LikesPage from './LikesPage';
import { useProfile } from '@/stores/profile';

const LikesProfile = ({ profile }) => {
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
      profile={profile}
    />
  ) : (
    <p>Loading......</p>
  );
};

export default LikesProfile;
