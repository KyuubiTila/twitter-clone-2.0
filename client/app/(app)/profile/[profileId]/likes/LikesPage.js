import React from 'react';
import ProfileTweetAndCommentCard from '@/components/ProfileTweetAndCommentCard';

const LikesPage = ({ likedTweetsForProfile, likedCommentsForProfile }) => {
  const allLikes = [
    ...(Array.isArray(likedCommentsForProfile) ? likedCommentsForProfile : []),
    ...likedTweetsForProfile,
  ];
  return (
    <div className="w-full">
      {[...allLikes]
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .map((tweet) => (
          <ProfileTweetAndCommentCard key={tweet.id} tweet={tweet} />
        ))}
    </div>
  );
};

export default LikesPage;
