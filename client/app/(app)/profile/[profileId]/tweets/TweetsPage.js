import React from 'react';
import ProfileTweetAndCommentCard from '@/components/ProfileTweetAndCommentCard';

const TweetsPage = ({
  retweetedTweetsForProfile,
  retweetedCommentsForProfile,
  profile,
}) => {
  const allRetweeted = [
    ...(Array.isArray(retweetedCommentsForProfile)
      ? retweetedCommentsForProfile
      : []),
    ...retweetedTweetsForProfile,
  ];
  const { username } = profile.user;

  return (
    <div>
      {allRetweeted.length > 0 ? (
        <div className="w-full">
          {[...allRetweeted]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((tweet) => (
              <ProfileTweetAndCommentCard key={tweet.id} tweet={tweet} />
            ))}
        </div>
      ) : (
        <div className="text-sm text-center mb-4">
          {username} has not retweeted any Tweets
          <br />
          When they do, those Tweets will show up here.
        </div>
      )}
    </div>
  );
};

export default TweetsPage;
