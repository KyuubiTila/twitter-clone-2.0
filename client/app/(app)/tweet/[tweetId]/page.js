'use client';
import React, { useEffect } from 'react'; // Add useEffect import
import { useAuth } from '@/stores/auth';
import { useTweet } from '@/stores/tweet';
import IndividualTweetCard from '../IndividualTweetCard';
import { useComment } from '@/stores/comment';

const TweetIdPage = () => {
  const {
    tweet,
    individualTweetRefetch,
    deleteTweet,
    updateTweet,
    tweetIsLoading,
  } = useTweet();

  const {
    allComments,
    isCommentsLoading,
    individualTweetCommentsRefetch,
    deleteComment,
    updateComment,
  } = useComment();

  const { user, userDetailsRefetch } = useAuth();

  useEffect(() => {
    userDetailsRefetch();
  }, [userDetailsRefetch]);

  useEffect(() => {
    individualTweetRefetch();
  }, [individualTweetRefetch]);

  useEffect(() => {
    individualTweetCommentsRefetch();
  }, [individualTweetCommentsRefetch]);

  return (
    <>
      {!tweetIsLoading && tweet ? (
        <IndividualTweetCard
          user={user}
          tweet={tweet}
          deleteTweet={deleteTweet}
          updateTweet={updateTweet}
          deleteComment={deleteComment}
          updateComment={updateComment}
          allComments={!isCommentsLoading ? allComments : null}
        />
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default TweetIdPage;
