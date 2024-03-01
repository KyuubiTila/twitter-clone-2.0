import React from 'react';
import ProfileTweetAndCommentCard from '@/components/ProfileTweetAndCommentCard';

const LikesPage = ({
  likedTweetsForProfile,
  likedCommentsForProfile,
  profile,
}) => {
  const allLikes = [
    ...(Array.isArray(likedCommentsForProfile) ? likedCommentsForProfile : []),
    ...likedTweetsForProfile,
  ];
  const { username } = profile.user;
  return (
    <div>
      {allLikes.length > 0 ? (
        <div className="w-full">
          {[...allLikes]
            .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
            .map((tweet) => (
              <ProfileTweetAndCommentCard key={tweet.id} tweet={tweet} />
            ))}
        </div>
      ) : (
        <div className="text-sm text-center mb-4">
          {username} has not liked any Tweets
          <br />
          When they do, those Tweets will show up here.
        </div>
      )}
    </div>
  );
};

export default LikesPage;
