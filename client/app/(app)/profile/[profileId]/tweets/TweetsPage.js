import React from 'react';
import ProfileTweetAndCommentCard from '@/components/ProfileTweetAndCommentCard';

const TweetsPage = ({
  retweetedTweetsForProfile,
  retweetedCommentsForProfile,
}) => {
  return (
    <>
      <div className="w-full">
        {retweetedTweetsForProfile.map((tweet) => (
          <ProfileTweetAndCommentCard key={tweet.id} tweet={tweet} />
        ))}
      </div>

      <div className="w-full">
        {retweetedCommentsForProfile.map((tweet) => (
          <ProfileTweetAndCommentCard key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </>
  );
};

export default TweetsPage;
