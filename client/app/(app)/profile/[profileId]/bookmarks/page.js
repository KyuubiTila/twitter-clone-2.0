'use client';
import React, { useEffect } from 'react';
import { useProfile } from '@/stores/profile';
import BookmarkPage from './BookmarkPage';

const BookmarkProfile = ({ profile }) => {
  const {
    bookmarkedTweetsForProfile,
    isLoadingBookmarkedTweetsForProfile,
    bookmarkedTweetsForProfileRefetch,
    bookmarkedCommentsForProfile,
    isLoadingBookmarkedCommentsForProfile,
    bookmarkedCommentsForProfileRefetch,
  } = useProfile();

  useEffect(() => {
    bookmarkedTweetsForProfileRefetch();
    bookmarkedCommentsForProfileRefetch();
  }, [bookmarkedTweetsForProfileRefetch, bookmarkedCommentsForProfileRefetch]);

  return !isLoadingBookmarkedTweetsForProfile && bookmarkedTweetsForProfile ? (
    <BookmarkPage
      bookmarkedTweetsForProfile={bookmarkedTweetsForProfile}
      bookmarkedCommentsForProfile={bookmarkedCommentsForProfile}
      profile={profile}
    />
  ) : (
    <p>Loading......</p>
  );
};

export default BookmarkProfile;
