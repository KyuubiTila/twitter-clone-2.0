'use client';
import React, { useEffect } from 'react'; // Add useEffect import
import { useAuth } from '@/stores/auth';
import { useTweet } from '@/stores/tweet';
import IndividualTweetCard from '../IndividualTweetCard';

const TweetIdPage = () => {
  const {
    tweet,
    individualTweetRefetch,
    deleteTweet,
    updateTweet,
    tweetIsLoading,
  } = useTweet();
  const { user, userDetailsRefetch } = useAuth();

  useEffect(() => {
    userDetailsRefetch();
  }, [userDetailsRefetch]);

  useEffect(() => {
    individualTweetRefetch();
  }, [individualTweetRefetch]);
  console.log(tweet);

  return (
    <>
      {!tweetIsLoading && tweet ? (
        <IndividualTweetCard
          user={user}
          tweet={tweet}
          deleteTweet={deleteTweet}
          updateTweet={updateTweet}
        />
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default TweetIdPage;
