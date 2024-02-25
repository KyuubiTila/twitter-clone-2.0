'use client';
import BookmarkProfile from '../profile/[profileId]/bookmarks/page';
import { useAuth } from '@/stores/auth';
import { useProfile } from '@/stores/profile';
import React, { useEffect } from 'react';
import BookmarkPage from '../profile/[profileId]/bookmarks/BookmarkPage';

const Bookmark = () => {
  const { user, userDetailsRefetch } = useAuth();
  const {
    bookmarkedTweetsForProfile,
    isLoadingBookmarkedTweetsForProfile,
    bookmarkedTweetsForProfileRefetch,
    bookmarkedCommentsForProfile,
    isLoadingBookmarkedCommentsForProfile,
    bookmarkedCommentsForProfileRefetch,
  } = useProfile(user.id);

  useEffect(() => {
    userDetailsRefetch();
  }, [userDetailsRefetch]);

  useEffect(() => {
    bookmarkedTweetsForProfileRefetch();
    bookmarkedCommentsForProfileRefetch();
  }, [bookmarkedTweetsForProfileRefetch, bookmarkedCommentsForProfileRefetch]);

  return !isLoadingBookmarkedTweetsForProfile && bookmarkedTweetsForProfile ? (
    <div className="bg-white border border-black rounded-lg my-4">
      <BookmarkPage
        bookmarkedTweetsForProfile={bookmarkedTweetsForProfile}
        bookmarkedCommentsForProfile={bookmarkedCommentsForProfile}
      />
    </div>
  ) : (
    <p>Loading......</p>
  );
};

export default Bookmark;
