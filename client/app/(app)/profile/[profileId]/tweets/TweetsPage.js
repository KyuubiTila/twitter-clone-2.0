import React from 'react';
import ProfileTweetAndCommentCard from '@/components/ProfileTweetAndCommentCard';

const TweetsPage = ({
  retweetedTweetsForProfile,
  retweetedCommentsForProfile,
}) => {
  const allRetweeted = [
    ...(Array.isArray(retweetedCommentsForProfile)
      ? retweetedCommentsForProfile
      : []),
    ...retweetedTweetsForProfile,
  ];
  return (
    <div className="w-full">
      {retweetedTweetsForProfile || retweetedCommentsForProfile ? (
        [...allRetweeted]
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .map((tweet) => (
            <ProfileTweetAndCommentCard key={tweet.id} tweet={tweet} />
          ))
      ) : (
        <div>Loading</div>
      )}
    </div>
  );
};

export default TweetsPage;
