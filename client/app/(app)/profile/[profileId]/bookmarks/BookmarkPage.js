import React from 'react';
import ProfileTweetAndCommentCard from '@/components/ProfileTweetAndCommentCard';

const BookmarkPage = ({
  bookmarkedTweetsForProfile,
  bookmarkedCommentsForProfile,
}) => {
  const allBookmarked = [
    ...(Array.isArray(bookmarkedCommentsForProfile)
      ? bookmarkedCommentsForProfile
      : []),
    ...bookmarkedTweetsForProfile,
  ];

  return (
    <div className="w-full">
      {[...allBookmarked]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((tweet) => (
          <ProfileTweetAndCommentCard key={tweet.id} tweet={tweet} />
        ))}
    </div>
  );
};

export default BookmarkPage;
