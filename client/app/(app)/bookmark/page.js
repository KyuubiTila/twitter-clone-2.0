'use client';
import { useAuth } from '@/stores/auth';
import { useProfile } from '@/stores/profile';
import React, { useEffect } from 'react';
import BookmarkPage from '../profile/[profileId]/bookmarks/BookmarkPage';
import { useSideBarProfile } from '@/utils/useSideBarUserDetails';

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

  const { profile, profileSideBarDetailsRefetch } = useSideBarProfile();

  useEffect(() => {
    profileSideBarDetailsRefetch();
  }, [profileSideBarDetailsRefetch]);

  return !isLoadingBookmarkedTweetsForProfile && bookmarkedTweetsForProfile ? (
    <div className="bg-white border border-black rounded-lg my-4">
      <BookmarkPage
        bookmarkedTweetsForProfile={bookmarkedTweetsForProfile}
        bookmarkedCommentsForProfile={bookmarkedCommentsForProfile}
        profile={profile}
      />
    </div>
  ) : (
    <p>Loading......</p>
  );
};

export default Bookmark;
