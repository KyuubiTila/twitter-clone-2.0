'use client';
import React, { useEffect } from 'react';
import { useProfile } from '@/stores/profile';
import CreatedPage from './CreatedPage';

const CreatedProfile = ({ profile }) => {
  const {
    createdTweetForProfile,
    isLoadingCreatedTweetForProfile,
    createdTweetForProfileRefetch,
    createdCommentForProfile,
    isLoadingCreatedCommentForProfile,
    createdCommentForProfileRefetch,
  } = useProfile();

  useEffect(() => {
    createdTweetForProfileRefetch();
    createdCommentForProfileRefetch();
  }, [createdTweetForProfileRefetch, createdCommentForProfileRefetch]);
  return !isLoadingCreatedTweetForProfile ||
    !isLoadingCreatedCommentForProfile ? (
    <CreatedPage
      createdTweetForProfile={createdTweetForProfile}
      createdCommentForProfile={createdCommentForProfile}
      profile={profile}
    />
  ) : (
    <p>Loading......</p>
  );
};

export default CreatedProfile;
