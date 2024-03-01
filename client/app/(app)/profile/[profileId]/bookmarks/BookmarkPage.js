import React from 'react';
import ProfileTweetAndCommentCard from '@/components/ProfileTweetAndCommentCard';

const BookmarkPage = ({
  bookmarkedTweetsForProfile,
  bookmarkedCommentsForProfile,
  profile,
}) => {
  const allBookmarked = [
    ...(Array.isArray(bookmarkedCommentsForProfile)
      ? bookmarkedCommentsForProfile
      : []),
    ...bookmarkedTweetsForProfile,
  ];
  const { username } = profile.user;

  return (
    <div>
      {allBookmarked.length > 0 ? (
        <div className="w-full">
          {[...allBookmarked]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((tweet) => (
              <ProfileTweetAndCommentCard key={tweet.id} tweet={tweet} />
            ))}
        </div>
      ) : (
        <div className="text-sm text-center my-5">
          {username} has not bookmarked any Tweets
          <br />
          When they do, those Tweets will show up here.
        </div>
      )}
    </div>
  );
};

export default BookmarkPage;
