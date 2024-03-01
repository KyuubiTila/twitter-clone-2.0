'use client';
import React, { useEffect } from 'react';
import TweetsPage from './TweetsPage';
import { useProfile } from '@/stores/profile';

const TweetsProfile = ({ profile }) => {
  const {
    retweetedTweetsForProfile,
    isLoadingretweetedTweetsForProfile,
    retweetedTweetsForProfileRefetch,
    retweetedCommentsForProfile,
    isLoadingRetweetedCommentsForProfile,
    retweetedCommentsForProfileRefetch,
  } = useProfile();

  useEffect(() => {
    retweetedTweetsForProfileRefetch();
    retweetedCommentsForProfileRefetch();
  }, [retweetedTweetsForProfileRefetch, retweetedCommentsForProfileRefetch]);

  return !isLoadingretweetedTweetsForProfile && retweetedTweetsForProfile ? (
    <TweetsPage
      retweetedTweetsForProfile={retweetedTweetsForProfile}
      retweetedCommentsForProfile={retweetedCommentsForProfile}
      profile={profile}
    />
  ) : (
    <p>Loading......</p>
  );
};

export default TweetsProfile;
