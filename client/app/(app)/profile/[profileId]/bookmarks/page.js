'use client';
import React, { useEffect } from 'react';
import { useProfile } from '@/stores/profile';
import BookmarkPage from './BookmarkPage';

const BookmarkProfile = () => {
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
    />
  ) : (
    <p>Loading......</p>
  );
};

export default BookmarkProfile;
