import React from 'react';
import ProfileCreatedCard from '@/components/ProfileCreatedCard';

const CreatedPage = ({
  createdTweetForProfile,
  createdCommentForProfile,
  profile,
}) => {
  const allCreated = [
    ...(Array.isArray(createdCommentForProfile)
      ? createdCommentForProfile
      : []),
    ...createdTweetForProfile,
  ];
  const { username } = profile.user;
  return (
    <div>
      {allCreated.length > 0 ? (
        <div className="w-full">
          {[...allCreated]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((tweet) => (
              <ProfileCreatedCard key={tweet.updatedAt} tweet={tweet} />
            ))}
        </div>
      ) : (
        <div className="text-sm text-center my-5">
          {username} has not liked any Tweets
          <br />
          When they do, those Tweets will show up here.
        </div>
      )}
    </div>
  );
};

export default CreatedPage;
