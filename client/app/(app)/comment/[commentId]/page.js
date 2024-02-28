'use client';
import React, { useEffect } from 'react'; // Add useEffect import
import { useAuth } from '@/stores/auth';
import { useTweet } from '@/stores/tweet';
import { useComment } from '@/stores/comment';
import IndividualCommentCard from '../IndividualCommentCard';

const CommentPage = () => {
  const {
    allComments,
    isCommentsLoading,
    individualTweetCommentsRefetch,
    individualComment,
    isCommentLoading,
    individualCommentRefetch,
    deleteComment,
    updateComment,
  } = useComment();

  const { user, userDetailsRefetch } = useAuth();

  useEffect(() => {
    userDetailsRefetch();
  }, [userDetailsRefetch]);

  useEffect(() => {
    individualCommentRefetch();
  }, [individualCommentRefetch]);

  useEffect(() => {
    individualTweetCommentsRefetch();
  }, [individualTweetCommentsRefetch]);

  return (
    <>
      {!isCommentLoading && individualComment ? (
        <IndividualCommentCard
          user={user}
          individualComment={individualComment}
          deleteComment={deleteComment}
          updateComment={updateComment}
          allComments={!isCommentsLoading ? allComments : null}
        />
      ) : (
        <div>Loadingplay</div>
      )}
    </>
  );
};

export default CommentPage;
