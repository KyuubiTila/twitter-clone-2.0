'use client';
import React, { useEffect } from 'react';
import TweetCard from './TweetRenderCard';
import { useTweet } from '@/stores/tweet';
import CardLoading from './CardLoading';

const Post = () => {
  const { tweets, tweetsRefetch, tweetsIsLoading, deleteTweet, updateTweet } =
    useTweet();

  useEffect(() => {
    tweetsRefetch();
  }, [tweetsRefetch]);

  return (
    <>
      {!tweetsIsLoading && tweets ? (
        [...tweets]
          .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
          .map((tweet) => (
            <TweetCard
              key={tweet.id}
              tweet={tweet}
              deleteTweet={deleteTweet}
              updateTweet={updateTweet}
            />
          ))
      ) : (
        <div>
          <CardLoading />
          <CardLoading />
          <CardLoading />
          <CardLoading />
          <CardLoading />
        </div>
      )}
    </>
  );
};

export default Post;
