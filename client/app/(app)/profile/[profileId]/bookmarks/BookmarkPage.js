import React from 'react';
import ProfileTweetAndCommentCard from '@/components/ProfileTweetAndCommentCard';

const BookmarkPage = ({
  bookmarkedTweetsForProfile,
  bookmarkedCommentsForProfile,
}) => {
  return (
    <>
      <div className="w-full">
        {bookmarkedTweetsForProfile.map((tweet) => (
          <ProfileTweetAndCommentCard key={tweet.id} tweet={tweet} />
        ))}
      </div>

      <div className="w-full">
        {bookmarkedCommentsForProfile?.map((tweet) => (
          <ProfileTweetAndCommentCard key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </>
  );
};

export default BookmarkPage;
