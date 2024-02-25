import React from 'react';
import ProfileTweetAndCommentCard from '@/components/ProfileTweetAndCommentCard';

const LikesPage = ({ likedTweetsForProfile, likedCommentsForProfile }) => {
  return (
    <>
      <div className="w-full">
        {likedTweetsForProfile.map((tweet) => (
          <ProfileTweetAndCommentCard key={tweet.id} tweet={tweet} />
        ))}
      </div>

      <div className="w-full">
        {likedCommentsForProfile.map((tweet) => (
          <ProfileTweetAndCommentCard key={tweet.id} tweet={tweet} />
        ))}
      </div>
    </>
  );
};

export default LikesPage;
